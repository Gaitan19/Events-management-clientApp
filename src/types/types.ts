// src/types/types.ts
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  maxCapacity: number;
  organizerId: string;
  organizer?: Organizer;
  registrations?: Registration[];
  sponsors?: Sponsor[];
}

export interface Organizer {
  id: string;
  name: string;
  email: string;
  phone: string;
  events?: Event[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrations?: Registration[];
}

export interface Registration {
  id: string;
  participantId: string;
  eventId: string;
  participant?: Participant;
  event?: Event;
}

export interface Sponsor {
  id: string;
  name: string;
  description: string;
  eventId: string;
  event?: Event;
}