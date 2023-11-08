<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="primary text-center">
          {{ userInfo?.initials }}
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text class="text-center">
        <p class="text-body-1">{{ userInfo?.firstName }}</p>
        <p class="text-body-1 mt-2">{{ userInfo?.lastName }}</p>
        <v-card-subtitle class="text-caption mt-2">
          {{ userInfo?.email }}
        </v-card-subtitle>
      </v-card-text>
      <v-divider />
      <v-card-actions class="d-flex flex-column">
        <v-btn block variant="text" :rounded="false" color="inherit" to="/profile" class="ma-0">
          {{ t('$vuetify.custom.btn.profile') }}
        </v-btn>
        <v-divider class="my-2" />
        <v-btn
          block
          variant="text"
          :rounded="false"
          color="inherit"
          class="ma-0"
          prepend-icon="mdi-logout"
        >
          {{ t('$vuetify.custom.btn.signOut') }}
          <ConfirmModal
            title="Are you sure you want to log out of the platform?"
            @action-success="logUserOut"
          />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useLocale } from 'vuetify';
import { useRouter } from 'vue-router';
import { useAuth, useProfile } from '@/stores';
import ConfirmModal from './ConfirmModal.vue';

const router = useRouter();
const auth = useAuth();
const { t } = useLocale();
const profileStore = useProfile();

const userInfo = computed(() => {
  const { first_name, last_name, email } = profileStore.getUserInfo;
  return {
    firstName: first_name,
    lastName: last_name,
    initials: `${first_name?.[0]}${last_name?.[0]}`,
    fullName: `${first_name} ${last_name}`,
    email
  };
});

async function logUserOut() {
  try {
    await auth.logOutUser();
    auth.$reset();
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}
</script>
