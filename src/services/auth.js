import axios from 'axios';

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL_DEV}/api/users`
});
authApi.defaults.withCredentials = true;

export async function signUp(data) {
  const response = await authApi.post('/signup_web', data);
  return response?.data;
}

export async function signIn(data) {
  const response = await authApi.post(`/login`, data);
  authApi.defaults.headers.common['x-sessionid'] = response?.headers['x-sessionid'];
  return response?.data;
}

export async function logOut() {
  return await axios.get(`${import.meta.env.VITE_API_URL_DEV}/logout/`, {
    transformRequest: [
      (data, headers) => {
        headers['x-sessionid'] = authApi.defaults.headers?.common['x-sessionid'];
        return data;
      }
    ],
    withCredentials: true
  });
}

export async function verifyEmail(emailInput) {
  const formData = new FormData();
  for (const prop in emailInput) {
    formData.append(prop, emailInput[prop]);
  }
  const response = await authApi.post('/emailverification', formData);
  return response?.data;
}

export async function verifyMobile(mobilePhoneData) {
  const formData = new FormData();
  for (const prop in mobilePhoneData) {
    formData.append(prop, mobilePhoneData[prop]);
  }
  const response = await authApi.post('/phoneverification', formData);
  return response?.data;
}

export async function getMyAccInfo() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL_DEV}/my-account/`);
  return response;
}

export async function getUserInfo(id) {
  const response = await authApi.get(`/${id}`);
  return response?.data;
}
