// src/components/organizers/OrganizerForm.tsx
'use client';

import { Organizer } from '@/types/types';
import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface OrganizerFormProps {
  initialData?: Organizer | null;
  onSubmit: (data: Omit<Organizer, 'id'>) => void;
  onCancel: () => void;
}

const OrganizerForm = ({ initialData, onSubmit, onCancel }: OrganizerFormProps) => {
  const [formData, setFormData] = useState<Omit<Organizer, 'id'>>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
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
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      
      <Input
        label="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Organizer' : 'Create Organizer'}
        </Button>
      </div>
    </form>
  );
};

export default OrganizerForm;