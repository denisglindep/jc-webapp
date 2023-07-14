import { mande } from 'mande';

export const eventsApi = mande('https://tickets.jacc-kw.org');

async function getAllEventsByPage(page = 0) {
  try {
    return await eventsApi.get(`/api/events/all/${page}`);
  } catch (error) {
    console.log("Can't fetch events by page", error);
  }
}

async function getAllEvents() {
  try {
    return await eventsApi.get(`/api/events/all`);
  } catch (error) {
    console.log("Can't fetch all events", error);
  }
}

async function getUpcomingEvents() {
  try {
    return await eventsApi.get('api/events/upcomings');
  } catch (error) {
    console.log("Can't fetch coming soon events", error);
  }
}

async function getEventsGenresList() {
  try {
    return await eventsApi.get('/api/events/genre/list');
  } catch (error) {
    console.log("Can't fetch genres list", error);
  }
}

async function getTodayEvents() {
  try {
    return await eventsApi.get('/api/events/today');
  } catch (error) {
    console.log("Can't fetch today events", error);
  }
}

async function getEventDetails(id) {
  try {
    return await eventsApi.get(`/api/events/${id}`);
  } catch (error) {
    console.log("Can't fetch event details", error);
  }
}

export {
  getAllEventsByPage,
  getUpcomingEvents,
  getEventsGenresList,
  getAllEvents,
  getTodayEvents,
  getEventDetails
};
