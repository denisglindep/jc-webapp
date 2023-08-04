<template>
  <v-card class="mx-auto px-10 d-flex flex-column" rounded="xl">
    <v-img class="mx-auto my-8">
      <router-link to="/">
        <LogoIcon />
      </router-link>
    </v-img>
    <v-form @submit="submit">
      <v-text-field v-bind="name" class="mb-2" clearable density="compact" label="Full Name" />

      <v-text-field
        v-bind="email"
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

      <v-btn block size="x-large" class="my-2" type="submit" :disabled="!isValid">Sign Up</v-btn>
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
import { useForm } from 'vee-validate';
import { useTheme } from 'vuetify';
import { object, string, ref as yupRef } from 'yup';
import LogoIcon from '../../Icons/LogoIcon.vue';

const visible = ref(false);
const theme = useTheme();
const isDarkMode = computed(() => theme.current.value.dark);

const schema = object({
  name: string().required().label('Name'),
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
    .label('Password confirmation')
});

const { defineComponentBinds, handleSubmit, errors } = useForm({
  validationSchema: schema
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});

const name = defineComponentBinds('name', vuetifyConfig);
const email = defineComponentBinds('email', vuetifyConfig);
const password = defineComponentBinds('password', vuetifyConfig);
const passwordConfirm = defineComponentBinds('passwordConfirm', vuetifyConfig);
const isValid = computed(() => Object.keys(errors?.value).length === 0);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
