'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppNav() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `px-4 py-4 text-sm font-medium border-b-2 transition ${
      pathname === href
        ? 'text-blue-600 border-blue-600'
        : 'text-gray-600 hover:text-gray-900 border-transparent hover:border-gray-300'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </nav>
  );
}

