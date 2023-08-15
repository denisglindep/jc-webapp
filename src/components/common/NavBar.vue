<template>
  <v-app-bar :class="[isDarkMode ? 'bg-surface' : 'bg-white']">
    <v-container class="py-4">
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <router-link to="/">
            <LogoIcon />
          </router-link>
        </v-col>
        <v-col cols="auto">
          <nav :class="[isDarkMode ? 'text-white' : 'text-black']" class="d-none d-md-flex">
            <v-btn color="inherit" variant="plain" :ripple="false" class="mx-4" to="/about"
              >About Us</v-btn
            >
            <v-btn color="inherit" variant="plain" :ripple="false" class="mx-4" to="/about"
              >Contact Us</v-btn
            >
            <template v-if="!isAuthenticated">
              <v-btn color="inherit" variant="plain" :ripple="false" class="mx-4" to="/signin"
                >Login</v-btn
              >
              <v-btn color="inherit" variant="plain" :ripple="false" class="mx-4" to="/signup"
                >Sign Up</v-btn
              >
            </template>
            <template v-else>
              <v-btn color="inherit" variant="plain" :ripple="false" class="mx-4" to="/about"
                >Profile</v-btn
              >
              <v-btn
                color="inherit"
                variant="plain"
                :ripple="false"
                class="mx-4"
                @click="logUserOut"
                >Logout</v-btn
              >
            </template>
          </nav>
          <v-app-bar-nav-icon
            variant="text"
            color="inherit"
            @click.stop="drawer = !drawer"
            :class="[isDarkMode ? 'text-white' : 'text-black']"
            class="d-block d-md-none"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="top"
    temporary
    class="bg-background"
    style="height: max-content"
  >
    <v-list class="bg-background">
      <v-list-item
        v-for="(item, i) in items"
        variant="plain"
        color="inherit"
        :linls="true"
        :active="true"
        :key="i"
        :value="item"
        :title="item.title"
        :prepend-icon="item.icon"
        :to="item.to"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref, reactive } from 'vue';
import LogoIcon from '../Icons/LogoIcon.vue';
import { useTheme } from 'vuetify';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuth } from '../../stores/auth';

const drawer = ref(false);
const authStore = useAuth();
const authState = storeToRefs(authStore);
const router = useRouter();

const items = reactive([
  {
    title: 'About Us',
    to: '/about',
    icon: 'mdi-account'
  },
  {
    title: 'Contact Us',
    to: '/contact',
    icon: 'mdi-account'
  },
  {
    title: 'Login',
    to: '/signin',
    icon: 'mdi-account'
  },
  {
    title: 'Sign Up',
    to: '/signup',
    icon: 'mdi-account'
  }
]);
const theme = useTheme();
const isDarkMode = computed(() => theme.current.value.dark);
const isAuthenticated = computed(() => authState?.user?.value?.isAuthenticated);

async function logUserOut() {
  try {
    await authStore.logOutUser();
    authStore.$reset();
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}
</script>
