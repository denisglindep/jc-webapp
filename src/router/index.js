import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutUs from '../views/AboutUs.vue';
import ContactUs from '../views/ContactUs.vue';
import DefaultLayout from '../components/DefaultLayout.vue';

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
          component: () => import('../views/SignIn.vue')
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('../views/ForgotPassword.vue')
        },
        {
          path: '/signup',
          name: 'signup',
          component: () => import('../views/SignUp.vue')
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

export default router;
