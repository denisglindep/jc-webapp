import axios from 'axios';
// import { mande } from 'mande';
export const eventsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_DEV}/api/events`
});

async function getAllEventsByPage(page = 0) {
  try {
    const response = await eventsApi.get(
      `${import.meta.env.VITE_API_URL_DEV}/api/events/all/${page}`
    );
    return response.data;
  } catch (error) {
    console.log("Can't fetch events by page", error);
  }
}

async function getAllEvents() {
  try {
    const response = await eventsApi.get(`${import.meta.env.VITE_API_URL_DEV}/api/events/all`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch all events", error);
  }
}

async function getUpcomingEvents() {
  try {
    const response = await eventsApi.get(
      `${import.meta.env.VITE_API_URL_DEV}/api/events/upcomings`
    );
    return response.data;
  } catch (error) {
    console.log("Can't fetch coming soon events", error);
  }
}

async function getEventsGenresList() {
  try {
    const response = await eventsApi.get(
      `${import.meta.env.VITE_API_URL_DEV}/api/events/genre/list`
    );
    return response.data;
  } catch (error) {
    console.log("Can't fetch genres list", error);
  }
}

async function getTodayEvents() {
  try {
    const response = await eventsApi.get(`${import.meta.env.VITE_API_URL_DEV}/api/events/today`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch today events", error);
  }
}

async function getEventDetails(id) {
  try {
    const response = await eventsApi.get(`${import.meta.env.VITE_API_URL_DEV}/api/events/${id}`);
    return response.data;
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
