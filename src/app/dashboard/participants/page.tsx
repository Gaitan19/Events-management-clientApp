// src/app/dashboard/participants/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ParticipantService } from "@/services/participantService";
import { Participant } from "@/types/types";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import DataTable from "@/components/ui/DataTable";
import ParticipantForm from "@/components/participants/ParticipantForm";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ParticipantsPage = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedParticipant, setSelectedParticipant] =
    useState<Participant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchParticipants = async () => {
    try {
      const response = await ParticipantService.getParticipants();
      setParticipants(response.data);
    } catch (error) {
      toast.error("Error fetching participants");
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this participant?")) {
      try {
        await ParticipantService.deleteParticipant(id);
        toast.success("Participant deleted successfully");
        fetchParticipants();
      } catch (error) {
        toast.error("Error deleting participant");
      }
    }
  };

  const handleSubmit = async (participantData: Omit<Participant, "id">) => {
    try {
      if (selectedParticipant) {
        await ParticipantService.updateParticipant(
          selectedParticipant.id,
          participantData
        );
        toast.success("Participant updated successfully");
      } else {
        await ParticipantService.createParticipant(participantData);
        toast.success("Participant created successfully");
      }
      setIsModalOpen(false);
      fetchParticipants();
    } catch (error) {
      toast.error("Error saving participant");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    {
      header: "Actions",
      accessor: "id",
      render: (id: string, row: Participant) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedParticipant(row);
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
        <h1 className="text-2xl font-bold dark:text-white">
          Participants Management
        </h1>
        <button
          onClick={() => {
            setSelectedParticipant(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Participant
        </button>
      </div>

      <DataTable
        columns={columns}
        data={participants}
        emptyMessage="No participants found"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedParticipant ? "Edit Participant" : "Create Participant"}
      >
        <ParticipantForm
          initialData={selectedParticipant}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ParticipantsPage;
