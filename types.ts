export interface Activity {
  id: number;
  description: string;
  points: number;
  date: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
}

export interface Challenge {
  id: string;
  description: string;
  points: number;
  completed: boolean;
}
