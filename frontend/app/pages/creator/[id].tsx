// Page Profil Créateur

export default function CreatorPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Creator Profile</h1>
        <p className="text-gray-600">Creator ID: {params.id}</p>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Exclusive Content</h2>
          <p className="text-gray-600">No content available</p>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Get Fan Pass</h2>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Mint Fan Pass
          </button>
        </div>
      </div>
    </div>
  );
}
