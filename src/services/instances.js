import axios from 'axios';

export const eventsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/events`
});

export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/users`,
  withCredentials: true,
  headers: {
    'x-local': localStorage.getItem('locale')
  }
});

export const defaultApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    'x-local': localStorage.getItem('locale')
  }
});

export const faqApi = axios.create({
  baseURL: `${import.meta.env.VITE_FAQ_API_URL}/api/faq`,
  withCredentials: true
});

export const seatsApi = axios.create({
  baseURL: `${import.meta.env.VITE_SEATS_API_URL}`,
  withCredentials: false
});

export const v1Api = axios.create({
  baseURL: `${import.meta.env.VITE_APIV1_URL}`
});

export const bookingsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/bookings`
});
