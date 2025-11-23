'use client';

import { useUser } from '../../context/UserContext';
import { LogOut } from 'lucide-react';

/**
 * Bouton de connexion/déconnexion Twitch OAuth (Implicit Flow)
 * Pas besoin de backend, juste le Client ID public
 * Le token est retourné dans l'URL fragment (#) et parsé par la page callback
 */
export function TwitchButton() {
  const { twitchData, isTwitchConnected, disconnectTwitch } = useUser();

  const handleConnect = () => {
    const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_TWITCH_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      console.error('[TwitchButton] Configuration OAuth manquante:', { clientId: !!clientId, redirectUri: !!redirectUri });
      alert('Configuration Twitch OAuth incomplète. Vérifiez votre .env.local');
      return;
    }

    // Sauvegarder l'URL actuelle pour y retourner après l'authentification
    sessionStorage.setItem('twitch_return_url', window.location.pathname + window.location.search);

    console.log('[TwitchButton] 🚀 Démarrage du flow OAuth Twitch (Implicit Flow)');

    // Implicit Flow : response_type=token (pas besoin de backend)
    const authUrl = new URL('https://id.twitch.tv/oauth2/authorize');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'token'); // ← IMPLICIT FLOW
    authUrl.searchParams.set('scope', 'user:read:email');

    console.log('[TwitchButton] Redirection vers Twitch OAuth');

    // Redirection vers la page d'autorisation Twitch
    window.location.href = authUrl.toString();
  };

  const handleDisconnect = () => {
    if (confirm('Êtes-vous sûr de vouloir déconnecter votre compte Twitch ?')) {
      disconnectTwitch();
    }
  };

  // État connecté : afficher les infos utilisateur
  if (isTwitchConnected && twitchData) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg backdrop-blur-sm hover:bg-purple-500/15 transition-colors">
        {/* Avatar Twitch */}
        {twitchData.avatarUrl && (
          <img
            src={twitchData.avatarUrl}
            alt={twitchData.username}
            className="w-8 h-8 rounded-full border-2 border-purple-400/50"
          />
        )}
        
        {/* Infos utilisateur */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-purple-300 truncate">
            {twitchData.username}
          </span>
          <span className="text-xs text-purple-400/70">Twitch connecté</span>
        </div>
        
        {/* Bouton déconnexion */}
        <button
          onClick={handleDisconnect}
          className="ml-auto p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all"
          title="Déconnecter Twitch"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // État non connecté : bouton de connexion
  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
    >
      {/* Logo Twitch */}
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
      </svg>
      Connexion Twitch
    </button>
  );
}
