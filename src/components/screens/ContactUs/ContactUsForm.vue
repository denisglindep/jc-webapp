<template>
  <form @submit.prevent="submit">
    <v-text-field
      clearable
      v-model="name.value.value"
      :error-messages="name.errorMessage.value"
      label="Name"
    />

    <v-text-field
      clearable
      v-model="phone.value.value"
      :error-messages="phone.errorMessage.value"
      label="Phone Number"
    />

    <v-text-field
      clearable
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      label="E-mail"
    />

    <v-textarea
      clearable
      v-model="message.value.value"
      :error-messages="message.errorMessage.value"
      label="Text here"
    />

    <v-btn block size="x-large" class="my-2" type="submit">Send message</v-btn>
  </form>
</template>
<script setup>
import { useField, useForm } from 'vee-validate';

const { handleSubmit } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;

      return 'Name needs to be at least 2 characters.';
    },
    phone(value) {
      if (value?.length > 9 && /[0-9-]+/.test(value)) return true;

      return 'Phone number needs to be at least 9 digits.';
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return 'Must be a valid e-mail.';
    },
    message(value) {
      // message is required and should not be empty
      if (value?.length > 0) return true;

      return 'Message is required.';
    }
  }
});
const name = useField('name');
const phone = useField('phone');
const email = useField('email');
const message = useField('message');

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
