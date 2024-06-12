<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto">
      <!-- Start coding here -->
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full md:w-1/2">
            <form class="flex items-center" @submit.prevent="searchProduct">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <input type="text" id="simple-search" v-model="searchTitle"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search">
              </div>
            </form>
          </div>
        </div>
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
              <tr class="border-b dark:border-gray-700" v-for="product in products?.results" :key="product.id">
                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ product.title }}
                </th>
                <td class="px-4 py-3">
                  <input type="number" v-model.number="product.qty" @input="updateTotal(product)" min="0"
                    class="w-16 p-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </td>
                <td class="px-4 py-3">{{ product.get_last_price }}</td>
                <td class="px-4 py-3">{{ isNaN(product.qty * product.get_last_price) ? 0 : product.qty * product.get_last_price }}</td>

              </tr>
            </tbody>
          </table>
        </div>
        <blocks-tables-pagination :items="products" :currentPage="currentPage" @update:currentPage="updatePage"
          @nextPage="nextPage" @prevPage="prevPage" :limitPage="limitPage" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMyStore } from '~/stores/myStore';
import type { IProductBilling, ItemsList } from '~/types/myStore';

const { $baseApiUrl } = useNuxtApp();
const baseApiUrl = $baseApiUrl as string;
const myStore = useMyStore();
const { getProducts } = myStore;
const { products } = storeToRefs(myStore);

const currentPage = ref(1);
const limitPage = ref(3);
const searchTitle = ref('');

onMounted(async () => {
  await getProducts(`${baseApiUrl}/api/v1/product/?limit=${limitPage.value}&offset=0&ordering=title`);
});

const updatePage = async (page: number) => {
  currentPage.value = page;
  await getProducts(`${baseApiUrl}/api/v1/product/?limit=${limitPage.value}&offset=${(page - 1) * limitPage.value}&ordering=title`);
};

const searchProduct = async (event: any) => {
  event.preventDefault();
  const search = event.target.elements['simple-search'].value;
  await getProducts(`${baseApiUrl}/api/v1/product/?limit=${limitPage.value}&offset=0&title=${search}`);
};

const nextPage = async (url: string) => {
  await getProducts(`${url}&title=${searchTitle.value}`);
};

const prevPage = async (url: string) => {
  await getProducts(`${url}&title=${searchTitle.value}`);
};

const updateTotal = (product: IProductBilling) => {
  product.total = product.qty * product.get_last_price;
};
</script>
