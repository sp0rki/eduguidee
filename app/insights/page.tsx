'use client';

import React, { useState } from 'react';
import { TrendingUp, Calendar, Target, Award, BookOpen, Clock, BarChart3, PieChart } from 'lucide-react';

export default function StudyInsightsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  const studyProgress = [
    { subject: 'Mathematics', uploaded: 12, examined: 8, quizzesTaken: 15, avgScore: 85 },
    { subject: 'History', uploaded: 8, examined: 6, quizzesTaken: 10, avgScore: 78 },
    { subject: 'Chemistry', uploaded: 10, examined: 7, quizzesTaken: 12, avgScore: 82 },
    { subject: 'Biology', uploaded: 6, examined: 5, quizzesTaken: 8, avgScore: 88 },
    { subject: 'Physics', uploaded: 9, examined: 6, quizzesTaken: 11, avgScore: 80 },
  ];

  const performanceTrends = [
    { date: 'Mon', score: 75 },
    { date: 'Tue', score: 82 },
    { date: 'Wed', score: 78 },
    { date: 'Thu', score: 85 },
    { date: 'Fri', score: 88 },
    { date: 'Sat', score: 90 },
    { date: 'Sun', score: 87 },
  ];

  const recentActivities = [
    { action: 'Completed Quiz', material: 'Calculus Chapter 5', time: '2 hours ago', score: 92 },
    { action: 'Studied', material: 'World War II Notes', time: '5 hours ago' },
    { action: 'Generated Summary', material: 'Chemistry Lab Report', time: '1 day ago' },
  ];

  const recommendations = [
    'Focus on Chemistry - your quiz scores have dropped by 5% this week',
    'Great progress in Biology! Keep up the momentum',
    'Consider reviewing Mathematics materials from 2 weeks ago',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduGuide</h1>
                <p className="text-sm text-gray-600">AI-Assisted Learning Companion</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              <span className="text-sm font-medium text-gray-700">My Account</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button className="px-4 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300">
              Upload & Process
            </button>
            <button className="px-4 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300">
              My Library
            </button>
            <button className="px-4 py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Study Insights
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-green-600 font-medium">+12%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">45</p>
                <p className="text-sm text-gray-600">Materials Uploaded</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="text-xs text-green-600 font-medium">+8%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">32</p>
                <p className="text-sm text-gray-600">Examinees Created</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-xs text-green-600 font-medium">+5%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">56</p>
                <p className="text-sm text-gray-600">Quizzes Taken</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <span className="text-xs text-green-600 font-medium">+3%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">84%</p>
                <p className="text-sm text-gray-600">Avg Quiz Score</p>
              </div>
            </div>

            {/* Study Progress by Subject */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Study Progress</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedTimeRange('week')}
                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                      selectedTimeRange === 'week'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setSelectedTimeRange('month')}
                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                      selectedTimeRange === 'month'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setSelectedTimeRange('year')}
                    className={`px-3 py-1.5 text-sm rounded-lg font-medium transition ${
                      selectedTimeRange === 'year'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Year
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {studyProgress.map((subject, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                      <span className="text-sm font-medium text-gray-600">
                        Avg Score: <span className="text-blue-600">{subject.avgScore}%</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{subject.uploaded}</p>
                        <p className="text-xs text-gray-600">Materials Uploaded</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{subject.examined}</p>
                        <p className="text-xs text-gray-600">Examinees Created</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{subject.quizzesTaken}</p>
                        <p className="text-xs text-gray-600">Quizzes Taken</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${subject.avgScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Trends */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Trends</h2>
              <div className="h-64 flex items-end justify-between space-x-2">
                {performanceTrends.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-blue-600 rounded-t-lg hover:bg-blue-700 transition cursor-pointer relative group" style={{ height: `${day.score}%` }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition">
                        {day.score}%
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{day.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-6">
            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.action}</span> {activity.material}
                      </p>
                      {activity.score && (
                        <p className="text-xs text-green-600 font-medium mt-1">Score: {activity.score}%</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Personalized Tips</h3>
              <div className="space-y-3">
                {recommendations.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2 bg-white p-3 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <span className="text-sm font-medium text-gray-900">153 MB / 5 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '3%' }} />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Study Streak</span>
                  <span className="text-sm font-medium text-orange-600">7 days 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
