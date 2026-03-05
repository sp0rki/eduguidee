'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Upload, Library, TrendingUp, Sparkles, Target, Clock, Award, Sun, Moon } from 'lucide-react';
import { useTheme } from '../components/ThemeProvider';

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400',
      yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in-down">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EduGuide</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI-Assisted Learning Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in-down animation-delay-100">
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link
                href="/auth"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/auth"
                className="btn-press px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Study Assistant</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up animation-delay-100">
            Transform Your Study
            <br />
            <span className="text-blue-600 dark:text-blue-400">Materials Into Success</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Upload your notes, textbooks, and videos. Let AI create personalized summaries, 
            quizzes, and study insights to help you learn faster and retain more.
          </p>
          <div className="flex items-center justify-center space-x-4 animate-fade-in-up animation-delay-300">
            <Link 
              href="/upload"
              className="btn-press px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Learning Now
            </Link>
            <button className="btn-press px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 font-semibold text-lg hover:-translate-y-0.5 active:translate-y-0">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`scroll-animate scroll-animate-delay-${index + 1} bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg dark:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2 hover:border-blue-200 dark:hover:border-blue-700 cursor-default`}
            >
              <div className={`w-12 h-12 ${getColorClasses(feature.color)} rounded-lg flex items-center justify-center mb-4 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-animate">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three simple steps to transform your study experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center scroll-animate scroll-animate-delay-1">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Upload</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload your study materials - PDFs, images, videos, or documents
              </p>
            </div>

            <div className="text-center scroll-animate scroll-animate-delay-2">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Process</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI analyzes your content and generates summaries, quizzes, and insights
              </p>
            </div>

            <div className="text-center scroll-animate scroll-animate-delay-3">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Learn</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Study smarter with personalized materials and track your progress
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="scroll-animate bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Students Love EduGuide
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="bg-white rounded-full p-1 mt-1 transition-transform duration-200 group-hover:scale-110">
                      {benefit.icon}
                    </div>
                    <p className="text-lg text-white/90">{benefit.text}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/upload"
                className="btn-press inline-block mt-8 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started Free
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="space-y-6">
                <div className="bg-white/20 rounded-lg p-6 hover:bg-white/25 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Study Materials</span>
                    <span className="text-2xl font-bold">156</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <div className="bg-white/20 rounded-lg p-6 hover:bg-white/25 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Avg Quiz Score</span>
                    <span className="text-2xl font-bold">87%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>

                <div className="bg-white/20 rounded-lg p-6 hover:bg-white/25 transition-colors duration-200">
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

      <section className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-animate">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of students who are studying smarter with EduGuide
          </p>
          <Link
            href="/upload"
            className="btn-press inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Your Free Trial
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            No credit card required • Get started in seconds
          </p>
        </div>
      </section>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">EduGuide</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered learning companion for students
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Features</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">About</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Careers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Terms</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 EduGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
