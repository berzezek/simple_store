<template>
  <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
    aria-label="Table navigation">
    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
      Showing
      <span class="font-semibold text-gray-900 dark:text-white">{{ startItem }}-{{ endItem }}</span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{{ items.count }}</span>
    </span>
    <ul class="inline-flex items-stretch -space-x-px">
      <li v-if="items.previous">
        <a href="#" @click="prevPage"
          class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="{ 'cursor-not-allowed': currentPage === 1 }">
          <span class="sr-only">Previous</span>
          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd" />
          </svg>
        </a>
      </li>
      <li v-for="page in pageCount" :key="page">
        <a href="#" @click.prevent="changePage(page)"
          class="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="{ 'bg-gray-100 dark:bg-gray-700': page === currentPage }">
          {{ page }}</a>
      </li>
      <li v-if="items.next">
        <a href="#" @click="nextPage"
          class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          :class="{ 'cursor-not-allowed': currentPage === pageCount }">
          <span class="sr-only">Next</span>
          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IProduct, ItemsList } from '~/types/myStore';

const props = defineProps({
  items: {
    type: Object as () => ItemsList<IProduct>,
    required: false,
    default: () => ({ count: 0, next: null, previous: null, results: [] }),
  },
  currentPage: {
    type: Number,
    required: true,
  },
  limitPage: {
    type: Number,
    default: 5,
  }
});

const emit = defineEmits(['update:currentPage', 'nextPage', 'prevPage']);

const pageCount = computed(() => {
  const count = Math.ceil(props.items.count / props.limitPage);
  return count > 0 ? count : 1;
});

const startItem = computed(() => {
  return (props.currentPage - 1) * props.limitPage + 1;
});

const endItem = computed(() => {
  return Math.min(props.items.count, props.currentPage * props.limitPage);
});

const changePage = (page: number) => {
  if (page < 1 || page > pageCount.value) return;
  emit('update:currentPage', page);
};

const nextPage = async () => {
  emit('nextPage', props.items.next);
};

const prevPage = async () => {
  emit('prevPage', props.items.previous);
};
</script>
