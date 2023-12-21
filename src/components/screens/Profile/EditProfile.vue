<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn class="mt-4" color="primary" variant="plain" :ripple="false" to="/profile">
          <template v-slot:prepend>
            <v-icon :icon="isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
          </template>
          {{ t('$vuetify.custom.backBtns.backToProfile') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-row>
          <v-col>
            <h4 class="text-h5 text-center">
              <ProfileAvatar />
            </h4>
          </v-col>
        </v-row>
        <v-alert
          v-if="errors.apiError"
          class="my-2"
          rounded="lg"
          type="error"
          density="compact"
          :text="errors.apiError"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-close" @click="closeAlert" />
          </template>
        </v-alert>
        <v-row>
          <v-col>
            <v-card class="pa-4">
              <v-form @submit="submitEditInfo">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      hide-details="auto"
                      v-bind="firstName"
                      clearable
                      :label="t('$vuetify.custom.inputTexts.firstName')"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      hide-details="auto"
                      v-bind="lastName"
                      clearable
                      :label="t('$vuetify.custom.inputTexts.lastName')"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      hide-details="auto"
                      v-bind="email"
                      disabled
                      clearable
                      :label="t('$vuetify.custom.inputTexts.enterEmail')"
                      prepend-inner-icon="mdi-email-outline"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-bind="language"
                      :items="[
                        {
                          title: 'English',
                          value: 'en'
                        },
                        {
                          title: 'Arabic',
                          value: 'ar'
                        }
                      ]"
                      :label="t('$vuetify.custom.inputTexts.changeLanguage')"
                      prepend-inner-icon="mdi-translate"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      hide-details="auto"
                      v-bind="oldPassword"
                      clearable
                      :label="t('$vuetify.custom.inputTexts.oldPassword')"
                      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      prepend-inner-icon="mdi-lock-outline"
                      :type="visible ? 'text' : 'password'"
                      @click:append-inner="visible = !visible"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      hide-details="auto"
                      v-bind="newPassword"
                      clearable
                      :label="t('$vuetify.custom.inputTexts.newPassword')"
                      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      prepend-inner-icon="mdi-lock-outline"
                      :type="visible ? 'text' : 'password'"
                      @click:append-inner="visible = !visible"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                      block
                      size="x-large"
                      type="submit"
                      :loading="isSubmitting"
                      :disabled="!isValid"
                    >
                      {{ t('$vuetify.custom.btn.save') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useLocale } from 'vuetify';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useProfile, useAuth, useNotifications } from '@/stores';
import ProfileAvatar from './ProfileAvatar.vue';

const visible = ref(false);
const { t, isRtl, current } = useLocale();
const profileStore = useProfile();
const authStore = useAuth();
const notificationsStore = useNotifications();

const userData = computed(() => ({
  firstName: profileStore.getUserInfo?.first_name,
  lastName: profileStore.getUserInfo?.last_name,
  email: profileStore.getUserInfo?.email,
  language: profileStore.profile?.locale
}));

const schema = object({
  firstName: string().defined().notRequired().min(1).trim(),
  lastName: string().defined().notRequired().min(1).trim(),
  oldPassword: string().notRequired(),
  newPassword: string().notRequired()
});

const { defineComponentBinds, resetField, handleSubmit, errors, setErrors, isSubmitting, meta } =
  useForm({
    initialValues: userData.value,
    validationSchema: schema
  });

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});

const isValid = computed(() => meta?.value?.touched && meta?.value?.valid && !meta?.value?.pending);

const firstName = defineComponentBinds('firstName', vuetifyConfig);
const lastName = defineComponentBinds('lastName', vuetifyConfig);
const email = defineComponentBinds('email', vuetifyConfig);
const oldPassword = defineComponentBinds('oldPassword', vuetifyConfig);
const newPassword = defineComponentBinds('newPassword', vuetifyConfig);
const language = defineComponentBinds('language', vuetifyConfig);

const submitEditInfo = handleSubmit(async (values) => {
  try {
    const { firstName, lastName, oldPassword, newPassword, language } = values;

    if (language) {
      current.value = language;
      profileStore.changeLanguage(language);
    }

    if (oldPassword && newPassword) {
      await authStore.changePassword({ oldPassword, newPassword });
      resetField('oldPassword');
      resetField('newPassword');
    }

    if (firstName && lastName) {
      await profileStore.updateUserInfo({
        first_name: firstName,
        last_name: lastName
      });
    }

    notificationsStore.addNotification({
      type: 'success',
      message: 'Profile updated successfully',
      isClosed: false
    });
  } catch (error) {
    setErrors({ apiError: error?.message });
  }
});

function closeAlert() {
  console.log('closed');
  setErrors({ apiError: '' });
  console.log(errors);
}
</script>
