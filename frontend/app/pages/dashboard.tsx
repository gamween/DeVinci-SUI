// Dashboard créateur: stats, config stream

'use client'

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Creator Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2">Total Fans</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2">Total Donations</h3>
          <p className="text-3xl font-bold text-green-600">0 SUI</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2">Active Drops</h3>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Stream Configuration</h2>
        <p className="text-gray-600">Configure your streaming settings here</p>
      </div>
    </div>
  );
}
