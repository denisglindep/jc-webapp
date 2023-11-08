<template>
  <v-container>
    <v-row>
      <v-col>
        <h4 class="text-h4 text-center font-weight-bold">
          {{ t('$vuetify.custom.headings.profile') }}
        </h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ProfileAvatar />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, index) in settings" cols="12" sm="6" :key="index">
        <v-btn
          block
          size="large"
          class="bg-surface"
          variant="plain"
          color="inherit"
          rounded="lg"
          :prepend-icon="item.icon"
          :text="item.title"
          :to="item.to"
        />
      </v-col>
      <v-col cols="12" sm="6" class="ms-auto">
        <v-btn
          block
          size="large"
          variant="tonal"
          color="primary"
          rounded="lg"
          prepend-icon="mdi-logout"
        >
          {{ t('$vuetify.custom.btn.signOut') }}
          <ConfirmModal
            :title="t('$vuetify.custom.texts.logoutConfirmText')"
            @action-success="logUserOut"
          />
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '@/stores';
import { useLocale } from 'vuetify';
import { useRouter } from 'vue-router';
import ProfileAvatar from './ProfileAvatar.vue';
import ConfirmModal from '../../common/ConfirmModal.vue';

defineEmits(['selectedItem']);

const { t } = useLocale();
const settings = ref([
  {
    id: 1,
    icon: 'mdi-pencil-outline',
    title: t('$vuetify.custom.btn.editProfile'),
    to: '/edit-profile',
    name: 'EditProfile'
  },
  {
    id: 2,
    icon: 'mdi-comment-question-outline',
    title: t('$vuetify.custom.btn.faq'),
    to: '/faq',
    name: 'FAQ'
  }
]);

const router = useRouter();
const auth = useAuth();

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
