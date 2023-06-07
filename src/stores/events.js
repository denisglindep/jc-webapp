import { defineStore } from 'pinia';
import { getAllEvents } from '../services/events';

export const useEvents = defineStore('events', {
  state: () => ({ events: [] }),
  actions: {
    getEvents: async function () {
      try {
        const allEvents = await getAllEvents();
        this.events = allEvents;
      } catch (error) {
        console.log('Error during fetch all events', error);
      }
    }
  }
});
