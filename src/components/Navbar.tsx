// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Events', href: '/dashboard/events' },
    { name: 'Organizers', href: '/dashboard/organizers' },
    { name: 'Participants', href: '/dashboard/participants' },
    { name: 'Sponsors', href: '/dashboard/sponsors' },
    { name: 'Registrations', href: '/dashboard/registrations' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
              Events Manager
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === link.href
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    } transition-colors`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};