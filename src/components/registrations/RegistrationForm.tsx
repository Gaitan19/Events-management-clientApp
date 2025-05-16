// src/components/registrations/RegistrationForm.tsx
'use client';

import { Registration, Event, Participant } from '@/types/types';
import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface RegistrationFormProps {
  initialData?: Registration | null;
  onSubmit: (data: Omit<Registration, 'id'>) => void;
  onCancel: () => void;
  events: Event[];
  participants: Participant[];
}

const RegistrationForm = ({
  initialData,
  onSubmit,
  onCancel,
  events,
  participants
}: RegistrationFormProps) => {
  const [formData, setFormData] = useState<Omit<Registration, 'id'>>({
    participantId: '',
    eventId: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        participantId: initialData.participantId,
        eventId: initialData.eventId,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium dark:text-gray-200">Participant</label>
        <select
          value={formData.participantId}
          onChange={(e) => setFormData({ ...formData, participantId: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="">Select Participant</option>
          {participants.map((participant) => (
            <option key={participant.id} value={participant.id}>
              {participant.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium dark:text-gray-200">Event</label>
        <select
          value={formData.eventId}
          onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} ({new Date(event.date).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Registration' : 'Create Registration'}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;