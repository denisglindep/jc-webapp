import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/stores';
import { getUserTokenInfo } from '@/services/auth.js';
import HomeView from '../views/HomeView.vue';
import AboutUs from '../views/AboutUs.vue';
import ContactUs from '../views/ContactUs.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import ForgotPassword from '../views/ForgotPassword.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      redirect: { name: 'home' },
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/see-all/:eventType/:page?',
          name: 'see-all',
          component: () => import('../views/SeeAll.vue')
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: AboutUs
        },
        {
          path: '/contact',
          name: 'contact-us',
          component: ContactUs
        },
        {
          path: '/events/:id',
          name: 'event-details',
          component: () => import('../views/EventDetails.vue')
        },
        {
          path: '/signin',
          name: 'signin',
          component: SignIn
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: ForgotPassword
        },
        {
          path: '/signup',
          name: 'signup',
          component: SignUp
        },
        // {
        //   path: '/profile',
        //   name: 'profile',
        //   component: () => import('../views/Profile.vue'),
        //   meta: {
        //     auth: true
        //   }
        // },
        {
          path: '/reset-password/:token',
          name: 'reset-password',
          beforeEnter: async (to, _, next) => {
            try {
              const tokenId = to.params.token;
              const userInfo = await getUserTokenInfo(tokenId);
              to.params = { ...to.params, ...userInfo };
              return next();
            } catch (error) {
              console.log('error', error);
              next('/');
            }
          },
          component: () => import('../views/ResetPassword.vue'),
          props: true
        },
        {
          path: '/select-seats/:id',
          name: 'select-seats',
          // beforeEnter: (_, from, next) => {
          //   if (from.name && from.name === 'event-details') {
          //     return next();
          //   }
          //   if (from.name && from.name === 'booking-summary') {
          //     return next();
          //   }
          //   if (from?.name === 'select-seats') {
          //     return next();
          //   }
          //   return next('/');
          // },
          meta: {
            auth: true
          },
          component: () => import('../views/SelectSeats.vue'),
          props: true
        },
        {
          path: 'bookings',
          name: 'bookings',
          component: () => import('../views/MyBookings.vue'),
          meta: {
            auth: true
          },
          props: true,
          children: [
            {
              name: 'my-bookings',
              path: '',
              component: () => import('../components/screens/Booking/Bookings.vue'),
              props: true,
              meta: {
                auth: true
              }
            },
            {
              name: 'booking-tickets',
              path: 'tickets/:id/event/:event_id',
              component: () => import('../components/screens/Booking/BookingTickets.vue'),
              props: true,
              meta: {
                auth: true
              }
            }
          ]
        }
      ]
    },
    {
      name: 'booking',
      path: '/booking/:id',
      component: DefaultLayout,
      props: true,
      meta: {
        auth: true
      },
      // beforeEnter: (_, from, next) => {
      //   if (from?.name !== 'select-seats') {
      //     return next('/');
      //   }
      //   return next();
      // },
      children: [
        {
          name: 'booking-summary',
          path: 'summary',
          component: () => import('../views/Booking.vue'),
          props: true,
          meta: {
            auth: true
          }
        },
        {
          name: 'booking-success',
          path: 'success',
          component: () => import('../components/screens/Booking/BookingSuccess.vue'),
          props: true,
          meta: {
            auth: true
          }
        },
        {
          name: 'booking-failure',
          path: 'failed',
          component: () => import('../components/screens/Booking/BookingFailed.vue'),
          props: true,
          meta: {
            auth: true
          }
        }
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'profile',
          component: () => import('../views/Profile.vue')
        },
        {
          path: '/faq',
          name: 'faq',
          component: () => import('@/components/screens/Profile/Faq.vue')
        },
        {
          path: '/edit-profile',
          name: 'edit-profile',
          component: () => import('@/components/screens/Profile/EditProfile.vue')
        }
      ],
      meta: {
        auth: true
      }
    },
    // catch all routes that are not defined and redirect to the Not Found page
    { path: '/:pathMatch(.*)*', component: () => import('../views/404.vue') }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to, _, next) => {
  const authStore = useAuth();
  const isUserAuthenticated = authStore.getUserInfo?.isAuthenticated;
  const isAuthRoute = to.name === 'signin' || to.name === 'signup' || to.name === 'forgot-password';

  if (isUserAuthenticated && _?.query?.redirect && to.fullPath !== _?.query?.redirect) {
    return next(_?.query?.redirect);
  }

  if (isUserAuthenticated && isAuthRoute) {
    return next('/');
  }

  if (to.meta.auth && !isUserAuthenticated) {
    return next({
      name: 'signin',
      query: { redirect: to.fullPath }
    });
  }
  next();
});

export default router;
