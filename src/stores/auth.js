import { defineStore } from 'pinia';
import { signIn, signUp, logOut, getMyAccInfo, getUserInfo } from '../services/auth';

export const useAuth = defineStore('auth', {
  state: () => ({
    user: {
      data: JSON.parse(localStorage.getItem('userobj')),
      isAuthenticated: !!JSON.parse(localStorage.getItem('userobj'))
    }
  }),
  actions: {
    signUpUser: async function (data) {
      try {
        const userData = await signUp(data);
        this.user = {
          data: {
            id: userData.id,
            createdAt: userData.created_at,
            email: userData.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
            phone: `${userData.phone_code}${userData.phone_number}`,
            userStatus: userData.user_status,
            userType: userData.user_type,
            isMobileVerified: userData.is_mobile_verified,
            isEmailVerified: userData.is_email_verified
          },
          isAuthenticated: true
        };
        localStorage.setItem('userobj', JSON.stringify(this.user.data));
      } catch (error) {
        throw error.message;
      }
    },
    signInUser: async function (data) {
      try {
        const userData = await signIn(data);
        this.user = {
          data: {
            id: userData.id,
            email: userData.email,
            firstName: userData.first_name,
            lastName: userData.last_name,
            phone: `${userData.phone_code}${userData.phone_number}`,
            userStatus: userData.user_status,
            userType: userData.user_type,
            isMobileVerified: userData.is_mobile_verified,
            isEmailVerified: userData.is_email_verified
          },
          isAuthenticated: true
        };
        localStorage.setItem('userobj', JSON.stringify(this.user.data));
      } catch (error) {
        if (error?.response) {
          throw new Error(JSON.stringify(error?.response?.data?.message));
        } else if (error?.request) {
          throw new Error(error);
        } else {
          console.log('SignIn Error: ', error?.message);
        }
      }
    },
    checkUser: async function () {
      try {
        await getMyAccInfo();
        // this.user.isAuthenticated = true;
      } catch (error) {
        console.log(error);
      }
    },
    getLoggedUserInfo: async function () {
      try {
        const response = await getUserInfo(this?.user?.data?.id);
        if (!response.session_active) {
          localStorage.removeItem('userobj');
          this.$reset();
        }
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    logOutUser: async function () {
      try {
        await logOut();
        localStorage.removeItem('userobj');
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {
    getUserInfo: (state) => state.user
  }
});
