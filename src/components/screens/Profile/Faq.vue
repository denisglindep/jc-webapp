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
          <v-col v-for="item in filteredFaqList" :key="item.id" cols="12" xs="12" sm="12" md="6">
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
import { onActivated, ref } from 'vue';
import { useLocale } from 'vuetify';
import { useProfile } from '../../../stores';
import { computed } from 'vue';

const profile = useProfile();
const { t, isRtl } = useLocale();

const faqList = ref([
  {
    id: 3,
    created_date: '2023-08-17T09:46:43',
    updated_date: '2023-08-17T09:46:43',
    faq_title_en: 'Is food permitter inside venue for events',
    faq_title_ar: 'Is food permitter inside venue for events',
    faq_description_en: 'No food or beverage are permitted inside the venue.',
    faq_description_ar: 'يمنع منعاً باتاً إدخال الأطعمة والمشروبات داخل قاعة المسرح.',
    user_id: 0,
    status: 1
  },
  {
    id: 2,
    created_date: '2023-08-17T09:46:23',
    updated_date: '2023-08-17T09:46:23',
    faq_title_en: 'What type of tickets shall be honored',
    faq_title_ar: 'What type of tickets shall be honored',
    faq_description_en: 'Only tickets sold through the official sales channels shall be honored.',
    faq_description_ar: 'لا يحق بيع أو إعادة بيع أي تذكرة تحت أي ظروف كانت.',
    user_id: 0,
    status: 1
  },
  {
    id: 1,
    created_date: '2023-08-17T09:44:29',
    updated_date: '2023-08-17T09:44:29',
    faq_title_en: 'Test',
    faq_title_ar: 'Test',
    faq_description_en: 'Test',
    faq_description_ar: 'Test',
    user_id: 0,
    status: 0
  },
  {
    id: 4,
    created_date: '2023-08-17T09:46:43',
    updated_date: '2023-08-17T09:46:43',
    faq_title_en: 'Is food permitter inside venue for events',
    faq_title_ar: 'Is food permitter inside venue for events',
    faq_description_en: 'No food or beverage are permitted inside the venue.',
    faq_description_ar: 'يمنع منعاً باتاً إدخال الأطعمة والمشروبات داخل قاعة المسرح.',
    user_id: 0,
    status: 1
  },
  {
    id: 5,
    created_date: '2023-08-17T09:46:43',
    updated_date: '2023-08-17T09:46:43',
    faq_title_en: 'Is food permitter inside venue for events',
    faq_title_ar: 'Is food permitter inside venue for events',
    faq_description_en: 'No food or beverage are permitted inside the venue.',
    faq_description_ar: 'يمنع منعاً باتاً إدخال الأطعمة والمشروبات داخل قاعة المسرح.',
    user_id: 0,
    status: 1
  },
  {
    id: 6,
    created_date: '2023-08-17T09:46:43',
    updated_date: '2023-08-17T09:46:43',
    faq_title_en: 'Is food permitter inside venue for events',
    faq_title_ar: 'Is food permitter inside venue for events',
    faq_description_en: 'No food or beverage are permitted inside the venue.',
    faq_description_ar: 'يمنع منعاً باتاً إدخال الأطعمة والمشروبات داخل قاعة المسرح.',
    user_id: 0,
    status: 1
  },
  {
    id: 7,
    created_date: '2023-08-17T09:46:43',
    updated_date: '2023-08-17T09:46:43',
    faq_title_en: 'Is food permitter inside venue for events',
    faq_title_ar: 'Is food permitter inside venue for events',
    faq_description_en: 'No food or beverage are permitted inside the venue.',
    faq_description_ar: 'يمنع منعاً باتاً إدخال الأطعمة والمشروبات داخل قاعة المسرح.',
    user_id: 0,
    status: 1
  }
]);
const filteredFaqList = computed(() => {
  return faqList.value.filter((faq) => faq.status === 1);
});

onActivated(async () => {
  try {
    await profile.getFaqInfoList();
  } catch (error) {
    console.log('Fetch FAQ error: ', error);
  }
});
</script>
