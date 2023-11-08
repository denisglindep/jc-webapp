<template>
  <section class="mt-20 d-flex flex-column align-center justify-items-center" style="gap: 2rem">
    <LogoIcon />
    <div class="text-center text-grey w-75">
      {{ t('$vuetify.custom.texts.contactUsSectionText') }}
    </div>
    <v-btn to="/contact" size="x-large">
      {{ t('$vuetify.custom.btn.contactUs') }}
    </v-btn>
  </section>
</template>

<script setup>
import { useLocale } from 'vuetify';
import LogoIcon from '@/components/Icons/LogoIcon.vue';
const { t } = useLocale();
</script>
