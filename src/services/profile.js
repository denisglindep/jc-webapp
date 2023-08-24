import { authApi, defaultApi, faqApi } from './instances';

export async function getMyAccInfo() {
  const response = await defaultApi.get(`${import.meta.env.VITE_API_URL}/my-account/`);
  return response;
}

export async function getUserInfo(id) {
  const response = await authApi.get(`/${id}`);
  return response?.data;
}

export async function getFaqList() {
  const response = await faqApi.get(`/list`);
  return response;
}
