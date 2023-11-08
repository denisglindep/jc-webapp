import { defineStore } from 'pinia';
import {
  signIn,
  signUp,
  logOut,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyMobile,
  changeUserPassword
} from '../services/auth';

export default defineStore('auth', {
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
        if (error?.response?.data?.message) {
          throw new Error(error?.response?.data?.message);
        }
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
            isEmailVerified: userData.is_email_verified,
            session_id: userData.session_id
          },
          isAuthenticated: true
        };
        localStorage.setItem('userobj', JSON.stringify(this.user.data));
      } catch (error) {
        if (error?.response?.data?.message) {
          throw new Error(error?.response?.data?.message);
        }
      }
    },
    logOutUser: async function () {
      try {
        await logOut();
        localStorage.removeItem('userobj');
      } catch (error) {
        console.log(error);
      }
    },
    checkIfEmailIsAvailable: async function (emailInput) {
      try {
        const response = await verifyEmail(emailInput);
        return response;
      } catch (error) {
        if (error?.response?.data?.message) {
          throw new Error(error?.response?.data?.message);
        }
      }
    },
    checkIfMobileIsAvailable: async function (emailInput) {
      try {
        const response = await verifyMobile(emailInput);
        return response;
      } catch (error) {
        if (error?.response?.data?.message) {
          throw new Error(error?.response?.data?.message);
        }
      }
    },
    sendForgotPassword: async function (data) {
      try {
        const response = await forgotPassword(data);
        return response;
      } catch (error) {
        if (error?.response?.data?.message) {
          throw new Error(error?.response?.data?.message);
        }
      }
    },
    resetPassword: async function (data) {
      try {
        await resetPassword(data);
      } catch (error) {
        if (error?.response?.data?.message) {
          throw new Error(error?.response?.data?.message);
        }
      }
    },
    changePassword: async function (data) {
      try {
        await changeUserPassword({
          old_password: data.oldPassword,
          new_password: data.newPassword,
          id: this.user.data.id
        });
        console.log('password changed');
      } catch (error) {
        if (error?.response?.data?.message) {
          throw new Error(error?.response?.data?.message);
        }
      }
    }
  },
  getters: {
    getUserInfo: (state) => state.user
  }
});
