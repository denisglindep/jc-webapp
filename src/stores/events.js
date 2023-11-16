import { defineStore } from 'pinia';
import {
  getAllEventsByPage,
  getAllEvents,
  getUpcomingEvents,
  getTodayEvents,
  getEventDetails,
  getEventAvailableTimes,
  getEventAvailableTimesDetails,
  eventSelectSeats,
  getSeatsPricingInfo,
  setHoldTokenApi,
  setBookingSeatsIo,
  getSeatsAvaiability,
  callPaymentsApi,
  lockBookedSeats,
  getEventAttributionInfo
} from '../services/events';
import useProfile from './profile';
import { useFormatDate } from '../composables';

export default defineStore('events', {
  state: () => ({
    events: {
      all: [],
      upcomings: [],
      today: [],
      comingSoon: []
    },
    eventDetails: {
      data: null,
      pricing: [],
      selectedSeats: [],
      selectedDateTime: null,
      holdTokenInfo: null
    },
    loading: true
  }),
  actions: {
    getAllEventsByPage: async function (page = 0) {
      try {
        const allEventsByPage = await getAllEventsByPage(page);
        this.events.all = allEventsByPage.list;
        return allEventsByPage;
      } catch (error) {
        console.log('Error during fetch all events by page', error);
      } finally {
        this.loading = false;
      }
    },
    getAllEvents: async function () {
      try {
        const allEvents = await getAllEvents();
        this.events.all = allEvents.list;
        return allEvents;
      } catch (error) {
        console.log('Error during fetch all events', error);
      } finally {
        this.loading = false;
      }
    },
    getUpcomingEvents: async function () {
      try {
        const upcomingEvents = await getUpcomingEvents();
        this.events.upcomings = upcomingEvents;
        return upcomingEvents;
      } catch (error) {
        console.log('Error during fetch upcoming events', error);
      } finally {
        this.loading = false;
      }
    },
    getTodayEvents: async function () {
      try {
        const todayEvents = await getTodayEvents();
        this.events.today = todayEvents;
        return todayEvents;
      } catch (error) {
        console.log('Error during fetch today events', error);
      } finally {
        this.loading = false;
      }
    },
    getComingSoonEvents: async function (page = 0) {
      try {
        const comingSoonEvents = await getUpcomingEvents(page);
        this.events.comingSoon = comingSoonEvents;
        return comingSoonEvents;
      } catch (error) {
        console.log('Error during fetch coming soon events', error);
      } finally {
        this.loading = false;
      }
    },
    getAttireInfo: async function (id) {
      try {
        this.loading = true;
        const attireInfo = await getEventAttributionInfo(id);
        this.eventDetails.data = { ...this.eventDetails.data, attireInfo };
      } catch (error) {
        console.log('Error during fetch event attire info', error);
      } finally {
        this.loading = false;
      }
    },
    getEventDetails: async function (id) {
      try {
        this.loading = true;
        const eventDetails = await getEventDetails(id);
        const times = await this.getEventTimings(id);
        this.eventDetails.data = { ...eventDetails, times };
      } catch (error) {
        console.log('Error during fetch event details', error);
      } finally {
        this.loading = false;
      }
    },
    getEventTimings: async function (id) {
      try {
        const profileStore = useProfile();
        const timesResponse = await getEventAvailableTimes(id);
        const timesDetails = await getEventAvailableTimesDetails(id);
        const res = timesDetails?.map((el) => {
          const details = timesResponse?.list?.find((item) => item.id === el.id);
          const time = useFormatDate(el?.start_time, 'en', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          const time_ab = useFormatDate(el?.start_time, 'ar', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          const bookingOpenDate = new Date(el.booking_open);
          const bookingOpenTime = useFormatDate(el.booking_open, profileStore.profile.locale, {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          const bookingOpenTime_ab = useFormatDate(el.booking_open, 'ar', {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          const isBookingOpen = new Date() >= bookingOpenDate;
          return {
            ...el,
            is_general_admission: details?.is_general_admission,
            status: details?.status,
            time_en: time,
            time_ab,
            isBookingOpen,
            bookingOpenTime_en: bookingOpenTime,
            bookingOpenTime_ab
          };
        });
        return res;
      } catch (error) {
        console.log('Error during fetch available event times list: ', error);
      } finally {
        this.loading = false;
      }
    },
    selectEventSeats: async function (eventId, timeId) {
      try {
        const response = await eventSelectSeats(eventId, timeId);
        return response;
      } catch (error) {
        console.log('Error during select event seats', error);
      } finally {
        this.loading = false;
      }
    },
    getSeatsPricing: async function (timeId) {
      try {
        const response = await getSeatsPricingInfo(timeId);
        this.eventDetails.pricing = response?.list;
      } catch (error) {
        console.log('Error during seats pricing', error);
      } finally {
        this.loading = false;
      }
    },
    setHoldToken: async function (token, time_id, eventKey) {
      try {
        const response = await setHoldTokenApi(token, time_id, eventKey);
        this.eventDetails.holdTokenInfo = response;
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    setBookingSeats: async function (options) {
      const auth = JSON.parse(localStorage.getItem('userobj'));
      const user_id = auth?.id;
      try {
        const response = await setBookingSeatsIo(user_id, options);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getSeatAvaiability: async function (holdToken) {
      try {
        return await getSeatsAvaiability(holdToken);
      } catch (error) {
        console.log(error);
      }
    },
    callPayments: async function (options) {
      const auth = JSON.parse(localStorage.getItem('userobj'));
      const user_id = auth?.id;
      try {
        const response = await callPaymentsApi({
          user_id,
          ...options
        });
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    setSelectedObjects: function (selectedObjectsArr) {
      this.eventDetails.selectedSeats = selectedObjectsArr;
    },
    removeSelectedObjects: function (obj) {
      const index = this.eventDetails.selectedSeats.findIndex((el) => el.id === obj.id);
      this.eventDetails.selectedSeats.splice(index, 1);
    },
    lockSelectedSeats: async function (options) {
      await lockBookedSeats(options);
    }
  },
  getters: {
    getSuggestedEvents: (state) => (eventId) =>
      state?.events?.all?.filter((el) => el?.genre?.id === eventId),
    getEventDates: (state) => {
      const dateList = state.eventDetails?.data?.date_list.map((dateObj) => {
        const date = new Date(dateObj?.date);
        state?.eventDetails?.data?.times?.forEach((timeObj) => {
          const timeObjDate = new Date(timeObj?.start_time);
          if (
            date.getDate() === timeObjDate.getDate() &&
            date.getMonth() === timeObjDate.getMonth()
          ) {
            dateObj = {
              ...dateObj,
              id: timeObj.id
            };
          }
        });
        return {
          ...dateObj,
          title: dateObj.date,
          value: dateObj.date
        };
      });
      return dateList;
    },
    getEventTime: (state) => (eventDate) => {
      const date = new Date(eventDate);
      return state?.eventDetails?.data?.times.filter((el) => {
        const timeDate = new Date(el?.start_time);
        return timeDate.getDate() === date.getDate() && timeDate.getMonth() === date.getMonth();
      });
    },
    getSelectedSeats: (state) => {
      if (state.eventDetails?.selectedSeats?.length) {
        return state.eventDetails?.selectedSeats;
      } else {
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        return selectedSeats;
      }
    }
  }
});
