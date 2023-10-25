import { defineStore } from 'pinia';
import { fetchBookings } from '../services/bookings';

export default defineStore('bookings', {
  state: () => ({
    bookings: {
      upcoming: [],
      past: []
    }
  }),
  actions: {
    fetchUserBookings: async function (bookingsType, userId, limit = 0) {
      try {
        const bookings = await fetchBookings(bookingsType, userId, limit);
        this.bookings = {
          ...this.bookings,
          [bookingsType]: bookings.list
        };
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    getCurrentBookings: (state) => (bookingsType) => {
      return state.bookings[bookingsType];
    },
    getCurrentBookingsEvents: (state) => (bookingsType) => {
      return state.bookings[bookingsType].map((booking) => booking.event);
    },
    getBookingEventTickets: (state) => (eventId) =>
      [...state.bookings.upcoming, ...state.bookings.past].find(
        (booking) => booking?.event?.id == eventId
      )?.tickets,
    getSelectedBooking: (state) => (bookingId) => {
      return [...state.bookings.upcoming, ...state.bookings.past].find(
        (booking) => booking?.id == bookingId
      );
    }
  }
});
