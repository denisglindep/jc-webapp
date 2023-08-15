import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/stores/auth.js';
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
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
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
        }
      ]
    },
    // catch all routes that are not defined and redirect to the Not Found page
    { path: '/:pathMatch(.*)*', component: () => import('../views/404.vue') }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const authStore = useAuth();
  const isUserAuthenticated = authStore.getUserInfo?.isAuthenticated;
  const isAuthRoute = to.name === 'signin' || to.name === 'signup' || to.name === 'forgot-password';

  if (isUserAuthenticated && isAuthRoute) {
    next('/');
  }

  if (to.meta.auth) {
    if (isUserAuthenticated) {
      next();
    } else {
      next('/signin');
    }
  } else {
    next();
  }
});

export default router;
