import axios from 'axios';

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_DEV}/api/users`
});

export async function signUp(data) {
  const response = await authApi.post('/signup_web', data, { withCredentials: true });
  return response?.data;
}

export async function signIn(data) {
  const response = await axios.post(`${import.meta.env.VITE_API_URL_DEV}/api/users/login`, data, {
    withCredentials: true
  });
  return response?.data;
}

export async function logOut() {
  return await axios.get(`${import.meta.env.VITE_API_URL_DEV}/logout/`, { withCredentials: true });
}

export async function verifyEmail(emailInput) {
  const formData = new FormData();
  for (const prop in emailInput) {
    formData.append(prop, emailInput[prop]);
  }
  const response = await authApi.post('/emailverification', formData, { widthCredentials: true });
  return response?.data;
}

export async function verifyMobile(mobilePhoneData) {
  const formData = new FormData();
  for (const prop in mobilePhoneData) {
    formData.append(prop, mobilePhoneData[prop]);
  }
  const response = await authApi.post('/phoneverification', formData, { widthCredentials: true });
  return response?.data;
}

export async function getMyAccInfo() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL_DEV}/my-account/`, {
    withCredentials: true
  });
  return response;
}

export async function getUserInfo(id) {
  const response = await authApi.get(`/${id}`, { withCredentials: true });
  return response?.data;
}
