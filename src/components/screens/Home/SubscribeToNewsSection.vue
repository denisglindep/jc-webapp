<template>
  <v-container
    tag="section"
    fluid
    :class="[isDark ? 'section-bg-dark' : 'section-bg-light']"
    class="d-flex justify-center align-center"
  >
    <v-container class="py-16">
      <v-row align="center">
        <v-col cols="12" md="6" lg="8">
          <div class="d-flex flex-column">
            <p class="text-deepgrey">REGISTER YOUR INTEREST HERE <span class="line-after" /></p>
            <h3 class="text-white">
              To ensure you are kept up to date with our latest news, upcoming events and more,
              please register your interest below
            </h3>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <v-form @submit.prevent="submit" class="d-flex align-center rounded bg-white pa-2">
            <v-container class="pa-0">
              <v-row no-gutters>
                <v-col cols="6">
                  <v-text-field
                    v-model="email.value.value"
                    :error-messages="email.errorMessage.value"
                    placeholder="johndoe@gmail.com"
                    hide-details="true"
                    label="Enter Email"
                    clearable
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-btn height="100%" block rounded="sm" type="submit" size="x-large"
                    >Subscribe</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { watchEffect } from 'vue';
import { useTheme } from 'vuetify';
const theme = useTheme();
const isDark = ref(false);

watchEffect(() => {
  isDark.value = theme.global.name.value === 'dark';
});

const { handleSubmit } = useForm({
  validationSchema: {
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
      // if (!value) return 'E-mail is required.';

      return 'Must be a valid e-mail.';
    }
  }
});
const email = useField('email');
const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<style>
/* .custom-append .v-input__details {
  color: #fff;
}

.custom-append .v-input__details .v-messages {
  color: inherit;
}
.custom-append .v-input__control {
  background: #fff;
}
.custom-append > .v-input__control > .v-field--appended {
  margin: 0;
  padding: 0;
} */
.section-spacing {
  padding: 6rem 0;
}
.section-bg-light {
  background: linear-gradient(116deg, #94a3b8 0%, #64748b 100%);
}

.section-bg-dark {
  background: linear-gradient(116deg, #1e293b 0%, #0f172a 100%);
}
.line-after {
  position: relative;
}

.line-after::after {
  content: '';
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  width: 16px;
  height: 2px;
  margin-left: 0.5rem;
  background: #475569;
}
</style>
