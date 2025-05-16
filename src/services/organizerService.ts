// src/services/organizerService.ts
import apiClient from './apiClient';
import { Organizer } from '@/types/types';

export const OrganizerService = {
  getOrganizers: async () => {
    return await apiClient.get<Organizer[]>('/organizer');
  },
  getOrganizer: async (id: string) => {
    return await apiClient.get<Organizer>(`/organizer/${id}`);
  },
  createOrganizer: async (organizer: Omit<Organizer, 'id'>) => {
    return await apiClient.post('/organizer', organizer);
  },
  updateOrganizer: async (id: string, organizer: Partial<Organizer>) => {
    return await apiClient.put(`/organizer/${id}`, organizer);
  },
  deleteOrganizer: async (id: string) => {
    return await apiClient.delete(`/organizer/${id}`);
  },
};