// src/services/eventService.ts
import apiClient from './apiClient';
import { Event } from '@/types/types';

export const EventService = {
  getEvents: async () => {
    return await apiClient.get<Event[]>('/event');
  },
  getEvent: async (id: string) => {
    return await apiClient.get<Event>(`/event/${id}`);
  },
  createEvent: async (event: Omit<Event, 'id'>) => {
    return await apiClient.post('/event', event);
  },
  updateEvent: async (id: string, event: Partial<Event>) => {
    return await apiClient.put(`/event/${id}`, event);
  },
  deleteEvent: async (id: string) => {
    return await apiClient.delete(`/event/${id}`);
  },
};