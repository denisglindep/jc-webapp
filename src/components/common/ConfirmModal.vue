<template>
  <v-dialog activator="parent" v-model="showDialog" width="auto" max-width="50%">
    <v-card class="px-4 py-2">
      <v-card-title class="mb-4">{{ title }}</v-card-title>
      <v-card-actions class="d-flex">
        <v-btn
          class="w-50"
          rounded="lg"
          :color="theme.global.name.value === 'dark' ? 'white' : 'primary'"
          variant="tonal"
          text
          @click="showDialog = false"
        >
          {{ t('$vuetify.custom.btn.cancel') }}
        </v-btn>
        <v-btn class="w-50" rounded="lg" color="primary" variant="flat" @click="confirm">
          {{ t('$vuetify.custom.btn.ok') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useTheme, useLocale } from 'vuetify';
const showDialog = ref(false);
const theme = useTheme();
const { t } = useLocale();

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
