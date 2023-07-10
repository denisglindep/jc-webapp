<template>
  <v-app-bar class="bg-background">
    <v-container>
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <router-link to="/"> <LogoIcon /> </router-link>
        </v-col>
        <v-col cols="auto">
          <nav>
            <router-link class="mx-4" to="/about">About Us</router-link>
            <router-link class="mx-4" to="/about">Contact Us</router-link>
            <router-link class="mx-4" to="/about">Login</router-link>
            <router-link class="mx-4" to="/signup">Sign Up</router-link>
          </nav>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import LogoIcon from '../Icons/LogoIcon.vue';
LogoIcon;
</script>
