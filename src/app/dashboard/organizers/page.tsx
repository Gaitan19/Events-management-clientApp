// src/app/dashboard/organizers/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { OrganizerService } from '@/services/organizerService';
import { Organizer } from '@/types/types';
import { toast } from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import DataTable from '@/components/ui/DataTable';
import OrganizerForm from '@/components/organizers/OrganizerForm';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const OrganizersPage = () => {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState<Organizer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrganizers = async () => {
    try {
      const response = await OrganizerService.getOrganizers();
      setOrganizers(response.data);
    } catch (error) {
      toast.error('Error fetching organizers');
    }
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this organizer?')) {
      try {
        await OrganizerService.deleteOrganizer(id);
        toast.success('Organizer deleted successfully');
        fetchOrganizers();
      } catch (error) {
        toast.error('Error deleting organizer');
      }
    }
  };

  const handleSubmit = async (organizerData: Omit<Organizer, 'id'>) => {
    try {
      if (selectedOrganizer) {
        await OrganizerService.updateOrganizer(selectedOrganizer.id, organizerData);
        toast.success('Organizer updated successfully');
      } else {
        await OrganizerService.createOrganizer(organizerData);
        toast.success('Organizer created successfully');
      }
      setIsModalOpen(false);
      fetchOrganizers();
    } catch (error) {
      toast.error('Error saving organizer');
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (id: string, row: Organizer) => (
        <div className="flex space-x-2">
         <button
            onClick={() => {
              setSelectedOrganizer(row);
              setIsModalOpen(true);
            }}
            className="flex items-center px-3 py-2 space-x-2 text-blue-600 transition-all duration-200 bg-blue-50 rounded-lg hover:bg-blue-100 hover:scale-105 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400"
          >
            <PencilIcon className="w-5 h-5 opacity-70 hover:opacity-100" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="flex items-center px-3 py-2 space-x-2 text-red-600 transition-all duration-200 bg-red-50 rounded-lg hover:bg-red-100 hover:scale-105 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400"
          >
            <TrashIcon className="w-5 h-5 opacity-70 hover:opacity-100" />
            <span>Delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Organizers Management</h1>
        <button
          onClick={() => {
            setSelectedOrganizer(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Organizer
        </button>
      </div>

      <DataTable
        columns={columns}
        data={organizers}
        emptyMessage="No organizers found"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedOrganizer ? 'Edit Organizer' : 'Create Organizer'}
      >
        <OrganizerForm
          initialData={selectedOrganizer}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default OrganizersPage;