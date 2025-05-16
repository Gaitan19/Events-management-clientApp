// src/app/dashboard/registrations/page.tsx
"use client";

import { useEffect, useState } from "react";
import { RegistrationService } from "@/services/registrationService";
import { Registration, Event, Participant } from "@/types/types";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import DataTable from "@/components/ui/DataTable";
import RegistrationForm from "@/components/registrations/RegistrationForm";
import { EventService } from "@/services/eventService";
import { ParticipantService } from "@/services/participantService";
import Loading from '@/components/ui/Loading';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const RegistrationsPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   const fetchData = async () => {
    try {
      setIsLoading(true); // Activamos el loading
      const [regRes, eventsRes, participantsRes] = await Promise.all([
        RegistrationService.getRegistrations(),
        EventService.getEvents(),
        ParticipantService.getParticipants(),
      ]);

      setRegistrations(regRes.data);
      setEvents(eventsRes.data);
      setParticipants(participantsRes.data);
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setIsLoading(false); // Desactivamos el loading siempre
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this registration?")) {
      try {
        await RegistrationService.deleteRegistration(id);
        toast.success("Registration deleted successfully");
        fetchData();
      } catch (error) {
        toast.error("Error deleting registration");
      }
    }
  };

  const handleSubmit = async (registrationData: Omit<Registration, "id">) => {
    try {
      if (selectedRegistration) {
        await RegistrationService.updateRegistration(
          selectedRegistration.id,
          registrationData
        );
        toast.success("Registration updated successfully");
      } else {
        await RegistrationService.createRegistration(registrationData);
        toast.success("Registration created successfully");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Error saving registration");
    }
  };

  const columns = [
    {
      header: "Participant",
      accessor: "participant",
      render: (value: any, row: Registration) => row.participant?.name || "N/A",
    },
    {
      header: "Event",
      accessor: "event",
      render: (value: any, row: Registration) => row.event?.name || "N/A",
    },
    {
      header: "Actions",
      accessor: "id",
      render: (id: string, row: Registration) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedRegistration(row);
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

  if (isLoading) return <Loading text="Loading Registrations Data" />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          Registrations Management
        </h1>
        <button
          onClick={() => {
            setSelectedRegistration(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Registration
        </button>
      </div>

      <DataTable
        columns={columns}
        data={registrations}
        emptyMessage="No registrations found"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          selectedRegistration ? "Edit Registration" : "Create Registration"
        }
      >
        <RegistrationForm
          initialData={selectedRegistration}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          events={events}
          participants={participants}
        />
      </Modal>
    </div>
  );
};

export default RegistrationsPage;
