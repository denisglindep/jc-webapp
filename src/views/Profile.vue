<template>
  <v-container class="my-4 my-md-8" tag="section">
    <template v-if="selectedItem.name !== 'Profile'">
      <v-row>
        <v-btn
          class="mb-4"
          color="primary"
          variant="plain"
          :ripple="false"
          @click="selectedItem = { name: 'Profile', title: 'Profile' }"
        >
          <v-icon icon="mdi-arrow-left" />
          <span>Back to profile</span>
        </v-btn>
      </v-row>
    </template>
    <Profile
      v-if="selectedItem.name === 'Profile'"
      @selected-item="(item) => (selectedItem = item)"
    />
    <KeepAlive>
      <component :is="components[selectedItem.name]" />
    </KeepAlive>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Profile from '../components/screens/Profile/Profile.vue';
import FAQ from '../components/screens/Profile/Faq.vue';

const components = {
  FAQ
};

const selectedItem = ref({
  name: 'Profile',
  title: 'Profile'
});
</script>

<style scoped>
.profile_list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1rem;
}
</style>
