<template>
  <footer class="pb-4 dark:bg-slate-500">
    <div class="container mx-auto flex gap-20 py-14">
      <div><LogoIcon /></div>
      <div class="grow">
        <ul class="flex gap-24">
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
      <div class="flex flex-col gap-5 text-sm">
        <h5 class="font-bold">Sheikh Jaber Al-Ahmed Cultural Centre</h5>
        <div class="flex items-center gap-2">
          <MapPin />
          <p>Arabian Gulf St, Kuwait - Get Directions</p>
        </div>
        <div class="flex items-center gap-5">
          <a href="#">
            <InstagramIcon />
          </a>
          <a href="#">
            <FacebookIcon />
          </a>
          <a href="#">
            <TwitchIcon />
          </a>
          <a href="#">
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </div>
    <div class="line-before container mx-auto flex justify-between text-sm">
      <h5 class="font-bold">Terms & Conditions</h5>
      <h5>© 2017 Sheikh Jaber Al-Ahmed Cultural Centre. All Rights Reserved.</h5>
    </div>
  </footer>
</template>

<script setup>
import LogoIcon from '../Icons/LogoIcon.vue';
import MapPin from '../Icons/MapPin.vue';
import InstagramIcon from '../Icons/InstagramIcon.vue';
import FacebookIcon from '../Icons/FacebookIcon.vue';
import TwitchIcon from '../Icons/TwitchIcon.vue';
import YoutubeIcon from '../Icons/YoutubeIcon.vue';
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
