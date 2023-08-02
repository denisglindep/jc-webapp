<template>
  <v-card class="mx-auto px-10 d-flex flex-column pt-10" rounded="xl">
    <v-img class="mx-auto">
      <v-icon icon="mdi-key-outline" />
    </v-img>

    <v-card-text class="mx-auto text-center">
      <v-card-title>Forgot password?</v-card-title>
      <v-card-subtitle>No worries, we'll send you reset instructions.</v-card-subtitle>
    </v-card-text>

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

      <v-btn block size="x-large" class="my-2" type="submit" :disabled="!isValid">
        Reset Password
      </v-btn>
    </form>

    <v-card-text class="text-center" :class="[isDarkMode ? 'text-grey' : 'text-primary']">
      <v-btn
        to="/signin"
        size="x-small"
        variant="plain"
        color="inherit"
        prepend-icon="mdi-chevron-left"
      >
        Back to Log In
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { computed } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useTheme } from 'vuetify';

const theme = useTheme();
const isDarkMode = computed(() => theme.current.value.dark);

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
    }
  }
});

const email = useField('email');

const isValid = computed(() => Object.keys(errors?.value).length === 0);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
