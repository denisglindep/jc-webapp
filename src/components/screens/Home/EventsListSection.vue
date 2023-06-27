<template>
  <section>
    <div class="mb-10 flex justify-between font-medium">
      <h3 class="text-3xl">{{ sectionTitle }}</h3>
      <a href="#" class="text-base text-accent underline">See all</a>
    </div>
    <article class="flex justify-center gap-8">
      <Card
        imageSrc="https://source.unsplash.com/random/300x200"
        title="Card Title"
        description="Returning to Australia for the first time in five years, virtuoso bassist and Kendrick Lamar collaborator Thundercat brings his impossibly funky grooves to the Sydney Opera House for his Vivid LIVE debut."
      />
      <Card
        imageSrc="https://source.unsplash.com/random/300x200"
        title="Card Title"
        description="Returning to Australia for the first time in five years, virtuoso bassist and Kendrick Lamar collaborator Thundercat brings his impossibly funky grooves to the Sydney Opera House for his Vivid LIVE debut."
      />
      <Card
        imageSrc="https://source.unsplash.com/random/300x200"
        title="Card Title"
        description="Returning to Australia for the first time in five years, virtuoso bassist and Kendrick Lamar collaborator Thundercat brings his impossibly funky grooves to the Sydney Opera House for his Vivid LIVE debut."
      />
    </article>
  </section>
</template>

<script setup>
import Card from '@/components/common/Card.vue';
import { defineProps } from 'vue';

defineProps({
  sectionTitle: {
    type: String,
    required: true
  }
});
</script>
