'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Target, Award, BookOpen, BarChart3 } from 'lucide-react';
import { RequireAuth } from '../../components/RequireAuth';
import { AppNav } from '../../components/AppNav';

const studyProgress: Array<{
  subject: string;
  uploaded: number;
  examined: number;
  quizzesTaken: number;
  avgScore: number;
}> = [];

const performanceTrends = [
  { date: 'Mon', score: 75 },
  { date: 'Tue', score: 82 },
  { date: 'Wed', score: 78 },
  { date: 'Thu', score: 85 },
  { date: 'Fri', score: 88 },
  { date: 'Sat', score: 90 },
  { date: 'Sun', score: 87 },
];

const recentActivities: Array<{
  action: string;
  material: string;
  time: string;
  score?: number;
}> = [];

const recommendations: string[] = [];

export default function StudyInsightsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'week' | 'month' | 'year'>('week');

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EduGuide</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI-Assisted Learning Companion</p>
              </div>
            </div>
            <Link
              href="/account"
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">My Account</span>
            </Link>
            </div>
          </div>
        </header>

        <AppNav />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">0%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Materials Uploaded</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">0%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Examinees Created</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">0%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quizzes Taken</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">0%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">0%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Quiz Score</p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Study Progress</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedTimeRange('week')}
                      className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                        selectedTimeRange === 'week'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setSelectedTimeRange('month')}
                      className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                        selectedTimeRange === 'month'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      Month
                    </button>
                    <button
                      onClick={() => setSelectedTimeRange('year')}
                      className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                        selectedTimeRange === 'year'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      Year
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {studyProgress.map((subject, index) => (
                    <div key={index} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{subject.subject}</h3>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Avg Score: <span className="text-blue-600 dark:text-blue-400">{subject.avgScore}%</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{subject.uploaded}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Materials Uploaded</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{subject.examined}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Examinees Created</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{subject.quizzesTaken}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Quizzes Taken</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${subject.avgScore}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-300">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Performance Trends</h2>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {performanceTrends.map((day, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-blue-600 dark:bg-blue-500 rounded-t-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition cursor-pointer relative group"
                        style={{ height: `${day.score}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                          {day.score}%
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{day.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-80 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-300">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
                {recentActivities.length === 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Nothing here yet. Once you start uploading materials and taking quizzes,
                    your recent activity will show up in this panel.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-gray-200">
                            <span className="font-medium">{activity.action}</span>{' '}
                            {activity.material}
                          </p>
                          {activity.score && (
                            <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                              Score: {activity.score}%
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg shadow-sm p-6 transition-colors duration-300">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Personalized Tips</h3>
                {recommendations.length === 0 ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    No personalized tips yet. As you study and take quizzes, we&apos;ll generate
                    smart recommendations to help you improve.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recommendations.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-colors duration-300">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">System Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Storage Used</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">0 MB / 5 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Study Streak</span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">No streak yet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

