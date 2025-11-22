// VideoPlayer: lecteur HLS/IPFS

'use client'

interface VideoPlayerProps {
  streamUrl: string;
  poster?: string;
}

export default function VideoPlayer({ streamUrl, poster }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {/* TODO: Intégrer HLS.js ou video.js pour le streaming */}
      <video 
        className="w-full h-full"
        controls
        poster={poster}
      >
        <source src={streamUrl} type="application/x-mpegURL" />
        Your browser does not support video playback.
      </video>
    </div>
  );
}
