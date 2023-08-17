<template>
  <v-dialog activator="parent" v-model="showDialog" width="auto" max-width="50%">
    <v-card class="px-4 py-2">
      <v-card-title class="mb-4">{{ title }}</v-card-title>
      <v-card-actions class="d-flex">
        <v-btn
          class="w-50"
          rounded="lg"
          color="primary"
          variant="plain"
          text
          @click="showDialog = false"
        >
          Cancel
        </v-btn>
        <v-btn class="w-50" rounded="lg" color="primary" variant="flat" @click="confirm">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
const showDialog = ref(false);

defineProps({
  title: {
    type: String,
    required: true,
    default: 'Are you sure?'
  }
});

const emit = defineEmits({
  actionSuccess: null
});

function confirm() {
  emit('actionSuccess');
  showDialog.value = false;
}
</script>
