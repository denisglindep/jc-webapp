import { mande } from 'mande';

export const eventsApi = mande('https://tickets.jacc-kw.org');

async function getAllEvents() {
  return await eventsApi.get('/api/events/all');
}

async function getComingSoonEvents() {
  return await eventsApi.get(
    'api/events/upcomings/coming-soon?sort_by=UPCOMING&start_date=2000-01-01&end_date=2018-12-31'
  );
}

async function getEventsGenresList() {
  return await eventsApi.get('/api/events/genre/list');
}

export { getAllEvents, getComingSoonEvents, getEventsGenresList };
