<template>
  <v-container class="my-4 my-md-8" tag="section">
    <v-row class="flex-column">
      <v-col>
        <h4 class="my-6 my-md-12 text-h4 font-weight-bold">Profile</h4>
      </v-col>
    </v-row>
    <Profile />
  </v-container>
</template>

<script setup>
import Profile from '../components/screens/Profile/Profile.vue';
</script>

<style scoped>
.profile_list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1rem;
}
</style>
