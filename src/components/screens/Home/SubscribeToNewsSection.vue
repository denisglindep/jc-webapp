<template>
  <v-container
    tag="section"
    fluid
    :class="[isDarkMode ? 'section-bg-dark' : 'section-bg-light']"
    class="d-flex justify-center align-center py-16"
  >
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="6" lg="8">
          <div class="d-flex flex-column">
            <p :class="[isDarkMode ? 'text-grey' : 'text-deepgrey']" class="text-uppercase">
              {{ t('$vuetify.custom.texts.registerYourInterestsHere') }} <span class="line-after" />
            </p>
            <h3 class="text-white">
              {{ t('$vuetify.custom.texts.latestNewsText') }}
            </h3>
          </div>
        </v-col>
        <v-col cols="12" md="6" lg="4">
          <v-form @submit.prevent="submit" class="d-flex align-center rounded bg-white pa-2">
            <v-row no-gutters>
              <v-col cols="6">
                <v-text-field
                  v-bind="email"
                  placeholder="johndoe@gmail.com"
                  hide-details="true"
                  :label="t('$vuetify.custom.inputTexts.enterEmail')"
                  clearable
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-btn height="100%" block rounded="sm" type="submit" size="x-large">{{
                  t('$vuetify.custom.btn.subscribe')
                }}</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { useForm } from 'vee-validate';
import { useTheme, useLocale } from 'vuetify';
import { object, string } from 'yup';
import { computed } from 'vue';

const theme = useTheme();
const { t } = useLocale();
const isDarkMode = computed(() => theme.current.value.dark);

const schema = object({
  email: string().required().email()
});

const { handleSubmit, defineComponentBinds } = useForm({
  validationSchema: schema
});

const vuetifyConfig = (state) => ({
  props: {
    'error-messages': state.errors
  }
});

const email = defineComponentBinds('email', vuetifyConfig);
const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<style>
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
