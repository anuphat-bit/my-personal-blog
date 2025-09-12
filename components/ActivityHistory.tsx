
import React from 'react';
import type { Activity } from '../types';
import LeafIcon from './icons/LeafIcon';

interface ActivityHistoryProps {
  activities: Activity[];
}

// Map of predefined activities and their standard points for tooltip display
const predefinedActivityPoints: Record<string, number> = {
  'ใช้เอกสารดิจิทัลแทนการพิมพ์': 10,
  'เลือกรับบิลออนไลน์': 5,
  'ใช้กระดาษสองหน้า': 5,
  'นำกระดาษกลับมาใช้ใหม่': 3,
};

const ActivityHistory: React.FC<ActivityHistoryProps> = ({ activities }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-200">
      <h2 className="text-xl font-bold text-green-800 mb-4">ประวัติกิจกรรม</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <p className="text-center text-gray-500 py-4">ยังไม่มีกิจกรรมที่บันทึกไว้</p>
        ) : (
          activities.map((activity) => {
            const standardPoints = predefinedActivityPoints[activity.description];
            
            return (
              <div
                key={activity.id}
                className="relative group flex justify-between items-center bg-emerald-50 p-3 rounded-lg border border-emerald-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-green-500 hidden sm:block">
                    <LeafIcon />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <span className={`font-bold text-lg ${activity.points >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {activity.points >= 0 ? `+${activity.points}` : activity.points}
                </span>

                {/* Tooltip for predefined activities */}
                {standardPoints !== undefined && activity.points > 0 && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
                    คะแนนมาตรฐาน: {standardPoints} คะแนน
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;
