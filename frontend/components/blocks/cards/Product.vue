<template>
  <section class="bg-white dark:bg-gray-900 shadow" v-if="localItem.id !== 0">
    <div class="py-8 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
        {{ localItem.title }}
      </h2>
      <p class="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">
        ${{ localItem.get_last_price }}
      </p>
      <dl v-if="localItem.description">
        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
        <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{{ localItem.description }}</dd>
      </dl>
      <dl class="flex items-center space-x-6" v-if="localItem.tags.length">
        <div>
          <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Tags:</dt>
          <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400" v-for="tag in localItem.tags" :key="tag">
            {{ tag }}
          </dd>
        </div>
      </dl>
    </div>
    <div class="flex items-end space-x-4 ms-8 mb-2">
      <button type="button" @click="deleteProduct(localItem.id)"
        class="mb-6 text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
        <svg class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"></path>
        </svg>
        Delete
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '~/stores/product';

const config = useRuntimeConfig();
const limitPage = parseInt(config.public.limitPage);
const baseApiUrl = config.public.baseApiUrl;
const productStore = useProductStore();
const { getProducts, removeProduct } = productStore;
const { products } = storeToRefs(productStore);

import type { IProduct } from '~/types/myStore';

const props = defineProps({
  item: {
    type: Object as PropType<IProduct>,
    required: true,
    default: () => ({ id: 0, title: '', description: '', get_last_price: 0, tags: [] }),
  }
});

const localItem = ref({ ...props.item });

watch(() => props.item, (newValue) => {
  localItem.value = { ...newValue };
});

const deleteProduct = async (id: number | string) => {
  await removeProduct(id, baseApiUrl);
  await getProducts(`${baseApiUrl}/api/v1/product/?limit=${limitPage}&offset=0&ordering=title`);
  localItem.value = { id: 0, title: '', description: '', get_last_price: 0, tags: [] }; // Reset local item
};

onMounted(() => {
  localItem.value = { ...props.item };
});

</script>