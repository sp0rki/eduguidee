'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const DEMO_SESSION_KEY = 'eduguide_demo_session';

export function hasDemoSession(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(DEMO_SESSION_KEY) === '1';
}

export function setDemoSession(): void {
  if (typeof window !== 'undefined') sessionStorage.setItem(DEMO_SESSION_KEY, '1');
}

export function clearDemoSession(): void {
  if (typeof window !== 'undefined') sessionStorage.removeItem(DEMO_SESSION_KEY);
}

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useLayoutEffect(() => {
    if (!isSupabaseConfigured && hasDemoSession()) {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      if (!isSupabaseConfigured) {
        if (!mounted) return;
        if (hasDemoSession()) {
          setChecking(false);
          return;
        }
        router.replace('/auth');
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      if (!data.session) {
        router.replace('/auth');
      } else {
        setChecking(false);
      }
    };

    checkSession();

    if (!isSupabaseConfigured) {
      return () => { mounted = false; };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/auth');
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-sm text-gray-600">Checking your session...</div>
      </div>
    );
  }

  return <>{children}</>;
}

