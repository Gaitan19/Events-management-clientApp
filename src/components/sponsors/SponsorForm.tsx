// src/components/sponsors/SponsorForm.tsx
'use client';

import { Sponsor, Event } from '@/types/types';
import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { EventService } from '@/services/eventService';

interface SponsorFormProps {
  initialData?: Sponsor | null;
  onSubmit: (data: Omit<Sponsor, 'id'>) => void;
  onCancel: () => void;
}

const SponsorForm = ({ initialData, onSubmit, onCancel }: SponsorFormProps) => {
  const [formData, setFormData] = useState<Omit<Sponsor, 'id'>>({
    name: '',
    description: '',
    eventId: ''
  });
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await EventService.getEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        eventId: initialData.eventId
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Sponsor Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        textarea
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium dark:text-gray-200">Associated Event</label>
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
          {initialData ? 'Update Sponsor' : 'Create Sponsor'}
        </Button>
      </div>
    </form>
  );
};

export default SponsorForm;