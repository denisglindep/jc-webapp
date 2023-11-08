<template>
  <v-card class="px-10 py-10" rounded="xl">
    <v-alert
      v-if="errors.apiError"
      rounded="lg"
      class="mt-2"
      type="error"
      elevation="2"
      density="compact"
      closable
      :text="errors.apiError"
    />
    <v-form @submit="resetPassword" class="text-center">
      <v-img>
        <v-icon icon="mdi-key-outline" size="x-large" />
      </v-img>
      <v-card-text>
        <v-card-title>{{ t('$vuetify.custom.texts.forgotPassword') }}</v-card-title>
        <v-card-subtitle>{{ t('$vuetify.custom.texts.noWorries') }}</v-card-subtitle>
      </v-card-text>

      <v-card-item class="pa-0">
        <v-text-field
          v-bind="email"
          class="mb-2 text-start"
          clearable
          density="compact"
          :label="t('$vuetify.custom.inputTexts.enterEmail')"
          prepend-inner-icon="mdi-email-outline"
        />
      </v-card-item>
      <v-card-actions>
        <v-btn
          block
          variant="flat"
          size="x-large"
          type="submit"
          :loading="isSubmitting"
          :disabled="!meta?.valid || isSubmitting"
        >
          {{ t('$vuetify.custom.btn.resetPassword') }}
        </v-btn>
      </v-card-actions>

      <v-card-text class="pa-0" :class="[isDarkMode ? 'text-grey' : 'text-primary']">
        <v-btn
          to="/signin"
          size="x-small"
          variant="plain"
          color="inherit"
          prepend-icon="mdi-chevron-left"
        >
          <template v-slot:prepend>
            <v-icon :icon="isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
          </template>
          {{ t('$vuetify.custom.backBtns.backToSignIn') }}
        </v-btn>
      </v-card-text>
    </v-form>
    <v-dialog v-model="showEmailSentDialog" width="auto" max-width="50%">
      <v-card class="px-4 py-2 text-center">
        <v-card-title>
          {{ t('$vuetify.custom.texts.linkSentSuccessfully') }}
          <v-icon icon="mdi-check-circle-outline" size="sm" color="success" />
        </v-card-title>
        <v-card-subtitle>{{ t('$vuetify.custom.texts.weHaveSentYouAnEmail') }}</v-card-subtitle>
        <v-card-actions class="d-flex">
          <v-btn
            block
            class="w-50"
            rounded="lg"
            color="primary"
            variant="flat"
            @click="handleEmailSentDialog"
          >
            {{ t('$vuetify.custom.btn.ok') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useTheme, useLocale } from 'vuetify';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores';

const showEmailSentDialog = ref(false);

const router = useRouter();
const authStore = useAuth();
const theme = useTheme();
const { t, isRtl } = useLocale();
const isDarkMode = computed(() => theme.current.value.dark);

const schema = object({
  email: string().email().required(t('$vuetify.custom.inputErrors.emailIsRequired'))
});

const { handleSubmit, defineComponentBinds, errors, setErrors, meta, isSubmitting } = useForm({
  validationSchema: schema
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});

const email = defineComponentBinds('email', vuetifyConfig);

const resetPassword = handleSubmit(async (values) => {
  try {
    await authStore.sendForgotPassword({
      phone_number: values?.email,
      type: 'EMAIL'
    });
    showEmailSentDialog.value = true;
  } catch (error) {
    setErrors({ apiError: error?.message });
    setTimeout(() => setErrors({ apiError: null }), 5000);
  }
});

const handleEmailSentDialog = () => {
  showEmailSentDialog.value = false;
  router.push('/signin');
};
</script>
