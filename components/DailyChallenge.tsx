
import React from 'react';
import type { Challenge } from '../types';
import MissionIcon from './icons/MissionIcon';

interface DailyChallengeProps {
  challenges: Challenge[];
  onCompleteChallenge: (challengeId: string) => void;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ challenges, onCompleteChallenge }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-green-500">
          <MissionIcon />
        </div>
        <div>
          <h2 className="text-xl font-bold text-green-800">ภารกิจประจำวัน</h2>
          <p className="text-sm text-gray-500">ทำภารกิจให้สำเร็จเพื่อรับแต้มโบนัส! (รีเซ็ตทุกวัน)</p>
        </div>
      </div>
      <div className="space-y-3">
        {challenges.length === 0 ? (
          <p className="text-center text-gray-500 py-4">กำลังโหลดภารกิจสำหรับวันนี้...</p>
        ) : (
          challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg transition-colors duration-300 ${
                challenge.completed ? 'bg-gray-100' : 'bg-emerald-50'
              }`}
            >
              <div className="flex-grow">
                <p className={`font-semibold text-green-800 ${challenge.completed ? 'line-through text-gray-500' : ''}`}>
                  {challenge.description}
                </p>
                <p className={`text-sm font-bold ${challenge.completed ? 'text-gray-400' : 'text-green-600'}`}>
                  +{challenge.points} คะแนน
                </p>
              </div>
              <button
                onClick={() => onCompleteChallenge(challenge.id)}
                disabled={challenge.completed}
                className="w-full sm:w-auto flex-shrink-0 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {challenge.completed ? 'สำเร็จแล้ว' : 'สำเร็จภารกิจ'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
