// src/components/sponsors/SponsorForm.tsx
'use client';

import { Sponsor } from '@/types/types';
import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface SponsorFormProps {
  initialData?: Sponsor | null;
  onSubmit: (data: Omit<Sponsor, 'id'>) => void;
  onCancel: () => void;
}

const SponsorForm = ({ initialData, onSubmit, onCancel }: SponsorFormProps) => {
  const [formData, setFormData] = useState<Omit<Sponsor, 'id'>>({
    name: '',
    logo: '',
    website: '',
    contributionLevel: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        logo: initialData.logo,
        website: initialData.website,
        contributionLevel: initialData.contributionLevel,
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
        label="Logo URL"
        value={formData.logo}
        onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
      />
      
      <Input
        label="Website"
        value={formData.website}
        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        required
      />
      
      <Input
        label="Contribution Level"
        value={formData.contributionLevel}
        onChange={(e) => setFormData({ ...formData, contributionLevel: e.target.value })}
        required
      />

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