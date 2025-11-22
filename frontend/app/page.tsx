import CounterDemo from "./components/counter/CounterDemo";

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            CreatorSeal - Fan Engagement Hub
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A decentralized platform for creators to engage with their community through streaming, exclusive content, and rewards on Sui blockchain.
          </p>
        </div>
        
        {/* Demo Counter Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Demo: Counter Example</h2>
            <p className="text-slate-600">Test the blockchain integration with this counter example</p>
          </div>
          <CounterDemo />
        </div>

        {/* Coming Soon Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-xl font-bold mb-2">Live Streaming</h3>
            <p className="text-gray-600">IPFS-based decentralized streaming with HLS</p>
            <span className="text-sm text-blue-600 font-semibold">Coming Soon</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Exclusive Content</h3>
            <p className="text-gray-600">Seal-encrypted content with on-chain access control</p>
            <span className="text-sm text-blue-600 font-semibold">Coming Soon</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2">Fan Rewards</h3>
            <p className="text-gray-600">Dynamic NFT badges and evolving Fan Passes</p>
            <span className="text-sm text-blue-600 font-semibold">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}
