<template>
  <v-card class="mx-auto px-10 d-flex flex-column" rounded="xl">
    <v-img class="mx-auto my-8">
      <router-link to="/">
        <LogoIcon />
      </router-link>
    </v-img>
    <form @submit="submit">
      <v-text-field
        class="mb-2"
        clearable
        density="compact"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="Email"
        prepend-inner-icon="mdi-email-outline"
      />

      <v-text-field
        clearable
        density="compact"
        label="Password"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
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
          >Forgot Password?
        </v-btn>
      </div>

      <v-btn block size="x-large" class="my-2" type="submit" :disabled="!isValid">Login</v-btn>
    </form>

    <v-card-text class="text-center">
      Do not have an account?
      <span>
        <router-link
          class="text-decoration-underline"
          :class="[isDarkMode ? 'text-grey' : 'text-primary']"
          to="/signup"
        >
          Sign Up
        </router-link>
      </span>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { useField, useForm } from 'vee-validate';
import { computed, ref } from 'vue';
import { useTheme } from 'vuetify';
import LogoIcon from '../../Icons/LogoIcon.vue';

const theme = useTheme();
const isDarkMode = computed(() => theme.current.value.dark);

const visible = ref(false);
const { handleSubmit, errors } = useForm({
  validationSchema: {
    email(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }
      // All is good
      return true;
    },
    password(value) {
      if (!value) {
        return 'This field is required';
      }
      if (value?.length < 8) {
        return 'Must be at least 8 characters long.';
      }

      return true;
    }
  }
});

const email = useField('email');
const password = useField('password');

const isValid = computed(() => {
  const valid = Object.keys(errors?.value).length === 0;
  return valid;
});

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
