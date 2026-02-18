'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Upload, Library, TrendingUp, Sparkles, Target, Clock, Award } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: 'Upload & Process',
      description: 'Upload your study materials and let AI transform them into smart learning resources',
      color: 'blue'
    },
    {
      icon: <Library className="w-6 h-6" />,
      title: 'Organized Library',
      description: 'Keep all your materials organized by subject with easy search and filtering',
      color: 'purple'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Track Progress',
      description: 'Get detailed insights into your study habits and performance trends',
      color: 'green'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Tools',
      description: 'Generate summaries, quizzes, and key points automatically from your materials',
      color: 'yellow'
    }
  ];

  const benefits = [
    {
      icon: <Target className="w-5 h-5 text-blue-600" />,
      text: 'Study smarter with AI-generated summaries and quizzes'
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      text: 'Save hours of manual note-taking and organization'
    },
    {
      icon: <Award className="w-5 h-5 text-blue-600" />,
      text: 'Track your progress and improve your grades'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduGuide</h1>
                <p className="text-sm text-gray-600">AI-Assisted Learning Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Sign In
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Study Assistant</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Study
            <br />
            <span className="text-blue-600">Materials Into Success</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your notes, textbooks, and videos. Let AI create personalized summaries, 
            quizzes, and study insights to help you learn faster and retain more.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link 
              href="/upload"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Start Learning Now
            </Link>
            <button className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition font-semibold text-lg">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
            >
              <div className={`w-12 h-12 ${getColorClasses(feature.color)} rounded-lg flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your study experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload</h3>
              <p className="text-gray-600">
                Upload your study materials - PDFs, images, videos, or documents
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Process</h3>
              <p className="text-gray-600">
                AI analyzes your content and generates summaries, quizzes, and insights
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn</h3>
              <p className="text-gray-600">
                Study smarter with personalized materials and track your progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Students Love EduGuide
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-white rounded-full p-1 mt-1">
                      {benefit.icon}
                    </div>
                    <p className="text-lg text-white/90">{benefit.text}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/upload"
                className="inline-block mt-8 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold text-lg shadow-lg"
              >
                Get Started Free
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="space-y-6">
                <div className="bg-white/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Study Materials</span>
                    <span className="text-2xl font-bold">156</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <div className="bg-white/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Avg Quiz Score</span>
                    <span className="text-2xl font-bold">87%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>

                <div className="bg-white/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Study Streak</span>
                    <span className="text-2xl font-bold">12 days 🔥</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who are studying smarter with EduGuide
          </p>
          <Link
            href="/upload"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Start Your Free Trial
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Get started in seconds
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold text-gray-900">EduGuide</span>
              </div>
              <p className="text-sm text-gray-600">
                AI-powered learning companion for students
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 EduGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
