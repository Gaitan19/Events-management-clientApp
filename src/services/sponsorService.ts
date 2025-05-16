// src/services/sponsorService.ts
import apiClient from './apiClient';
import { Sponsor } from '@/types/types';

export const SponsorService = {
  getSponsors: async () => {
    return await apiClient.get<Sponsor[]>('/sponsor');
  },
  getSponsor: async (id: string) => {
    return await apiClient.get<Sponsor>(`/sponsor/${id}`);
  },
   createSponsor: async (sponsor: Omit<Sponsor, 'id'>) => {
    return await apiClient.post('/sponsor', sponsor);
  },
  updateSponsor: async (id: string, sponsor: Partial<Sponsor>) => {
    return await apiClient.put(`/sponsor/${id}`, sponsor);
  },
  deleteSponsor: async (id: string) => {
    return await apiClient.delete(`/sponsor/${id}`);
  },
};