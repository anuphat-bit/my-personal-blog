import React from 'react';
import LeafIcon from './icons/LeafIcon';

interface HeaderProps {
  totalPoints: number;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ totalPoints, userName }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="text-green-500">
            <LeafIcon />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">แต้มรักษ์โลก</h1>
        </div>
        <div className="flex items-center space-x-3 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2">
          <span className="font-semibold text-green-800 hidden sm:inline text-right truncate">
            คะแนนของ {userName}:
          </span>
          <span className="font-bold text-2xl text-green-600">{totalPoints}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
