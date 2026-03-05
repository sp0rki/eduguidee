'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { RequireAuth } from '../../components/RequireAuth';

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
                <p className="text-sm text-gray-600">Manage your EduGuide profile</p>
              </div>
            </div>
            <Link
              href="/upload"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Back to app
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <p className="text-sm text-gray-600">Loading your account details...</p>
            ) : (
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-sm font-semibold text-gray-700 mb-1">Email</h2>
                  <p className="text-sm text-gray-900">
                    {email ?? 'No email on file'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h2 className="text-sm font-semibold text-gray-700 mb-1">Account Status</h2>
                  <p className="text-sm text-gray-900">Logged in</p>
                </div>
              </>
            )}

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Need to change your email or password? Use your sign-in provider&apos;s settings.
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

