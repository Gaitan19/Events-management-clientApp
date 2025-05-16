// src/services/registrationService.ts
import apiClient from './apiClient';
import { Registration } from '@/types/types';

export const RegistrationService = {
  getRegistrations: async () => {
    return await apiClient.get<Registration[]>('/registration');
  },
  getRegistration: async (id: string) => {
    return await apiClient.get<Registration>(`/registration/${id}`);
  },
  createRegistration: async (registration: Omit<Registration, 'id'>) => {
    return await apiClient.post('/registration', registration);
  },
  updateRegistration: async (id: string, registration: Partial<Registration>) => {
    return await apiClient.put(`/registration/${id}`, registration);
  },
  deleteRegistration: async (id: string) => {
    return await apiClient.delete(`/registration/${id}`);
  },
};