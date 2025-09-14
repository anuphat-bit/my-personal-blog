import React, { useState, useEffect } from 'react';
import type { Activity, LeaderboardEntry, Challenge } from './types';
import Header from './components/Header';
import LogActivityForm from './components/LogActivityForm';
import ActivityHistory from './components/ActivityHistory';
import EcoVisual from './components/EcoVisual';
import UserProfile from './components/UserProfile';
import Leaderboard from './components/Leaderboard';
import FertilizeControl from './components/FertilizeControl';
import DailyChallenge from './components/DailyChallenge';
import Navigation from './components/Navigation';

// Mock data for other users on the leaderboard
const initialLeaderboard: LeaderboardEntry[] = [
  { name: 'รักษ์โลก', score: 150 },
  { name: 'ต้นไม้', score: 125 },
  { name: 'ใบไม้', score: 90 },
  { name: 'สายน้ำ', score: 72 },
  { name: 'ลมหนาว', score: 45 },
];

const FERTILIZER_COST = 25;

const POSSIBLE_CHALLENGES: Omit<Challenge, 'completed' | 'id'>[] = [
  { description: 'เข้าร่วมประชุมโดยไม่ใช้กระดาษเลยทั้งวัน', points: 20 },
  { description: 'อ่านหนังสือ/เอกสารเป็น e-book แทนกระดาษ', points: 15 },
  { description: 'ยกเลิกรับจดหมายโฆษณาทางไปรษณีย์', points: 25 },
  { description: 'ใช้ผ้าเช็ดมือแทนกระดาษทิชชู่ตลอดวัน', points: 10 },
  { description: 'แชร์ไอเดียลดใช้กระดาษกับเพื่อน 1 ข้อ', points: 5 },
  { description: 'ทบทวนและจัดระเบียบไฟล์ดิจิทัล', points: 10},
  { description: 'จ่ายบิลทั้งหมดผ่านช่องทางออนไลน์ในเดือนนี้', points: 15}
];
const DAILY_CHALLENGE_COUNT = 3;

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('ecoUserName') || 'ชื่อผู้ใช้');
  
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
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  // Daily Challenge Generation
  useEffect(() => {
    const today = new Date().toLocaleDateString('th-TH');
    const lastChallengeDate = localStorage.getItem('lastChallengeDate');
    
    if (lastChallengeDate === today) {
        const savedChallenges = localStorage.getItem('dailyChallenges');
        if (savedChallenges) {
            setChallenges(JSON.parse(savedChallenges));
        }
    } else {
        // It's a new day, generate new challenges
        const shuffled = [...POSSIBLE_CHALLENGES].sort(() => 0.5 - Math.random());
        const newChallenges = shuffled.slice(0, DAILY_CHALLENGE_COUNT).map((challenge, index) => ({
            ...challenge,
            id: `daily-${index}-${Date.now()}`,
            completed: false,
        }));
        setChallenges(newChallenges);
        localStorage.setItem('dailyChallenges', JSON.stringify(newChallenges));
        localStorage.setItem('lastChallengeDate', today);
    }
  }, []);

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
    // Persist challenges whenever they are updated
    if (challenges.length > 0) {
        localStorage.setItem('dailyChallenges', JSON.stringify(challenges));
    }
  }, [userName, activities, challenges]);

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
  
  const handleCompleteChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      addActivity(`ภารกิจสำเร็จ: ${challenge.description}`, challenge.points);
      
      setChallenges(prevChallenges => 
        prevChallenges.map(c => 
          c.id === challengeId ? { ...c, completed: true } : c
        )
      );
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'log':
        return (
            <div className="space-y-6">
                <UserProfile currentName={userName} onNameChange={handleNameChange} />
                <LogActivityForm onAddActivity={addActivity} />
            </div>
        );
      case 'history':
        return <ActivityHistory activities={activities} />;
      case 'challenges':
        return <DailyChallenge challenges={challenges} onCompleteChallenge={handleCompleteChallenge} />;
      case 'leaderboard':
        return <Leaderboard leaderboard={leaderboard} currentUser={userName} />;
      case 'home':
      default:
        return (
            <div className="space-y-6">
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-emerald-200 space-y-4">
                    <EcoVisual points={totalPoints} isFertilized={isFertilized} />
                    <FertilizeControl onFertilize={handleFertilize} totalPoints={totalPoints} cost={FERTILIZER_COST} isFertilized={isFertilized} />
                </div>
            </div>
        );
    }
  };


  return (
    <div className="min-h-screen bg-emerald-50 text-green-900 pb-20">
      <Header totalPoints={totalPoints} userName={userName} />
      <main className="container mx-auto p-4 md:p-6">
        {renderPage()}
        <footer className="text-center p-4 text-green-700 text-sm mt-8">
            <p>สร้างสรรค์โดย ANUPHA</p>
        </footer>
      </main>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;