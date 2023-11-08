import { authApi, defaultApi } from './instances';

// set the default headers for AUTH API in case if page was refreshed
authApi.defaults.headers.common['x-sessionid'] = JSON.parse(
  localStorage.getItem('userobj')
)?.session_id;

export async function signUp(data) {
  const response = await authApi.post('/signup_web', data);
  return response?.data;
}

export async function signIn(data) {
  const response = await authApi.post(`/login`, data, {
    transformResponse: [
      (data, headers) => {
        let loginResponse = JSON.parse(data);
        loginResponse = {
          ...loginResponse,
          session_id: headers['x-sessionid']
        };
        return loginResponse;
      }
    ]
  });
  authApi.defaults.headers.common['x-sessionid'] = response?.headers['x-sessionid'];
  return response?.data;
}

export async function logOut() {
  const response = await defaultApi.post(`/api/logout/`, null, {
    headers: {
      'x-sessionid': authApi.defaults.headers.common['x-sessionid']
    }
  });
  authApi.defaults.headers.common['x-sessionid'] = '';
  return response;
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

export async function forgotPassword(data) {
  const response = await authApi.post(`/forgot-password`, data);
  return response?.data;
}

export async function getUserTokenInfo(tokenId) {
  const response = await authApi.get(`/user-by-token/${tokenId}`);
  return response?.data;
}

export async function resetPassword(data) {
  const response = await authApi.post(`/updatepassword`, data);
  return response?.data;
}
export async function changeUserPassword(data) {
  const response = await defaultApi.put(`/api/users/change-password`, data);
  return response?.data;
}
