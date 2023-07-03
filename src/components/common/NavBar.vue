<template>
  <header class="sticky top-0 bg-slate-50 text-black dark:bg-slate-900 dark:text-white">
    <div class="container mx-auto">
      <nav class="flex h-20 items-center justify-between">
        <div class="flex">
          <router-link to="/" class="w-full">
            <LogoIcon />
          </router-link>
        </div>
        <div class="flex items-center gap-14">
          <router-link to="/about" class="rounded-md p-2 hover:bg-gray-100">About Us</router-link>
          <router-link to="/about" class="rounded-md p-2 hover:bg-gray-100">Contact Us</router-link>
          <router-link to="/about" class="rounded-md p-2 hover:bg-gray-100">Login</router-link>
          <router-link to="/signup" class="btn btn-accent text-white">Sign Up</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import LogoIcon from '../Icons/LogoIcon.vue';
LogoIcon;
</script>
