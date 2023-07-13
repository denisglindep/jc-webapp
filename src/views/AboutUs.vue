<template>
  <v-container class="my-4 my-md-8">
    <v-row>
      <v-col>
        <AboutUsSection />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ContactUsSection />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import AboutUsSection from '@/components/screens/AboutUs/AboutUsSection.vue';
import ContactUsSection from '../components/screens/Home/ContactUsSection.vue';
</script>
