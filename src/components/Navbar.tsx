// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Transition } from '@headlessui/react';

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Events', href: '/dashboard/events' },
    { name: 'Organizers', href: '/dashboard/organizers' },
    { name: 'Participants', href: '/dashboard/participants' },
    { name: 'Sponsors', href: '/dashboard/sponsors' },
    { name: 'Registrations', href: '/dashboard/registrations' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
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
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Open menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="md:hidden absolute w-full bg-white dark:bg-gray-800 shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
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
      </Transition>
    </nav>
  );
};