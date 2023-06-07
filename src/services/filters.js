import { eventsApi } from './events';

async function getEventsGenresList() {
  return await eventsApi.get('/api/events/genre/list');
}

async function getEventTimings(eventId) {
  return await eventsApi.get(`/api/events/app/date/timings/${eventId}`);
}

export { getEventsGenresList, getEventTimings };
