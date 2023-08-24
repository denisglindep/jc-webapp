import { defineStore } from 'pinia';
import { getUserInfo, getFaqList } from '../services/profile';
import useAuth from './auth';

export default defineStore('profile', {
  state: () => ({
    profile: {
      userData: null,
      faq: []
    }
  }),
  actions: {
    getLoggedUserInfo: async function () {
      const auth = useAuth();
      try {
        const response = await getUserInfo(auth?.user?.data?.id);
        if (!response.session_active) {
          localStorage.removeItem('userobj');
        }
        this.profile.userData = response;
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    getFaqInfoList: async function () {
      try {
        const response = await getFaqList();
        this.profile.faq = response.filter((el) => el.status === 1);
      } catch (error) {
        console.log(error);
      }
    }
  }
});
