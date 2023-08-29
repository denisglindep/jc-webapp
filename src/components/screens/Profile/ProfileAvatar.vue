<template>
  <v-sheet class="d-flex justify-center pa-4" rounded="lg">
    <div class="d-flex flex-column align-center text-center">
      <v-avatar
        class="mb-2"
        color="primary"
        size="large"
        :style="{ width: '80px', height: '80px' }"
      >
        <span class="text-h3">{{ initials }}</span>
      </v-avatar>
      <h3>{{ fullName }}</h3>
      <p class="text-subtitle-1">{{ email }}</p>
    </div>
  </v-sheet>
</template>

<script setup>
defineProps({
  initials: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});
</script>
