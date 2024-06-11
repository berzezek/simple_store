<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">{{ item.title }}
      </h2>
      <p class="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">${{
        item.get_last_price }}</p>
      <dl v-if="item.description">
        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
        <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{{ item.description }}</dd>
      </dl>
      <dl class="flex items-center space-x-6" v-if="item.tags.length">
        <div>
          <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Tags:</dt>
          <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400" v-for="tag in item.tags" :key="tag">
            {{ tag }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types/myStore';

const props = defineProps({
  item: {
    type: Object as PropType<IProduct>,
    required: false,
    default: () => ({} as IProduct),
  }
});
</script>