import React from 'react';
import type { LeaderboardEntry } from '../types';
import GoldMedalIcon from './icons/GoldMedalIcon';
import SilverMedalIcon from './icons/SilverMedalIcon';
import BronzeMedalIcon from './icons/BronzeMedalIcon';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  currentUser: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard, currentUser }) => {
  const getRankIcon = (rank: number) => {
    if (rank === 0) return <GoldMedalIcon />;
    if (rank === 1) return <SilverMedalIcon />;
    if (rank === 2) return <BronzeMedalIcon />;
    return <span className="font-mono text-center w-6">{rank + 1}</span>;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200">
      <h2 className="text-xl font-bold text-green-800 mb-4">กระดานผู้นำ</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {leaderboard.map((entry, index) => (
          <div
            key={`${entry.name}-${index}`}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              entry.name === currentUser ? 'bg-emerald-100 border border-emerald-300' : 'bg-gray-50'
            }`}
          >
            <div className="w-8 flex-shrink-0 flex justify-center items-center">
              {getRankIcon(index)}
            </div>
            <p className="flex-grow font-semibold text-green-900 ml-3 truncate">{entry.name}</p>
            <span className="font-bold text-lg text-green-600">{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
