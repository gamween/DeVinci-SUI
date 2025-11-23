'use client';

import { useEffect, useRef, useState } from 'react';

// Déclaration TypeScript pour Twitch global
declare global {
  interface Window {
    Twitch?: any;
  }
}

interface TwitchPlayerOptions {
  channel: string;
  width?: string | number;
  height?: string | number;
  layout?: 'video' | 'video-with-chat';
  autoplay?: boolean;
  muted?: boolean;
  parent?: string[];
}

interface TwitchPlayerInstance {
  play: () => void;
  pause: () => void;
  setChannel: (channel: string) => void;
  setVolume: (volume: number) => void;
  destroy: () => void;
  addEventListener: (event: string, callback: () => void) => void;
}

interface TwitchPlayerProps {
  channel: string;
  width?: string | number;
  height?: string | number;
  layout?: 'video' | 'video-with-chat';
  autoplay?: boolean;
  muted?: boolean;
}

/**
 * Composant React pour intégrer le Twitch Player
 * Charge dynamiquement le script Twitch Embed et initialise le player
 */
export function TwitchPlayer({
  channel,
  width = '100%',
  height = '480px',
  layout = 'video',
  autoplay = true,
  muted = false,
}: TwitchPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<TwitchPlayerInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!containerRef.current || !window.Twitch) return;

      try {
        // Détruire l'ancien player si existe
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch (e) {
            console.warn('[TwitchPlayer] Erreur lors de la destruction du player:', e);
          }
          playerRef.current = null;
        }

        // Créer un ID unique pour ce player
        const playerId = `twitch-player-${channel}-${Date.now()}`;
        containerRef.current.id = playerId;

        console.log('[TwitchPlayer] Initialisation du player pour:', channel);

        // CRITIQUE: Ajouter les domaines parents pour que Twitch autorise l'embed
        const parentDomains = ['localhost', '127.0.0.1', 'purple-sui.vercel.app'];

        // Initialiser le player Twitch
        playerRef.current = new window.Twitch.Player(playerId, {
          channel,
          width,
          height,
          layout,
          autoplay,
          muted,
          parent: parentDomains, // FIX CRITIQUE
        });

        // Event listeners pour suivre l'état du player
        if (playerRef.current && typeof playerRef.current.addEventListener === 'function') {
          playerRef.current.addEventListener('ready', () => {
            console.log('[TwitchPlayer] ✅ Player ready');
            if (isMounted) {
              setIsLoading(false);
              setError(null);
            }
          });

          playerRef.current.addEventListener('online', () => {
            console.log('[TwitchPlayer] ✅ Stream is online');
            if (isMounted) {
              setError(null);
            }
          });

          playerRef.current.addEventListener('offline', () => {
            console.log('[TwitchPlayer] ⚠️ Stream is offline');
            if (isMounted) {
              setError('Ce stream est actuellement hors ligne');
            }
          });
        }

        // Fallback: Considérer le player comme chargé après 3 secondes
        setTimeout(() => {
          if (isMounted && isLoading) {
            console.log('[TwitchPlayer] Fallback: Player considéré comme prêt');
            setIsLoading(false);
          }
        }, 3000);

      } catch (err) {
        console.error('[TwitchPlayer] ❌ Erreur lors de l\'initialisation:', err);
        if (isMounted) {
          setError('Impossible de charger le player Twitch');
          setIsLoading(false);
        }
      }
    };

    const loadTwitchScript = () => {
      // Vérifier si le script est déjà chargé
      if (window.Twitch) {
        console.log('[TwitchPlayer] Script Twitch déjà chargé');
        setTimeout(initPlayer, 100); // Petit délai pour s'assurer que Twitch est prêt
        return;
      }

      // Vérifier si le script est déjà en cours de chargement
      const existingScript = document.querySelector('script[src="https://player.twitch.tv/js/embed/v1.js"]');
      if (existingScript) {
        console.log('[TwitchPlayer] Script Twitch en cours de chargement...');
        existingScript.addEventListener('load', () => {
          setTimeout(initPlayer, 100);
        });
        return;
      }

      // Charger le script Twitch
      console.log('[TwitchPlayer] Chargement du script Twitch...');
      const script = document.createElement('script');
      script.src = 'https://player.twitch.tv/js/embed/v1.js';
      script.async = true;
      script.onload = () => {
        console.log('[TwitchPlayer] ✅ Script Twitch chargé');
        setTimeout(initPlayer, 100);
      };
      script.onerror = () => {
        console.error('[TwitchPlayer] ❌ Erreur lors du chargement du script');
        if (isMounted) {
          setError('Impossible de charger le script Twitch');
          setIsLoading(false);
        }
      };
      document.body.appendChild(script);
    };

    loadTwitchScript();

    // Cleanup
    return () => {
      isMounted = false;
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.warn('[TwitchPlayer] Erreur lors du cleanup:', e);
        }
        playerRef.current = null;
      }
    };
  }, [channel, width, height, layout, autoplay, muted]);

  // Loading state
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center bg-slate-900/50 rounded-lg border border-slate-800"
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-400">Chargement du stream...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded-lg"
        style={{ width, height }}
      >
        <div className="text-center p-6">
          <p className="text-red-400 mb-2">{error}</p>
          <p className="text-slate-500 text-sm">Vérifiez que la chaîne existe et est en ligne</p>
        </div>
      </div>
    );
  }

  // Player container
  return (
    <div
      ref={containerRef}
      className="rounded-lg overflow-hidden shadow-2xl"
      style={{ width, height }}
    />
  );
}
