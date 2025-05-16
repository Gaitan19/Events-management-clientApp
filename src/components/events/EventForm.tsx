// src/components/events/EventForm.tsx
'use client';

import { Event, Organizer } from '@/types/types';
import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { OrganizerService } from '@/services/organizerService';

interface EventFormProps {
  initialData?: Event | null;
  onSubmit: (data: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}

const EventForm = ({ initialData, onSubmit, onCancel }: EventFormProps) => {
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    name: '',
    description: '',
    date: '',
    location: '',
    maxCapacity: 0,
    organizerId: ''
  });
  const [organizers, setOrganizers] = useState<Organizer[]>([]);

  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const response = await OrganizerService.getOrganizers();
        setOrganizers(response.data);
      } catch (error) {
        console.error('Error fetching organizers:', error);
      }
    };
    fetchOrganizers();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        date: initialData.date,
        location: initialData.location,
        maxCapacity: initialData.maxCapacity,
        organizerId: initialData.organizerId
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
        label="Event Name"
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
      
      <Input
        label="Date"
        type="datetime-local"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      
      <Input
        label="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />
      
      <Input
        label="Max Capacity"
        type="number"
        value={formData.maxCapacity}
        onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) })}
        required
      />
      
      <div className="space-y-2">
        <label className="block text-sm font-medium dark:text-gray-200">Organizer</label>
        <select
          value={formData.organizerId}
          onChange={(e) => setFormData({ ...formData, organizerId: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          required
        >
          <option value="">Select Organizer</option>
          {organizers.map((organizer) => (
            <option key={organizer.id} value={organizer.id}>
              {organizer.name} ({organizer.email})
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;