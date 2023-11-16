import { defaultApi, eventsApi, seatsApi, v1Api } from './instances';

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

export async function getEventAvailableTimes(eventId) {
  try {
    const response = await eventsApi.get(`/app/date/timings/${eventId}`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch event available times", error);
  }
}

export async function getEventAvailableTimesDetails(eventId) {
  try {
    const response = await eventsApi.get(`/timing/list/${eventId}`);
    return response.data;
  } catch (error) {
    console.log("Can't fetch event available times", error);
  }
}

export async function eventSelectSeats(eventId, dateID) {
  try {
    const response = await defaultApi.get(`/select-seats/event/${eventId}/date-time/${dateID}/`, {
      headers: {
        ['x-sessionid']: JSON.parse(localStorage.getItem('userobj'))?.session_id
      }
    });
    return response.data;
  } catch (error) {
    console.log("Can't fetch select seats", error);
  }
}

export async function getSeatsPricingInfo(dateId) {
  try {
    const response = await eventsApi.get(`/seat-pricing/list/${dateId}`);
    return response?.data;
  } catch (error) {
    console.log("Can't fetch seats pricing", error);
  }
}

export async function setHoldTokenApi(token, time_id, eventKey) {
  try {
    const response = await defaultApi.get(
      `api/set/hold-token?hold_token=${token}&event_date_time_id=${time_id}&chartkey=${eventKey}`,
      {
        headers: {
          ['x-sessionid']: JSON.parse(localStorage.getItem('userobj'))?.session_id
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("Can't set hold token", error);
  }
}

export async function setBookingSeatsIo(user_id, options) {
  try {
    const response = defaultApi.put(`/api/bookings/set/seats-io?user_id=${user_id}`, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSeatsAvaiability(holdToken) {
  try {
    const response = await seatsApi.get(`/seat-availability-api?token_id=${holdToken}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function lockBookedSeats(options) {
  try {
    const response = await defaultApi.put(`/api/bookings/lock`, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function callPaymentsApi(options) {
  try {
    const response = await defaultApi.post(`/api/payment/process/mobile`, options, {
      headers: {
        ['x-sessionid']: JSON.parse(localStorage.getItem('userobj'))?.session_id,
        ['X-PLATFORM']: 'LOCALWEB',
        ['X-VERSION']: '4.8.0'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getEventAttributionInfo(eventId) {
  try {
    const response = await v1Api.get(`events/getattire?eventId=${eventId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
