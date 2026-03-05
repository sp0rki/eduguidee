'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Sun, Moon } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { RequireAuth } from '../../components/RequireAuth';
import { useTheme } from '../../components/ThemeProvider';
import { PageTransition } from '../../components/PageTransition';

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!active) return;
        if (error) {
          setError(error.message);
        } else {
          setEmail(data.user?.email ?? null);
        }
      } catch (err: any) {
        if (!active) return;
        setError(err.message ?? 'Unable to load account information.');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  const handleSignOut = async () => {
    setError(null);
    try {
      await supabase.auth.signOut();
      router.push('/auth');
    } catch (err: any) {
      setError(err.message ?? 'Failed to sign out. Please try again.');
    }
  };

  return (
    <RequireAuth>
      <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="fixed top-4 right-4 p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95 z-50"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 p-8 animate-fade-in-up transition-colors duration-300">
          <div className="flex items-center justify-between mb-6 animate-fade-in-down">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Account</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your EduGuide profile</p>
              </div>
            </div>
            <Link
              href="/upload"
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Back to app
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-sm text-gray-600 dark:text-gray-400 animate-fade-in">Loading your account details...</p>
            ) : (
              <>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700 animate-fade-in-up animation-delay-100 transition-colors duration-300">
                  <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email</h2>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {email ?? 'No email on file'}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700 animate-fade-in-up animation-delay-200 transition-colors duration-300">
                  <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Account Status</h2>
                  <span className="inline-flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-sm text-gray-900 dark:text-white">Logged in</p>
                  </span>
                </div>
              </>
            )}

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg px-3 py-2 animate-fade-in transition-colors duration-300">
                {error}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between animate-fade-in-up animation-delay-300">
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
              Need to change your email or password? Use your sign-in provider&apos;s settings.
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="btn-press px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 hover:shadow-md active:scale-95"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
      </PageTransition>
    </RequireAuth>
  );
}

