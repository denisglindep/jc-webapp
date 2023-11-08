<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-bind="name" clearable :label="t('$vuetify.custom.inputTexts.name')" />
    <v-text-field v-bind="phone" clearable :label="t('$vuetify.custom.inputTexts.phoneNumber')" />
    <v-text-field v-bind="email" clearable :label="t('$vuetify.custom.inputTexts.enterEmail')" />
    <v-textarea
      v-bind="message"
      rows="3"
      clearable
      :label="t('$vuetify.custom.inputTexts.textHere')"
    />
    <v-btn block size="x-large" class="my-2" type="submit">{{
      t('$vuetify.custom.btn.sendMessage')
    }}</v-btn>
  </v-form>
</template>
<script setup>
import { useLocale } from 'vuetify';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
const { t } = useLocale();

const schema = object({
  name: string().required(t('$vuetify.custom.inputErrors.nameIsRequired')),
  email: string().email().required(t('$vuetify.custom.inputErrors.emailIsRequired')),
  phone: string()
    .matches(/^\d{6,15}$/, t('$vuetify.custom.inputErrors.phoneNumberIsInvalid'))
    .required(t('$vuetify.custom.inputErrors.phoneNumberIsRequired')),
  message: string().required(t('$vuetify.custom.inputErrors.messageIsRequired'))
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
