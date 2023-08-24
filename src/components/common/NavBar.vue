<template>
  <v-app-bar :class="[isDarkMode ? 'bg-surface' : 'bg-white']">
    <v-container class="py-4">
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <router-link to="/">
            <LogoIcon />
          </router-link>
        </v-col>
        <v-col cols="auto">
          <nav
            :class="[isDarkMode ? 'text-white' : 'text-black']"
            class="d-none d-md-flex align-center"
          >
            <v-btn color="inherit" variant="plain" :ripple="false" class="mx-4" to="/about"
              >About Us</v-btn
            >
            <v-btn color="inherit" variant="plain" :ripple="false" class="mx-4" to="/contact"
              >Contact Us</v-btn
            >
            <template v-if="!isAuthenticated">
              <v-btn color="inherit" variant="plain" :ripple="false" class="mx-4" to="/signin"
                >Login</v-btn
              >
              <v-btn color="inherit" variant="plain" :ripple="false" class="mx-4" to="/signup"
                >Sign Up</v-btn
              >
            </template>
            <template v-else>
              <Profile />
            </template>
          </nav>
          <v-app-bar-nav-icon
            variant="text"
            color="inherit"
            @click.stop="drawer = !drawer"
            :class="[isDarkMode ? 'text-white' : 'text-black']"
            class="d-block d-md-none"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="top"
    temporary
    class="bg-background"
    style="height: max-content"
  >
    <v-list class="nav-list" @click.stop="drawer = false">
      <v-list-item
        title="About Us"
        variant="plain"
        color="inherit"
        :link="true"
        :active="true"
        to="/about"
        prepend-icon="mdi-information-outline"
      />
      <v-list-item
        title="Contact Us"
        variant="plain"
        color="inherit"
        :link="true"
        :active="true"
        to="/contact"
        prepend-icon="mdi-account-box-outline"
      />
      <template v-if="!isAuthenticated">
        <v-list-item
          title="Login"
          variant="plain"
          color="inherit"
          :link="true"
          :active="true"
          to="/signin"
          prepend-icon="mdi-login"
        />
        <v-list-item
          title="Sign Up"
          variant="plain"
          color="inherit"
          :link="true"
          :active="true"
          to="/signup"
          prepend-icon="mdi-account-plus-outline"
        />
      </template>
      <template v-else>
        <v-list-item
          title="Profile"
          variant="plain"
          color="inherit"
          :link="true"
          :active="true"
          to="/profile"
          prepend-icon="mdi-account"
        />
        <v-list-item
          title="Logout"
          variant="plain"
          color="inherit"
          :link="true"
          :active="true"
          prepend-icon="mdi-logout"
        >
          <ConfirmModal
            title="Are you sure you want to log out of the platform?"
            @action-success="logUserOut"
            :showDialog="true"
          />
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuth } from '../../stores';
import Profile from './Profile.vue';
import ConfirmModal from './ConfirmModal.vue';
import LogoIcon from '../Icons/LogoIcon.vue';

const drawer = ref(false);
const auth = useAuth();
const authState = storeToRefs(auth);
const router = useRouter();
const theme = useTheme();
const isDarkMode = computed(() => theme.current.value.dark);
const isAuthenticated = computed(() => authState?.user?.value?.isAuthenticated);

async function logUserOut() {
  try {
    await auth.logOutUser();
    authState.$reset();
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}
</script>
