'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Activity {
  id: string;
  action: string;
  material: string;
  timestamp: number;
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (action: string, material: string) => void;
  clearActivities: () => void;
}

const ActivityContext = createContext<ActivityContextType>({
  activities: [],
  addActivity: () => {},
  clearActivities: () => {},
});

export const useActivity = () => useContext(ActivityContext);

const STORAGE_KEY = 'eduguide_activities';
const MAX_ACTIVITIES = 20;

function getRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export function useRelativeTime(timestamp: number): string {
  const [label, setLabel] = useState(() => getRelativeTime(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setLabel(getRelativeTime(timestamp));
    }, 30_000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return label;
}

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setActivities(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (next: Activity[]) => {
    setActivities(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const addActivity = (action: string, material: string) => {
    const entry: Activity = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      action,
      material,
      timestamp: Date.now(),
    };
    setActivities(prev => {
      const next = [entry, ...prev].slice(0, MAX_ACTIVITIES);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearActivities = () => persist([]);

  return (
    <ActivityContext.Provider value={{ activities, addActivity, clearActivities }}>
      {children}
    </ActivityContext.Provider>
  );
}

export { getRelativeTime };
