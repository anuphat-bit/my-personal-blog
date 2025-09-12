import React, { useState, useEffect } from 'react';
import type { Activity, LeaderboardEntry } from './types';
import Header from './components/Header';
import LogActivityForm from './components/LogActivityForm';
import ActivityHistory from './components/ActivityHistory';
import EcoVisual from './components/EcoVisual';
import UserProfile from './components/UserProfile';
import Leaderboard from './components/Leaderboard';
import FertilizeControl from './components/FertilizeControl';

// Mock data for other users on the leaderboard
const initialLeaderboard: LeaderboardEntry[] = [
  { name: 'รักษ์โลก', score: 150 },
  { name: 'ต้นไม้', score: 125 },
  { name: 'ใบไม้', score: 90 },
  { name: 'สายน้ำ', score: 72 },
  { name: 'ลมหนาว', score: 45 },
];

const FERTILIZER_COST = 25;

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('ecoUserName') || 'ผู้ใช้ใหม่');
  
  const [activities, setActivities] = useState<Activity[]>(() => {
    const savedActivities = localStorage.getItem('ecoActivities');
    if (savedActivities && savedActivities !== '[]') {
      try {
        return JSON.parse(savedActivities);
      } catch (e) {
        console.error("Failed to parse activities from localStorage", e);
        return [];
      }
    }
    // Default activities for first-time users
    return [
      { id: 1, description: 'ใช้เอกสารดิจิทัลแทนการพิมพ์', points: 10, date: new Date().toLocaleDateString('th-TH') },
      { id: 2, description: 'เลือกรับบิลออนไลน์', points: 5, date: new Date().toLocaleDateString('th-TH') },
    ];
  });

  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isFertilized, setIsFertilized] = useState<boolean>(false);

  // Calculate total points from activities
  useEffect(() => {
    const points = activities.reduce((sum, activity) => sum + activity.points, 0);
    setTotalPoints(points);
  }, [activities]);

  // Update leaderboard when user's data changes
  useEffect(() => {
    const currentUserEntry: LeaderboardEntry = { name: userName, score: totalPoints };
    // Combine with mock data, filter out potential old entries of the current user, and sort
    const combined = [...initialLeaderboard.filter(u => u.name !== userName), currentUserEntry];
    combined.sort((a, b) => b.score - a.score);
    setLeaderboard(combined);
  }, [userName, totalPoints]);

  // Persist user data to localStorage
  useEffect(() => {
    localStorage.setItem('ecoUserName', userName);
    localStorage.setItem('ecoActivities', JSON.stringify(activities));
  }, [userName, activities]);

  const addActivity = (description: string, points: number) => {
    const newActivity: Activity = {
      id: Date.now(),
      description,
      points,
      date: new Date().toLocaleDateString('th-TH'),
    };
    setActivities(prevActivities => [newActivity, ...prevActivities]);
  };

  const handleNameChange = (newName: string) => {
    if (newName.trim()) {
      setUserName(newName.trim());
    }
  };

  const handleFertilize = () => {
    if (totalPoints < FERTILIZER_COST) {
      alert('คุณมีคะแนนไม่เพียงพอที่จะบำรุงต้นไม้');
      return;
    }
    if (isFertilized) {
      alert('ต้นไม้กำลังได้รับการบำรุงอยู่!');
      return;
    }

    const fertilizerActivity: Activity = {
      id: Date.now(),
      description: 'ใช้แต้มบำรุงต้นไม้',
      points: -FERTILIZER_COST,
      date: new Date().toLocaleDateString('th-TH'),
    };
    setActivities(prevActivities => [fertilizerActivity, ...prevActivities]);

    setIsFertilized(true);
    setTimeout(() => {
      setIsFertilized(false);
    }, 5000); // Boost lasts for 5 seconds
  };

  return (
    <div className="min-h-screen bg-emerald-50 text-green-900">
      <Header totalPoints={totalPoints} userName={userName} />
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-emerald-200 space-y-4">
            <EcoVisual points={totalPoints} isFertilized={isFertilized} />
            <FertilizeControl onFertilize={handleFertilize} totalPoints={totalPoints} cost={FERTILIZER_COST} isFertilized={isFertilized} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <UserProfile currentName={userName} onNameChange={handleNameChange} />
            <LogActivityForm onAddActivity={addActivity} />
            <Leaderboard leaderboard={leaderboard} currentUser={userName} />
            <ActivityHistory activities={activities} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-green-700 text-sm">
        <p>สร้างสรรค์โดย ANUPHA</p>
      </footer>
    </div>
  );
};

export default App;