'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function AppNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const linkClass = (href: string) =>
    `px-4 py-4 text-sm font-medium border-b-2 transition-all duration-200 ${
      pathname === href
        ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-transparent hover:border-gray-300 dark:hover:border-gray-500'
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <Link href="/upload" className={linkClass('/upload')}>
              Upload &amp; Process
            </Link>
            <Link href="/my-library" className={linkClass('/my-library')}>
              My Library
            </Link>
            <Link href="/insights" className={linkClass('/insights')}>
              Study Insights
            </Link>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

