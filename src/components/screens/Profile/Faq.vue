<template>
  <v-container>
    <v-row>
      <v-btn class="mt-4" color="primary" variant="plain" :ripple="false" to="/profile">
        <template v-slot:prepend>
          <v-icon :icon="isRtl ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
        </template>
        {{ t('$vuetify.custom.backBtns.backToProfile') }}
      </v-btn>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-center mx-auto">
          <h4 class="text-h4 font-weight-bold">
            {{ t('$vuetify.custom.headings.frequentlyAskedQuestions') }}
          </h4>
          <p class="text-grey text-caption">
            {{ t('$vuetify.custom.headings.frequentlyAskedQuestionsSubtitle') }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels variant="accordion">
          <v-col v-for="item in profile.profile.faq" :key="item.id" cols="12" xs="12" sm="12" md="6">
            <v-expansion-panel :text="item.faq_description_en">
              <v-expansion-panel-title>
                {{ item.faq_title_en }}
                <template v-slot:actions="{ expanded }">
                  <v-icon color="primary" :icon="!expanded ? '$expand' : '$collapse'" />
                </template>
              </v-expansion-panel-title>
            </v-expansion-panel>
          </v-col>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { useLocale } from 'vuetify';
import { useProfile } from '../../../stores';

const profile = useProfile();
const { t, isRtl } = useLocale();

onMounted(async () => {
  try {
    await profile.getFaqInfoList();
  } catch (error) {
    console.log('Fetch FAQ error: ', error);
  }
});
</script>
