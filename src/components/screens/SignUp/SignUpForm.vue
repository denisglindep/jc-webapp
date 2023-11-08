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
        :label="t('$vuetify.custom.inputTexts.firstName')"
      />
      <v-text-field
        v-bind="lastName"
        class="mb-2"
        clearable
        density="compact"
        :label="t('$vuetify.custom.inputTexts.lastName')"
      />
      <v-text-field
        v-bind="email"
        class="mb-2"
        clearable
        density="compact"
        :label="t('$vuetify.custom.inputTexts.enterEmail')"
        prepend-inner-icon="mdi-email-outline"
      />
      <v-text-field
        class="mb-2"
        v-bind="password"
        clearable
        density="compact"
        :label="t('$vuetify.custom.inputTexts.password')"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        prepend-inner-icon="mdi-lock-outline"
        :type="visible ? 'text' : 'password'"
        @click:append-inner="visible = !visible"
      />
      <v-text-field
        v-bind="passwordConfirm"
        clearable
        density="compact"
        :label="t('$vuetify.custom.inputTexts.confirmPassword')"
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
          :label="t('$vuetify.custom.inputTexts.selectCountry')"
        />
        <v-text-field
          v-bind="phone"
          class="w-75"
          clearable
          :label="t('$vuetify.custom.inputTexts.phoneNumber')"
        />
      </div>
      <v-btn
        block
        size="x-large"
        class="my-2"
        type="submit"
        :loading="isSubmitting"
        :disabled="!isValid"
      >
        {{ t('$vuetify.custom.btn.signUp') }}
      </v-btn>
    </v-form>
    <v-card-text class="text-center">
      {{ t('$vuetify.custom.texts.alreadyHaveAccount') }}
      <span>
        <router-link
          class="text-decoration-underline"
          :class="[isDarkMode ? 'text-grey' : 'text-primary']"
          to="/signin"
        >
          {{ t('$vuetify.custom.btn.signIn') }}
        </router-link>
      </span>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useForm } from 'vee-validate';
import { useTheme, useLocale } from 'vuetify';
import { object, string, ref as yupRef } from 'yup';
import { useDebounceFn } from '@vueuse/core';
import { useAuth } from '@/stores';
import { useRouter } from 'vue-router';
import LogoIcon from '../../Icons/LogoIcon.vue';
import allCountries from '@/utils/allCountries.js';

const visible = ref(false);

const theme = useTheme();
const { t } = useLocale();
const authStore = useAuth();
const router = useRouter();

const isDarkMode = computed(() => theme.current.value.dark);

const schema = object({
  firstName: string().required(t('$vuetify.custom.inputErrors.firstNameIsRequired')),
  lastName: string().required(t('$vuetify.custom.inputErrors.firstNameIsRequired')),
  email: string()
    .email()
    .required(t('$vuetify.custom.inputErrors.emailIsRequired'))
    .test('email', t('$vuetify.custom.inputErrors.emailIsAlreadyTaken'), (value) =>
      validateEmail(value)
    ),
  password: string()
    .min(8, t('$vuetify.custom.inputErrors.passwordAtLeast8Characters'))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      t('$vuetify.custom.inputErrors.passwordRequirements')
    )
    .required(t('$vuetify.custom.inputErrors.passwordIsRequired')),
  passwordConfirm: string()
    .oneOf([yupRef('password')], t('$vuetify.custom.inputErrors.passwordsMustMatch'))
    .required(t('$vuetify.custom.inputErrors.confirmPasswordIsRequired')),
  phone: string()
    .matches(/^\d{6,15}$/, t('$vuetify.custom.inputErrors.phoneNumberIsInvalid'))
    .required(t('$vuetify.custom.inputErrors.phoneNumberIsRequired'))
    .test('phone', t('$vuetify.custom.inputErrors.phoneIsAlreadyTaken'), (value) =>
      validatePhone(value)
    )
});

const { defineComponentBinds, handleSubmit, errors, setFieldError, setErrors, isSubmitting, meta } =
  useForm({
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

const debouncedEmailVerification = useDebounceFn(
  async (typedEmail) => await authStore.checkIfEmailIsAvailable(typedEmail),
  500
);
const debouncedPhoneVerification = useDebounceFn(
  async (typedEmail) => await authStore.checkIfMobileIsAvailable(typedEmail),
  500
);

const firstName = defineComponentBinds('firstName', vuetifyConfig);
const lastName = defineComponentBinds('lastName', vuetifyConfig);
const email = defineComponentBinds('email', vuetifyConfig);
const password = defineComponentBinds('password', vuetifyConfig);
const passwordConfirm = defineComponentBinds('passwordConfirm', vuetifyConfig);
const phone = defineComponentBinds('phone', vuetifyConfig);
const countryCode = defineComponentBinds('countryCode', vuetifyConfig);
const isValid = computed(() => meta?.value?.valid && !meta?.value?.pending);

const validateEmail = async (value) => {
  if (value?.length > 0) {
    try {
      await debouncedEmailVerification({
        email: value
      });
      return true;
    } catch (error) {
      setFieldError('email', error?.message);
      return false;
    }
  }
};

const validatePhone = async (validatePhone) => {
  if (validatePhone.length > 0) {
    try {
      await debouncedPhoneVerification({
        phone: `+${countryCode?.value?.modelValue}${validatePhone}`
      });
      return true;
    } catch (error) {
      setFieldError('phone', error?.message);
      return false;
    }
  }
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
      setErrors({ apiError: error?.message });
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
