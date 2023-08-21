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
    <v-form @submit="resetPassword">
      <div class="text-center" v-if="!showOtp">
        <v-img>
          <v-icon icon="mdi-key-outline" size="x-large" />
        </v-img>
        <v-card-title>Forgot password?</v-card-title>
        <v-card-text>
          <v-card-subtitle>No worries, we'll send you reset instructions.</v-card-subtitle>
        </v-card-text>

        <v-card-item class="pa-0">
          <v-text-field
            v-bind="email"
            class="mb-2 text-start"
            clearable
            density="compact"
            label="Email"
            prepend-inner-icon="mdi-email-outline"
          />
        </v-card-item>
        <v-card-actions>
          <v-btn
            block
            variant="flat"
            size="x-large"
            @click="handleEmail"
            :disabled="!!errors?.email"
          >
            Send verification code
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
            Back to Log In
          </v-btn>
        </v-card-text>
      </div>
      <div class="text-center" v-else>
        <v-img>
          <v-icon icon="mdi-lock-check" size="x-large" />
        </v-img>
        <v-card-title>Verification code sent!</v-card-title>

        <v-card-text>
          <v-card-subtitle>
            We sent you a one-time password (OTP) to your phone and to your email address.
          </v-card-subtitle>
          <v-card-subtitle>
            Please check your SMS or your Email inbox and input the OTP below.
          </v-card-subtitle>
        </v-card-text>
        <v-card-item class="pa-0">
          <v-text-field
            v-bind="otp"
            class="text-start mb-2"
            clearable
            density="compact"
            label="Verification code"
            prepend-inner-icon="mdi-key-outline"
          />
        </v-card-item>
        <v-card-actions>
          <v-btn block variant="flat" size="x-large" type="submit" :disabled="!!errors?.otp">
            Reset password
          </v-btn>
        </v-card-actions>
      </div>
    </v-form>
    <v-dialog v-model="showEmailSentDialog" width="auto" max-width="50%">
      <v-card class="px-4 py-2">
        <v-card-title class="mb-4"
          >Link sent successfully! <v-icon icon="mdi-success-outlined"
        /></v-card-title>
        <v-card-subtitle>We had sent reset password link to your registered email.</v-card-subtitle>
        <v-card-actions class="d-flex">
          <v-btn
            class="w-50"
            rounded="lg"
            color="primary"
            variant="flat"
            @click="showEmailSentDialog = false"
          >
            OK
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
import { useTheme } from 'vuetify';
import { useAuth } from '@/stores/auth';

const showOtp = ref(false);

const authStore = useAuth();
const theme = useTheme();
const isDarkMode = computed(() => theme.current.value.dark);

const schema = object({
  email: string().email().required(),
  otp: string().required().min(4).max(4)
});

const { handleSubmit, defineComponentBinds, errors, setErrors, values } = useForm({
  validationSchema: schema
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});

const email = defineComponentBinds('email', vuetifyConfig);
const otp = defineComponentBinds('otp', vuetifyConfig);

async function handleEmail() {
  try {
    const formData = new FormData();
    formData.append('phone_number', values?.email);
    formData.append('type', 'EMAIL');
    await authStore.sendForgotPassword({
      phone_number: values?.email,
      type: 'EMAIL'
    });
    showOtp.value = true;
  } catch (error) {
    setErrors({ apiError: error?.message });
    setTimeout(() => setErrors({ apiError: null }), 5000);
  }
}

const resetPassword = handleSubmit(async (values) => {
  console.log(123);
});
</script>
