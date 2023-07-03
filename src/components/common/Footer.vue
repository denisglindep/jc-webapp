<template>
  <footer class="pb-4 dark:bg-slate-500">
    <div
      class="container mx-auto grid grid-flow-row place-content-between items-center py-14 md:grid-flow-col"
    >
      <LogoIcon />
      <div class="hidden grow md:block">
        <ul class="grid grid-flow-col gap-24">
          <li>
            <router-link to="/about">About Us </router-link>
          </li>
          <li>
            <router-link to="/contact">Contact Us</router-link>
          </li>
          <li>
            <router-link to="/login">Login</router-link>
          </li>
          <li>
            <router-link to="/signup">Sign Up</router-link>
          </li>
        </ul>
      </div>
      <div class="grid grid-flow-row gap-4 text-sm">
        <h5 class="font-bold">Sheikh Jaber Al-Ahmed Cultural Centre</h5>
        <div class="grid grid-flow-col items-center gap-2">
          <MapPin />
          <a
            href="https://www.google.com/maps?ll=29.360203,47.956159&z=16&t=m&hl=en-US&gl=US&mapclient=embed&daddr=Sheikh+Jaber+Al-Ahmed+Cultural+Center+Arabian+Gulf+St+Kuwait@29.3602031,47.9561591"
            >Arabian Gulf St, Kuwait - Get Directions</a
          >
        </div>
        <div class="grid grid-flow-col place-content-start items-center gap-4">
          <a target="_blank" href="https://www.instagram.com/jacc_kw/">
            <InstagramIcon />
          </a>
          <a target="_blank" href="https://en-gb.facebook.com/SJACCkwt/">
            <FacebookIcon />
          </a>
          <a target="_blank" href="https://twitter.com/jacc_kw">
            <TwitchIcon />
          </a>
          <a target="_blank" href="https://www.youtube.com/channel/UCBkHihVGNn2th-47kUofPaQ">
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </div>
    <div class="line-before container mx-auto grid grid-flow-col place-content-between text-sm">
      <h5 class="font-bold">Terms & Conditions</h5>
      <h5>© {{ currentYear }} Sheikh Jaber Al-Ahmed Cultural Centre. All Rights Reserved.</h5>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import LogoIcon from '../Icons/LogoIcon.vue';
import MapPin from '../Icons/MapPin.vue';
import InstagramIcon from '../Icons/InstagramIcon.vue';
import FacebookIcon from '../Icons/FacebookIcon.vue';
import TwitchIcon from '../Icons/TwitchIcon.vue';
import YoutubeIcon from '../Icons/YoutubeIcon.vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.line-before {
  position: relative;
}

.line-before::before {
  content: '';
  position: absolute;
  bottom: 120%;
  transform: translateY(50%);
  height: 1px;
  @apply w-full bg-slate-400;
}
</style>
