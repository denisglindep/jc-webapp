<template>
  <v-container>
    <v-row>
      <v-col>
        <h4 class="text-center text-h4 font-weight-bold">
          {{ t('$vuetify.custom.headings.aboutUs') }}
        </h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="d-flex flex-column text-body-1 text-center">
          <p v-if="$vuetify.locale.current === 'en'">
            The Sheikh Jaber Al-Ahmed Cultural Centre is a multidisciplinary public space owned by
            the Amiri Diwan striving to entertain, educate and inspire the people of Kuwait. It will
            offer a range of events – in music, theatre, film, workshops and spoken word – for every
            generation and sector of society. JACC provides a space for dialogue to share and
            showcase skills and knowledge, giving younger voices a forum in which to speak. The
            cultural centre is a platform for educational and cultural exchange; moreover, it
            functions as an influential entertainment and culture powerhouse and productive space
            for the region. Kuwait’s cultural identity has always been rooted in a modern,
            avant-garde and experimental tradition. We wish to return to this identity at JACC and
            establish ourselves as the model space for all cultural events and activities, on
            national, regional and international levels.
          </p>
          <p v-else>
            إن تصميم مركز الشيخ جابر الأحمد الثقافي مستوحى من العمارة الإسلامية المميزة في تاريخ
            الفن والإبداع، حيث يضم المركز مساحات شاسعة تتيح للزوار التمتع بالشكل الداخلي للمركز
            وبتصميمه الهندسي للقاعات والمسارح، كما أن موقعه على شارع الخليج العربي أضفى أهمية سياحية
            مصاحبةً لأهميته الثقافية والفنية. لطالما كانت دولة الكويت صاحبة السبق في الثقافة والفنون
            والآداب، نود من خلال هذا المركز الوصول إلى العالمية من خلال التمسك بجذور هويتنا الكويتية
            والمساهمة في تطويرها.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ContactUsSection />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useLocale } from 'vuetify';
import ContactUsSection from '@/components/screens/Home/ContactUsSection.vue';
const { t } = useLocale();
</script>
