import React from 'react';

const TreeWithFruitIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <g className="text-green-600">
            <path d="M12 22V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 10C12 7.79086 13.7909 6 16 6C18.2091 6 20 7.79086 20 10V13C20 14.1046 19.1046 15 18 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 10C12 7.79086 10.2091 6 8 6C5.79086 6 4 7.79086 4 10V13C4 14.1046 4.89543 15 6 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 22H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C12 12.7909 13.7909 11 16 11C18.2091 11 20 12.7909 20 15V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6C12 3.79086 13.7909 2 16 2C18.2091 2 20 3.79086 20 6V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6C12 3.79086 10.2091 2 8 2C5.79086 2 4 3.79086 4 6V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        {/* Fruits */}
        <circle cx="18" cy="9" r="1.8" className="fill-red-500 stroke-red-600" strokeWidth="0.5"/>
        <circle cx="6" cy="12" r="1.8" className="fill-red-500 stroke-red-600" strokeWidth="0.5"/>
        <circle cx="17" cy="4" r="1.8" className="fill-orange-500 stroke-orange-600" strokeWidth="0.5"/>
        <circle cx="7" cy="5" r="1.8" className="fill-orange-500 stroke-orange-600" strokeWidth="0.5"/>
        <circle cx="15" cy="13" r="1.8" className="fill-red-500 stroke-red-600" strokeWidth="0.5"/>
    </svg>
);

export default TreeWithFruitIcon;
