// src/components/events/EventForm.tsx
'use client';

import { Event } from '@/types/types';
import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

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
    organizerId: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        date: initialData.date,
        location: initialData.location,
        maxCapacity: initialData.maxCapacity,
        organizerId: initialData.organizerId,
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
        onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <Input
        label="Description"
        value={formData.description}
        onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, description: e.target.value })}
        textarea
      />
      
      <Input
        label="Date"
        type="datetime-local"
        value={formData.date}
        onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      
      <Input
        label="Location"
        value={formData.location}
        onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, location: e.target.value })}
        required
      />
      
      <Input
        label="Max Capacity"
        type="number"
        value={formData.maxCapacity}
        onChange={(e: { target: { value: string; }; }) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) })}
        required
      />
      
      <Input
        label="Organizer ID"
        value={formData.organizerId}
        onChange={(e: { target: { value: any; }; }) => setFormData({ ...formData, organizerId: e.target.value })}
        required
      />

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