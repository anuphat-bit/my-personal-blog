import React from 'react';
import FertilizerIcon from './icons/FertilizerIcon';

interface FertilizeControlProps {
  onFertilize: () => void;
  totalPoints: number;
  cost: number;
  isFertilized: boolean;
}

const FertilizeControl: React.FC<FertilizeControlProps> = ({ onFertilize, totalPoints, cost, isFertilized }) => {
  const canFertilize = totalPoints >= cost;

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={onFertilize}
        disabled={!canFertilize || isFertilized}
        className="w-full max-w-xs flex items-center justify-center gap-2 bg-yellow-400 text-yellow-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-md"
        aria-label={`บำรุงต้นไม้, ใช้ ${cost} คะแนน`}
      >
        <FertilizerIcon />
        <span>{isFertilized ? 'กำลังบำรุง...' : `บำรุงต้นไม้ (-${cost} แต้ม)`}</span>
      </button>
      {!canFertilize && <p className="text-sm text-red-500 mt-2">คุณมีคะแนนไม่พอ</p>}
    </div>
  );
};

export default FertilizeControl;
