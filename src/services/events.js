import axios from 'axios';
export const eventsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_DEV}/api/events`
});

export async function getAllEventsByPage(page = 0) {
  try {
    const response = await eventsApi.get(`/all/${page}`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch events by page", error);
  }
}

export async function getAllEvents() {
  try {
    const response = await eventsApi.get(`/all`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch all events", error);
  }
}

export async function getUpcomingEvents() {
  try {
    const response = await eventsApi.get(`/upcomings`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch coming soon events", error);
  }
}

export async function getEventsGenresList() {
  try {
    const response = await eventsApi.get(`/genre/list`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch genres list", error);
  }
}

export async function getTodayEvents() {
  try {
    const response = await eventsApi.get(`/today`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch today events", error);
  }
}

export async function getEventDetails(id) {
  try {
    const response = await eventsApi.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch event details", error);
  }
}

export async function getComingSoonEvents(page = 0) {
  try {
    const response = await eventsApi.get(`/coming-soon/${page}`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch coming soon events", error);
  }
}
