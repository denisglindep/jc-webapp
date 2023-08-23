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
    <v-img class="text-center">
      <v-icon icon="mdi-key-outline" size="x-large" />
    </v-img>
    <v-card-title class="text-body-1 text-center">Reset password for: {{ email }}</v-card-title>
    <v-form @submit="resetPassword">
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
      <v-btn block size="x-large" type="submit" :loading="isSubmitting" :disabled="isSubmitting">
        Reset Password
      </v-btn>
    </v-form>
  </v-card>
  <v-dialog v-model="passwordReseted" width="auto" max-width="50%">
    <v-card class="px-4 py-2 text-center">
      <v-card-title>
        Your password has been reset!
        <v-icon icon="mdi-check-circle-outline" size="sm" color="success" />
      </v-card-title>
      <v-card-subtitle>Now you can sign in with a new password.</v-card-subtitle>
      <v-card-actions class="d-flex">
        <v-btn
          block
          class="w-50"
          rounded="lg"
          color="primary"
          variant="flat"
          @click="handleBackToLogin"
        >
          Back to Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { object, string, ref as yupRef } from 'yup';
import { useForm } from 'vee-validate';
import { useAuth } from '@/stores/auth';
import { useRouter } from 'vue-router';

const passwordReseted = ref(false);
const visible = ref(false);

const props = defineProps({
  email: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
});

const auth = useAuth();
const router = useRouter();

const schema = object({
  password: string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    )
    .required()
    .label('New Password'),
  passwordConfirm: string()
    .oneOf([yupRef('password')], 'Passwords must match')
    .required()
    .label('New Password Confirmation')
});

const { handleSubmit, defineComponentBinds, errors, isSubmitting, setErrors } = useForm({
  validationSchema: schema
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});
const password = defineComponentBinds('password', vuetifyConfig);
const passwordConfirm = defineComponentBinds('passwordConfirm', vuetifyConfig);

const resetPassword = handleSubmit(async (values) => {
  try {
    await auth.resetPassword({
      password: values.password,
      user_id: props.userId
    });
    passwordReseted.value = true;
  } catch (error) {
    setErrors({ apiError: error?.message });
    setTimeout(() => setErrors({ apiError: null }), 5000);
  }
});

const handleBackToLogin = () => {
  passwordReseted.value = false;
  router.push('/signin');
};
</script>
