// RewardsPanel: progression NFT et badges

'use client'

interface Badge {
  id: string;
  name: string;
  image: string;
}

interface RewardsPanelProps {
  level: number;
  xp: number;
  badges: Badge[];
}

export default function RewardsPanel({ level, xp, badges }: RewardsPanelProps) {
  const xpForNextLevel = level * 100;
  const progress = (xp / xpForNextLevel) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Your Progress</h3>
      
      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Level {level}</span>
          <span className="text-sm text-gray-600">{xp} / {xpForNextLevel} XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Badges */}
      <div>
        <h4 className="font-medium mb-3">Badges</h4>
        {badges.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {badges.map((badge) => (
              <div key={badge.id} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <p className="text-xs text-gray-600">{badge.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No badges yet</p>
        )}
      </div>
    </div>
  );
}
