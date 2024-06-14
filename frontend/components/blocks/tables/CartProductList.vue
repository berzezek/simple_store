<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">Title</th>
                <th scope="col" class="px-4 py-3">Qty</th>
                <th scope="col" class="px-4 py-3">Price</th>
                <th scope="col" class="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-700" v-for="product in items" :key="product.id">
                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ product.title }}
                </th>
                <td class="px-4 py-3">{{ product.qty }}</td>
                <td class="px-4 py-3">{{ product.get_last_price }}</td>
                <td class="px-4 py-3">{{ product.qty * product.get_last_price }}</td>
              </tr>
            </tbody>
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div
                class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button type="button" @click="addCart"
                  class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                  Add cart
                </button>
              </div>
            </div>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { IProductBilling } from '~/types/myStore';
// @ts-ignore
import nuxtStorage from 'nuxt-storage';

const items = ref<IProductBilling[]>([]);

const loadCart = () => {
  items.value = nuxtStorage.localStorage.getData('cart') || [];
};

onMounted(() => {
  loadCart();
  window.addEventListener('storage', () => {
    loadCart();
  });
});


const addCart = () => {
  console.log('Add cart');
};
</script>
