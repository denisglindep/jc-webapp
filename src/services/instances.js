import axios from 'axios';

export const eventsApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/events`
});

export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/users`,
  withCredentials: true
});

export const defaultApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
});

export const faqApi = axios.create({
  baseURL: `${import.meta.env.VITE_FAQ_API_URL_PROD}/api/faq`,
  withCredentials: true
});

export const seatsApi = axios.create({
  baseURL: `${import.meta.env.VITE_SEATS_API_URL}`,
  withCredentials: false
});
