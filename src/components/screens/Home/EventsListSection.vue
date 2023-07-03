<template>
  <section>
    <div class="mb-10 flex justify-between font-medium">
      <h3 class="text-3xl">{{ sectionTitle }}</h3>
      <a href="#" class="text-base text-accent underline">See all</a>
    </div>
    <article class="grid-flow-cols grid grid-cols-3 gap-4">
      <Card
        v-for="event in events"
        :key="event.id"
        :imageSrc="event.cover_image"
        :title="event.name_en"
        :description="event.short_description_en"
      >
        <div class="flex gap-2 text-slate-500 dark:opacity-80">
          <DateIcon /> {{ event.date_time }}
        </div>
      </Card>
    </article>
  </section>
</template>

<script setup>
import Card from '@/components/common/Card.vue';
import DateIcon from '@/components/Icons/DateIcon.vue';

defineProps({
  events: {
    type: Array,
    required: false
  },
  sectionTitle: {
    type: String,
    required: true
  }
});
</script>
