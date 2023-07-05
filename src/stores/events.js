import { defineStore } from 'pinia';
import {
  getAllEventsByPage,
  getAllEvents,
  getUpcomingEvents,
  getTodayEvents
} from '../services/events';

export const useEvents = defineStore('events', {
  state: () => ({
    all: [],
    upcomings: [],
    today: [],
    loading: true
  }),
  actions: {
    getAllEventsByPage: async function (page = 0) {
      try {
        const allEventsByPage = await getAllEventsByPage(page);
        this.all = allEventsByPage.list;
      } catch (error) {
        console.log('Error during fetch all events by page', error);
      } finally {
        this.loading = false;
      }
    },
    getAllEvents: async function () {
      try {
        const allEvents = await getAllEvents();
        this.all = allEvents.list;
      } catch (error) {
        console.log('Error during fetch all events', error);
      } finally {
        this.loading = false;
      }
    },
    getUpcomingEvents: async function () {
      try {
        const upcomingEvents = await getUpcomingEvents();
        this.upcomings = upcomingEvents;
      } catch (error) {
        console.log('Error during fetch upcoming events', error);
      } finally {
        this.loading = false;
      }
    },
    getTodayEvents: async function () {
      try {
        const todayEvents = await getTodayEvents();
        this.today = todayEvents;
      } catch (error) {
        console.log('Error during fetch today events', error);
      } finally {
        this.loading = false;
      }
    }
  },
  getters: {
    firstUpcomings: (state) => state.upcomings.filter((el, index) => index < 3)
  }
});
