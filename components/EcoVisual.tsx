import React from 'react';
import SproutIcon from './icons/SproutIcon';
import SeedlingIcon from './icons/SeedlingIcon';
import SmallTreeIcon from './icons/SmallTreeIcon';
import TreeIcon from './icons/TreeIcon';
import TreeWithFlowersIcon from './icons/TreeWithFlowersIcon';
import TreeWithFruitIcon from './icons/TreeWithFruitIcon';

interface EcoVisualProps {
  points: number;
  isFertilized: boolean;
}

// Data structure for each growth stage, moved outside for better performance
const STAGES = [
  { minPoints: 200, component: <TreeWithFruitIcon />, label: 'ต้นไม้ออกผล', skyColor: 'bg-sky-400', groundColor: 'bg-lime-700', showSun: true },
  { minPoints: 150, component: <TreeWithFlowersIcon />, label: 'ต้นไม้ผลิดอก', skyColor: 'bg-sky-400', groundColor: 'bg-lime-700', showSun: true },
  { minPoints: 100, component: <TreeIcon />, label: 'ต้นไม้ใหญ่', skyColor: 'bg-sky-300', groundColor: 'bg-lime-800', showSun: true },
  { minPoints: 50, component: <SmallTreeIcon />, label: 'ต้นไม้เล็ก', skyColor: 'bg-sky-300', groundColor: 'bg-lime-800', showSun: false },
  { minPoints: 20, component: <SeedlingIcon />, label: 'ต้นกล้า', skyColor: 'bg-sky-200', groundColor: 'bg-lime-900', showSun: false },
  { minPoints: 0, component: <SproutIcon />, label: 'เมล็ดพันธุ์', skyColor: 'bg-sky-200', groundColor: 'bg-lime-900', showSun: false },
];

const getStageVisuals = (points: number) => {
  // Find the first stage where the user's points meet the minimum requirement
  return STAGES.find(stage => points >= stage.minPoints)!;
};

const Sparkle: React.FC<{className: string}> = ({className}) => (
    <div className={`absolute text-yellow-300 ${className} z-30`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor"/>
        </svg>
    </div>
)

const EcoVisual: React.FC<EcoVisualProps> = ({ points, isFertilized }) => {
  const { component, label, skyColor, groundColor, showSun } = getStageVisuals(points);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
        <h2 className="text-2xl font-bold text-green-800 mb-2 text-center">ต้นไม้รักษ์โลก</h2>
        <p className="text-center text-green-700 mb-4">ทุกแต้มที่คุณสะสม ช่วยให้ต้นไม้ต้นนี้เติบโต</p>
        
        <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-inner">
            {/* Background Layer */}
            <div className={`absolute inset-0 transition-colors duration-1000 ${skyColor} z-0`}></div>
            
            {/* Sun Layer */}
            <div className={`absolute top-5 right-5 w-10 h-10 bg-yellow-300 rounded-full transition-all duration-1000 ${showSun ? 'opacity-80 scale-100' : 'opacity-0 scale-0'} ${isFertilized ? 'animate-pulse' : ''} z-10`}></div>
            
            {/* Ground Layer */}
            <div className={`absolute bottom-0 left-0 w-full h-1/4 ${groundColor} z-10 transition-colors duration-1000`}>
                <div className="absolute -top-2 left-0 w-full h-4 bg-green-600 rounded-t-full"></div>
            </div>

            {/* Water Ripple Effect Layer */}
            {isFertilized && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-20 z-20">
                    <div className="absolute inset-0 rounded-full bg-cyan-300 opacity-75 animate-ping"></div>
                </div>
            )}

            {/* Tree Icon Layer */}
            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-48 md:w-56 md:h-56 transition-all duration-500 ease-in-out ${isFertilized ? 'drop-shadow-[0_0_15px_rgba(253,249,156,0.9)]' : ''} z-20`}>
                {component}
            </div>

            {/* Fertilized Sparkle Effect */}
            {isFertilized && (
                <>
                    <Sparkle className="top-[20%] left-[15%] animate-pulse delay-100" />
                    <Sparkle className="top-[30%] right-[20%] animate-pulse" />
                    <Sparkle className="bottom-[40%] left-[25%] animate-pulse delay-200" />
                    <Sparkle className="bottom-[50%] right-[30%] animate-pulse delay-300" />
                </>
            )}
        </div>
        
        <p className="text-lg font-semibold text-green-700 bg-emerald-100 px-4 py-1 rounded-full">{label}</p>
    </div>
  );
};

export default EcoVisual;