// src/services/participantService.ts
import apiClient from './apiClient';
import { Participant } from '@/types/types';

export const ParticipantService = {
  getParticipants: async () => {
    return await apiClient.get<Participant[]>('/participant');
  },
  getParticipant: async (id: string) => {
    return await apiClient.get<Participant>(`/participant/${id}`);
  },
  createParticipant: async (participant: Omit<Participant, 'id'>) => {
    return await apiClient.post('/participant', participant);
  },
  updateParticipant: async (id: string, participant: Partial<Participant>) => {
    return await apiClient.put(`/participant/${id}`, participant);
  },
  deleteParticipant: async (id: string) => {
    return await apiClient.delete(`/participant/${id}`);
  },
};