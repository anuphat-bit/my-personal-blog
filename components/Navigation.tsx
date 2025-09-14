
import React from 'react';
import HomeIcon from './icons/HomeIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';
import ClockIcon from './icons/ClockIcon';
import MissionIcon from './icons/MissionIcon';
import ChartBarIcon from './icons/ChartBarIcon';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    page: string;
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, currentPage, setCurrentPage }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 focus:outline-none ${isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-500'}`}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const Navigation: React.FC<NavigationProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-sm border-t border-gray-200 flex justify-around items-center z-20">
      <NavItem page="home" label="หน้าหลัก" icon={<HomeIcon />} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <NavItem page="log" label="บันทึก" icon={<PlusCircleIcon />} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <NavItem page="history" label="ประวัติ" icon={<ClockIcon />} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <NavItem page="challenges" label="ภารกิจ" icon={<MissionIcon />} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <NavItem page="leaderboard" label="ผู้นำ" icon={<ChartBarIcon />} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </nav>
  );
};

export default Navigation;
