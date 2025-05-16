// src/components/events/EventDetailsModal.tsx
'use client';

import { Event } from '@/types/types';
import Modal from '@/components/ui/Modal';
import { format } from 'date-fns';
import { 
  XMarkIcon,
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
  UserIcon,
  TicketIcon,
  UsersIcon 
} from '@heroicons/react/24/outline';

const EventDetailsModal = ({
  event,
  onClose
}: {
  event: Event | null;
  onClose: () => void;
}) => {
  if (!event) return <></>;

  return (
    <Modal isOpen={!!event} onClose={onClose} title="">
      {/* Custom Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <CalendarDaysIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Event Details
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center space-x-3 mb-4">
            <CalendarDaysIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {event.name}
            </h3>
          </div>
          {event.description && (
            <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date & Time */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <CalendarDaysIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Date & Time</h4>
            </div>
            <p className="text-gray-900 dark:text-gray-100">
              {format(new Date(event.date), 'PPPPp')}
            </p>
          </div>

          {/* Location */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <MapPinIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Location</h4>
            </div>
            <p className="text-gray-900 dark:text-gray-100">{event.location}</p>
          </div>

          {/* Capacity */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <UserGroupIcon className="w-5 h-5 text-orange-500 dark:text-orange-400" />
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Capacity</h4>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {event.maxCapacity}
              </span>
              <span className="text-gray-500 dark:text-gray-400">spots available</span>
            </div>
          </div>

          {/* Organizer */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <UserIcon className="w-5 h-5 text-red-500 dark:text-red-400" />
              <h4 className="font-medium text-gray-700 dark:text-gray-300">Organizer</h4>
            </div>
            {event.organizer ? (
              <div>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {event.organizer.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {event.organizer.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {event.organizer.phone}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No organizer information</p>
            )}
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <TicketIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Sponsors</h3>
          </div>
          {event.sponsors?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {event.sponsors.map((sponsor) => (
                <div 
                  key={sponsor.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600"
                >
                  <p className="font-medium text-gray-900 dark:text-white">
                    {sponsor.name}
                  </p>
                  {sponsor.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {sponsor.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No sponsors for this event
            </p>
          )}
        </div>

        {/* Registrations Section */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <UsersIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            <h3 className="font-medium text-gray-700 dark:text-gray-300">Registrations</h3>
          </div>
          {event.registrations?.length ? (
            <div className="space-y-3">
              {event.registrations.map((registration) => (
                <div 
                  key={registration.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {registration.participant?.name || 'Anonymous'}
                    </p>
                    {registration.registrationDate && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Registered: {format(new Date(registration.registrationDate), 'PPP • pp')}
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    #{registration.participantId.slice(0, 6)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No registrations yet
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailsModal;