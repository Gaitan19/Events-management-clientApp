// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6 dark:text-white">
        Welcome to Events Management
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Manage your events, participants, and organizers efficiently
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/dashboard/events"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}