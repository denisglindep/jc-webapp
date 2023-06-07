<template>
  <header class="bg-white">
    <div class="container mx-auto">
      <nav class="flex h-20 items-center justify-between">
        <div class="flex">
          <router-link to="/home" class="w-1/2"> <img :src="logo" /></router-link>
        </div>
        <div class="flex items-center gap-14 text-black">
          <router-link to="/about" class="rounded-md p-2 hover:bg-gray-700">About Us</router-link>
          <router-link to="/about" class="rounded-md p-2 hover:bg-gray-700">Contact Us</router-link>
          <router-link to="/about" class="rounded-md p-2 hover:bg-gray-700">Login</router-link>
          <router-link to="/signup" class="btn btn-accent">Sign Up</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import logo from '@/assets/logo.svg';
</script>
