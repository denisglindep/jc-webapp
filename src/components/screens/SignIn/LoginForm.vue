<template>
  <v-card class="mx-auto px-10 d-flex flex-column" rounded="xl">
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
    <v-img class="mx-auto my-8">
      <router-link to="/">
        <LogoIcon />
      </router-link>
    </v-img>
    <v-form @submit="submit">
      <v-text-field
        v-bind="email"
        class="mb-2"
        clearable
        density="compact"
        :label="t('$vuetify.custom.inputTexts.enterEmail')"
        prepend-inner-icon="mdi-email-outline"
      />

      <v-text-field
        v-bind="password"
        clearable
        density="compact"
        :label="t('$vuetify.custom.inputTexts.password')"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        prepend-inner-icon="mdi-lock-outline"
        :type="visible ? 'text' : 'password'"
        @click:append-inner="visible = !visible"
      />
      <div class="d-flex justify-end">
        <v-btn
          to="/forgot-password"
          size="x-small"
          variant="plain"
          :ripple="false"
          class="ma-0 text-grey"
        >
          {{ t('$vuetify.custom.btn.forgotPassword') }}
        </v-btn>
      </div>

      <v-btn block size="x-large" class="my-2" type="submit" :disabled="!isValid">
        {{ t('$vuetify.custom.btn.signIn') }}
      </v-btn>
    </v-form>

    <v-card-text class="text-center">
      {{ t('$vuetify.custom.texts.doNotHaveAccount') }}
      <span>
        <router-link
          class="text-decoration-underline"
          :class="[isDarkMode ? 'text-grey' : 'text-primary']"
          to="/signup"
        >
          {{ t('$vuetify.custom.btn.signUp') }}
        </router-link>
      </span>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useForm } from 'vee-validate';
import { useTheme, useLocale } from 'vuetify';
import { object, string } from 'yup';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores';
import LogoIcon from '../../Icons/LogoIcon.vue';

const visible = ref(false);
const authStore = useAuth();
const router = useRouter();
const theme = useTheme();
const { t } = useLocale();
const isDarkMode = computed(() => theme.current.value.dark);

const schema = object({
  email: string()
    .email(t('$vuetify.custom.inputErrors.emailIsInvalid'))
    .required(t('$vuetify.custom.inputErrors.emailIsRequired')),
  password: string().required(t('$vuetify.custom.inputErrors.passwordIsRequired'))
});

const { defineComponentBinds, handleSubmit, setErrors, errors } = useForm({
  validationSchema: schema
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});
const email = defineComponentBinds('email', vuetifyConfig);
const password = defineComponentBinds('password', vuetifyConfig);
const isValid = computed(() => Object.keys(errors?.value).length === 0);

const submit = handleSubmit(async (values) => {
  try {
    const data = {
      username: values?.email,
      password: values?.password,
      type: 'USER'
    };
    await authStore.signInUser(data);
    router.push({ path: '/' });
  } catch (error) {
    setErrors({ apiError: error?.message });
    setTimeout(() => setErrors({ apiError: null }), 5000);
  }
});
</script>
