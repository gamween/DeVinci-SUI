// Page Live: lecteur vidéo + donations + rewards

export default function LivePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Live Stream</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vidéo Player */}
        <div className="lg:col-span-2">
          <div className="bg-black aspect-video rounded-lg flex items-center justify-center">
            <p className="text-white">Video Player Placeholder</p>
          </div>
        </div>
        
        {/* Panel lateral */}
        <div className="space-y-4">
          {/* Donations Panel */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-bold mb-2">Support the Creator</h3>
            <p className="text-sm text-gray-600">Donate Panel Placeholder</p>
          </div>
          
          {/* Rewards Panel */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-bold mb-2">Your Rewards</h3>
            <p className="text-sm text-gray-600">Rewards Panel Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
