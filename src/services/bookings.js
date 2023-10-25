import { bookingsApi } from './instances';

export const fetchBookings = async (bookingsType, userId, limit) => {
  const response = await bookingsApi.get(`/${bookingsType}/${userId}/${limit}`);
  return response.data;
};
