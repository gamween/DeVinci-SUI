export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">CreatorSeal - Live Streams</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Liste des lives sera affichée ici */}
        <div className="text-gray-500">
          No live streams available
        </div>
      </div>
    </div>
  );
}
