<template>
  <v-app-bar class="py-4" :class="[isDarkMode ? 'bg-surface' : 'bg-white']">
    <v-container>
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <router-link to="/"> <LogoIcon /> </router-link>
        </v-col>
        <v-col cols="auto">
          <nav :class="[isDarkMode ? 'text-white' : 'text-black']">
            <v-btn color="inherit" variant="plain" ripple="false" class="mx-4" to="/about"
              >About Us</v-btn
            >
            <v-btn color="inherit" variant="plain" ripple="false" class="mx-4" to="/about"
              >Contact Us</v-btn
            >
            <v-btn color="inherit" variant="plain" ripple="false" class="mx-4" to="/about"
              >Login</v-btn
            >
            <v-btn color="inherit" variant="plain" ripple="false" class="mx-4" to="/signup"
              >Sign Up</v-btn
            >
          </nav>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { computed } from 'vue';
import LogoIcon from '../Icons/LogoIcon.vue';
import { useTheme } from 'vuetify';
const theme = useTheme();
const isDarkMode = computed(() => theme.current.value.dark);
</script>
