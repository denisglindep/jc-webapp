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
            <v-btn
              color="inherit"
              variant="plain"
              :ripple="false"
              class="mx-4"
              v-for="(item, index) in items"
              :to="item.to"
              :key="index"
              >{{ item.title }}</v-btn
            >
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
const drawer = ref(false);
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
</script>
