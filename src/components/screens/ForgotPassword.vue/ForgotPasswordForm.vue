<template>
  <v-card class="mx-auto px-10 d-flex flex-column pt-10" rounded="xl">
    <v-img class="mx-auto">
      <v-icon icon="mdi-key-outline" />
    </v-img>

    <v-card-text class="mx-auto text-center">
      <v-card-title>Forgot password?</v-card-title>
      <v-card-subtitle>No worries, we'll send you reset instructions.</v-card-subtitle>
    </v-card-text>

    <v-form @submit="submit">
      <v-text-field
        v-bind="email"
        class="mb-2"
        clearable
        density="compact"
        label="Email"
        prepend-inner-icon="mdi-email-outline"
      />

      <v-btn block size="x-large" class="my-2" type="submit" :disabled="!isValid">
        Reset Password
      </v-btn>
    </v-form>

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
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useTheme } from 'vuetify';

const theme = useTheme();
const isDarkMode = computed(() => theme.current.value.dark);

const schema = object({
  email: string().required().email()
});

const { handleSubmit, defineComponentBinds, errors } = useForm({
  validationSchema: schema
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});

const email = defineComponentBinds('email', vuetifyConfig);
const isValid = computed(() => Object.keys(errors?.value).length === 0);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
