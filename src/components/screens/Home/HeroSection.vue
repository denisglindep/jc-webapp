<template>
  <section class="section-container">
    <div class="m-auto flex h-full w-full items-center justify-center" v-if="loading">loading</div>
    <swiper
      v-else
      :modules="[Navigation]"
      :slides-per-view="1"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next'
      }"
    >
      <swiper-slide v-for="event in today" :key="event.id" :virtualIndex="event.id">
        <HeroSectionCard :eventInfo="event" />
      </swiper-slide>
      <div class="swiper-nav-container container left-0 right-0 mx-auto">
        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
      </div>
    </swiper>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useEvents } from '@/stores/events';

import HeroSectionCard from './HeroSectionCard.vue';

const events = useEvents();
const { today, loading } = storeToRefs(events);
</script>

<style scoped>
.section-container {
  display: flex;
  min-height: 55.5rem;
}

.swiper-nav-container {
  @apply absolute top-1/2 flex w-full justify-between;
}

.swiper-button-prev:after {
    content: '<';
    font-size: 3rem;
    font-family: unset;
}
.swiper-button-next:after {
    content: '>';
    font-size: 3rem;
    font-family: unset;
}

.swiper-button-prev,
.swiper-button-next {
  @apply m-0 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-accent text-accent dark:border-white dark:text-white;
  position: unset;
}
</style>
