import Link from 'next/link';
import { CalendarDaysIcon, UserGroupIcon, TicketIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br ">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text md:leading-normal text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Transform Your Event Management
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          The ultimate platform to organize, track and analyze all your events in one place. Perfect for teams of any size.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-20">
          <Link
            href="/dashboard/events"
            className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>

          <Link
            href="/dashboard/events"
            className="px-8 py-4 border-2 border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Explore Features
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <CalendarDaysIcon className="w-10 h-10 mx-auto" />,
              title: "Event Management",
              desc: "Create and organize events with ease"
            },
            {
              icon: <UserGroupIcon className="w-10 h-10 mx-auto" />,
              title: "Participants Tracking",
              desc: "Manage attendees efficiently"
            },
            {
              icon: <TicketIcon className="w-10 h-10 mx-auto" />,
              title: "Sponsors Integration",
              desc: "Connect with event sponsors"
            },
            {
              icon: <ChartBarIcon className="w-10 h-10 mx-auto" />,
              title: "Real-time Analytics",
              desc: "Get insights on your events"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-blue-500 dark:text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}