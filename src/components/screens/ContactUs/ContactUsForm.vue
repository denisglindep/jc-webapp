<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-bind="name" clearable label="Name" />
    <v-text-field v-bind="phone" clearable label="Phone Number" />
    <v-text-field v-bind="email" clearable label="E-mail" />
    <v-textarea v-bind="message" rows="3" clearable label="Text here" />
    <v-btn block size="x-large" class="my-2" type="submit">Send message</v-btn>
  </v-form>
</template>
<script setup>
import { useForm } from 'vee-validate';
import { object, string } from 'yup';

const schema = object({
  firstName: string().required().label('Name'),
  email: string().email().required().label('E-mail'),
  phone: string()
    .matches(/^\d{6,15}$/, 'Invalid phone number format.')
    .required('Phone number is required')
    .label('Phone'),
  message: string().required().label('Message')
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});

const { handleSubmit, defineComponentBinds } = useForm({
  validationSchema: schema
});
const name = defineComponentBinds('name', vuetifyConfig);
const phone = defineComponentBinds('phone', vuetifyConfig);
const email = defineComponentBinds('email', vuetifyConfig);
const message = defineComponentBinds('message', vuetifyConfig);

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
