// src/app/dashboard/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import { EventService } from "@/services/eventService";
import { Event } from "@/types/types";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import EventForm from "@/components/events/EventForm";
import DataTable from "@/components/ui/DataTable";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await EventService.getEvents();
      setEvents(response.data);
    } catch (error) {
      toast.error("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await EventService.deleteEvent(id);
        toast.success("Event deleted successfully");
        fetchEvents();
      } catch (error) {
        toast.error("Error deleting event");
      }
    }
  };

  const handleSubmit = async (eventData: Omit<Event, "id">) => {
    try {
      if (selectedEvent) {
        await EventService.updateEvent(selectedEvent.id, eventData);
        toast.success("Event updated successfully");
      } else {
        await EventService.createEvent(eventData);
        toast.success("Event created successfully");
      }
      setIsModalOpen(false);
      fetchEvents();
    } catch (error) {
      toast.error("Error saving event");
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Date", accessor: "date" },
    { header: "Location", accessor: "location" },
    { header: "Capacity", accessor: "maxCapacity" },
    {
      header: "Organizer",
      accessor: "organizer",
      render: (value: any, row: Event) => row.organizer?.name || "N/A",
    },
    {
      header: "Actions",
      accessor: "id",
      render: (id: string, row: Event) => (
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setSelectedEvent(row);
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
          Events Management
        </h1>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Event
        </button>
      </div>

      <DataTable
        columns={columns}
        data={events}
        emptyMessage="No events found"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEvent ? "Edit Event" : "Create Event"}
      >
        <EventForm
          initialData={selectedEvent}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default EventsPage;
