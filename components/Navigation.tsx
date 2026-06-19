'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const navLinks = [
  { href: '/today', label: 'Today' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/day', label: 'Day Planner' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl">Work Better</Link>
        
        <div className="flex gap-8 text-sm font-medium">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-blue-600 transition ${pathname === link.href ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          {user ? (
            <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">
              Logout
            </button>
          ) : (
            <Link href="/auth/login" className="text-sm font-medium text-blue-600 hover:underline">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
