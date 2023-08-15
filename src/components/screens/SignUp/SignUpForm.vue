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
        v-bind="firstName"
        class="mb-2"
        clearable
        density="compact"
        label="First name"
      />
      <v-text-field v-bind="lastName" class="mb-2" clearable density="compact" label="Last name" />
      <v-text-field
        v-bind="email"
        :rules="[validateEmail]"
        class="mb-2"
        clearable
        density="compact"
        label="Email"
        prepend-inner-icon="mdi-email-outline"
      />
      <v-text-field
        class="mb-2"
        v-bind="password"
        clearable
        density="compact"
        label="Password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        prepend-inner-icon="mdi-lock-outline"
        :type="visible ? 'text' : 'password'"
        @click:append-inner="visible = !visible"
      />
      <v-text-field
        v-bind="passwordConfirm"
        clearable
        density="compact"
        label="Confirm password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        prepend-inner-icon="mdi-lock-outline"
        :type="visible ? 'text' : 'password'"
        @click:append-inner="visible = !visible"
      />
      <div class="d-flex">
        <v-select
          v-bind="countryCode"
          class="custom-country-select"
          :items="allCountries"
          required
          label="Select Country"
          :rules="[validatePhone]"
        />
        <v-text-field
          v-bind="phone"
          :rules="[validatePhone]"
          class="w-75"
          clearable
          label="Phone number"
        />
      </div>
      <v-btn
        block
        size="x-large"
        class="my-2"
        type="submit"
        :loading="isSubmitting"
        :disabled="!isValid"
        >Sign Up</v-btn
      >
    </v-form>
    <v-card-text class="text-center">
      Already have an account?
      <span>
        <router-link
          class="text-decoration-underline"
          :class="[isDarkMode ? 'text-grey' : 'text-primary']"
          to="/signin"
        >
          Log in
        </router-link>
      </span>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useTheme } from 'vuetify';
import { object, string, ref as yupRef } from 'yup';
import { verifyEmail, verifyMobile } from '@/services/auth';
import { useDebounceFn } from '@vueuse/core';
import { useAuth } from '@/stores/auth.js';
import { useRouter } from 'vue-router';
import LogoIcon from '../../Icons/LogoIcon.vue';
import allCountries from '@/utils/allCountries.js';

const debouncedEmailVerification = useDebounceFn(
  async (typedEmail) => await verifyEmail(typedEmail),
  500
);
const debouncedPhoneVerification = useDebounceFn(
  async (typedEmail) => await verifyMobile(typedEmail),
  500
);

const visible = ref(false);

const theme = useTheme();
const authStore = useAuth();
const router = useRouter();

const isDarkMode = computed(() => theme.current.value.dark);

const schema = object({
  firstName: string().required().label('First name'),
  lastName: string().required().label('Last name'),
  email: string().email().required().label('E-mail'),
  // password should have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
  password: string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    )
    .required()
    .label('Password'),
  passwordConfirm: string()
    .oneOf([yupRef('password')], 'Passwords must match')
    .required()
    .label('Password confirmation'),
  phone: string()
    .matches(/^\d{6,15}$/, 'Invalid phone number format.')
    .required('Phone number is required')
    .label('Phone')
});

const {
  defineComponentBinds,
  handleSubmit,
  errors,
  setFieldError,
  setErrors,
  isSubmitting,
  values,
  meta
} = useForm({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    countryCode: allCountries?.[0]?.value,
    phone: ''
  },
  validationSchema: schema
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});

const firstName = defineComponentBinds('firstName', vuetifyConfig);
const lastName = defineComponentBinds('lastName', vuetifyConfig);
const email = defineComponentBinds('email', vuetifyConfig);
const password = defineComponentBinds('password', vuetifyConfig);
const passwordConfirm = defineComponentBinds('passwordConfirm', vuetifyConfig);
const phone = defineComponentBinds('phone', vuetifyConfig);
const countryCode = defineComponentBinds('countryCode', vuetifyConfig);
const isValid = computed(() => meta?.value?.valid && !meta?.value?.pending);

const phoneField = useField('phone');

const validateEmail = async () => {
  if (values?.email?.length > 0 && !isSubmitting?.value) {
    try {
      await debouncedEmailVerification({
        email: email?.value?.modelValue
      });
      return true;
    } catch (error) {
      setFieldError('email', error?.body?.message);
    }
  }
  return false;
};

const validatePhone = async () => {
  if (
    phoneField?.value?.value.length > 0 &&
    !phoneField?.meta?.pending &&
    phoneField?.meta?.valid &&
    phoneField?.meta?.dirty
  ) {
    try {
      await debouncedPhoneVerification({
        phone: `+${countryCode?.value?.modelValue}${phone?.value?.modelValue}`
      });
      return true;
    } catch (error) {
      debugger
      setFieldError('phone', error?.body?.message);
    }
  }
  return false;
};

const submit = handleSubmit(
  async ({ firstName, lastName, email, password, phone, countryCode }) => {
    try {
      const data = {
        first_name: firstName,
        last_name: lastName,
        email,
        confirm_email: email,
        password,
        phone_number: phone,
        phone_code: `+${countryCode}`
      };
      await authStore.signUpUser(data);
      router.push('/');
    } catch (error) {
      setErrors({ apiError: error?.body?.message });
      setTimeout(() => setErrors({ apiError: null }), 5000);
    }
  }
);
</script>

<style scoped>
.custom-country-select {
  width: 50%;
}

.custom-country-select .v-overlay_content.v-select_content {
  min-width: 100px !important;
  max-width: max-content !important;
}
</style>
