import { defineStore } from 'pinia';
import { getUserInfo, getFaqList, updateUser } from '../services/profile';
import useAuth from './auth';

export default defineStore('profile', {
  state: () => ({
    profile: {
      locale: localStorage.getItem('locale'),
      userData: {},
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
          auth.logOutUser();
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
    },
    updateUserInfo: async function (data) {
      try {
        const response = await updateUser({
          ...data,
          id: this.profile.userData.id
        });
        await this.getLoggedUserInfo();
        return response;
      } catch (error) {
        if (error?.response?.data?.message) {
          throw new Error(error?.response?.data?.message);
        }
      }
    },
    changeLanguage: function (lang) {
      localStorage.setItem('locale', lang);
      this.profile.locale = lang;
    }
  },
  getters: {
    getUserInfo: (state) => state.profile.userData
  }
});
