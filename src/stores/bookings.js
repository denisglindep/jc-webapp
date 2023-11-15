import { defineStore } from 'pinia';
import { fetchBookings } from '../services/bookings';

export default defineStore('bookings', {
  state: () => ({
    loading: false,
    bookings: {
      upcoming: [],
      past: []
    }
  }),
  actions: {
    fetchUserBookings: async function (bookingsType, userId, limit = 0) {
      try {
        this.loading = true;
        const bookings = await fetchBookings(bookingsType, userId, limit);
        this.bookings = {
          ...this.bookings,
          [bookingsType]: bookings.list
        };
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
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
    getBookingEventTickets: (state) => (eventId, bookingId) =>
      [...state.bookings.upcoming, ...state.bookings.past].find(
        (booking) => booking?.event?.id == eventId && booking?.id == bookingId
      )?.tickets,
    getSelectedBooking: (state) => (bookingId) => {
      return [...state.bookings.upcoming, ...state.bookings.past].find(
        (booking) => booking?.id == bookingId
      );
    }
  }
});
