'use client';

import { useState, useEffect } from "react";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { featuredStreams, type FeaturedStream } from "../../data/featured-streams";
import { ExternalLink, Zap, ArrowLeft, Eye } from "lucide-react";

/**
 * StreamCard component - Clickable card that shows stream details
 */
interface StreamCardProps {
  stream: FeaturedStream;
  onViewDetails: () => void;
}

function StreamCard({ stream, onViewDetails }: StreamCardProps) {
  return (
    <div
      onClick={onViewDetails}
      className="bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-800 overflow-hidden hover:border-purple-500/50 transition-all hover:scale-105 cursor-pointer group"
    >
      {/* Thumbnail with properly positioned badges */}
      <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20">
        <img
          src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.channel}-440x248.jpg`}
          alt={stream.displayName}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Elegant fallback if stream offline or invalid image
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(stream.displayName)}&size=440&background=6366f1&color=fff&bold=true&font-size=0.4`;
          }}
        />
        
        {/* Bounty Badge - TOP RIGHT (no overlap) */}
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 shadow-lg">
          <Zap className="w-3 h-3" />
          {stream.bounties} {stream.bounties > 1 ? 'bounties' : 'bounty'}
        </div>

        {/* Channel Name - BOTTOM LEFT (avoid overlap) */}
        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white text-sm font-bold px-2 py-1 rounded">
          {stream.displayName}
        </div>
      </div>

      {/* Info Card */}
      <div className="p-5">
        <p className="text-sm text-slate-400 mb-3 truncate">
          {stream.description}
        </p>
        
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="text-purple-400">{stream.category}</span>
          <span className="text-slate-500">Pool: {stream.bountyPool}</span>
        </div>

        {/* View Details Button */}
        <div className="w-full px-4 py-2 bg-purple-600 group-hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition text-center flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" />
          View Details
        </div>
      </div>
    </div>
  );
}

export default function ViewerBrowse() {
  const [selectedStream, setSelectedStream] = useState<FeaturedStream | null>(null);
  const [isLive, setIsLive] = useState(false);

  // Check if stream is live when a stream is selected
  useEffect(() => {
    if (selectedStream) {
      checkIfLive(selectedStream.channel);
    }
  }, [selectedStream]);

  const checkIfLive = async (channel: string) => {
    try {
      // Try to load the live preview image
      const img = new Image();
      img.src = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel}-440x248.jpg?${Date.now()}`;
      
      img.onload = () => setIsLive(true);
      img.onerror = () => setIsLive(false);
    } catch {
      setIsLive(false);
    }
  };

  return (
    <ProtectedRoute 
      message="Connect your wallet to discover streamers and support your favorites"
      requireTwitch={true}
      allowedRoles={['viewer']}
    >
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <DashboardHeader role="viewer" />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedStream ? (
            /* Detail View */
            <div className="space-y-6">
              {/* Back Button */}
              <button
                onClick={() => setSelectedStream(null)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to list
              </button>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Stream Preview */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl overflow-hidden">
                    <img
                      src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${selectedStream.channel}-1280x720.jpg?${Date.now()}`}
                      alt={selectedStream.displayName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedStream.displayName)}&size=1280&background=6366f1&color=fff&bold=true`;
                      }}
                    />
                    
                    {/* Live/Offline Badge */}
                    {isLive ? (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        LIVE NOW
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4 bg-slate-800 text-slate-300 text-sm font-bold px-3 py-1.5 rounded shadow-lg">
                        OFFLINE
                      </div>
                    )}
                  </div>

                  {/* Watch/Visit Button - Based on Live Status */}
                  {isLive ? (
                    <a
                      href={selectedStream.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                      </svg>
                      Watch on Twitch
                    </a>
                  ) : (
                    <a
                      href={selectedStream.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Channel
                    </a>
                  )}
                </div>

                {/* Sidebar - Info + Bounties */}
                <div className="space-y-4">
                  {/* Stream Info */}
                  <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-800">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedStream.displayName}
                    </h2>
                    <p className="text-slate-400 text-sm mb-4">
                      {selectedStream.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-purple-400">{selectedStream.category}</span>
                    </div>
                  </div>

                  {/* Active Bounties */}
                  <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-2xl">⚡</div>
                      <h3 className="text-xl font-bold text-white">
                        {selectedStream.bounties} Active {selectedStream.bounties > 1 ? 'Bounties' : 'Bounty'}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-white">Total NFTs</span>
                          <span className="text-sm text-purple-400">100 available</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">Reward Pool</span>
                          <span className="text-lg font-bold text-white">{selectedStream.bountyPool}</span>
                        </div>
                      </div>
                      
                      {/* Participate Button */}
                      <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition">
                        Participate in Bounties
                      </button>
                      
                      <p className="text-xs text-slate-500 text-center">
                        Watch the stream to earn NFT rewards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* List View */
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl">🎬</div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    Streamers with Active Bounties
                  </h1>
                </div>
                <p className="text-slate-400">
                  Click on a card to view stream details 🎁
                </p>
              </div>

              {/* Stats Bar */}
              <div>
                <div className="bg-slate-900/50 backdrop-blur rounded-xl p-4 border border-slate-800 w-fit">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span className="text-sm text-slate-400 font-medium">
                      {featuredStreams.length} streamers available
                    </span>
                  </div>
                </div>
              </div>

              {/* Stream Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredStreams.map((stream) => (
                  <StreamCard 
                    key={stream.channel} 
                    stream={stream}
                    onViewDetails={() => setSelectedStream(stream)}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
