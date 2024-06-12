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
          <div
            class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button type="button" @click="showForm = !showForm"
              class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              Add product
            </button>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">Title</th>
                <th scope="col" class="px-4 py-3">Price</th>
                <th scope="col" class="px-4 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="showProduct">
                <blocks-cards-product :item="product" />
              </tr>
              <tr class="border-b dark:border-gray-700" v-for="product in products?.results" :key="product.id">
                <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
                  product.title }}
                </th>
                <td class="px-4 py-3">{{ product.get_last_price }}</td>
                <td class="px-4 py-3 flex items-center">

                  <p class="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    @click="productDetail(product.id)"><svg class="w-[16px] h-[16px] text-gray-400 dark:text-white"
                      aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                      viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                    </svg>
                  </p>
                  <p class="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ms-2"
                    @click="updateProduct(product.id)">
                    <svg class="w-[16px] h-[16px] text-gray-400 dark:text-blue" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M15.514 3.293a1 1 0 0 0-1.415 0L12.151 5.24a.93.93 0 0 1 .056.052l6.5 6.5a.97.97 0 0 1 .052.056L20.707 9.9a1 1 0 0 0 0-1.415l-5.193-5.193ZM7.004 8.27l3.892-1.46 6.293 6.293-1.46 3.893a1 1 0 0 1-.603.591l-9.494 3.355a1 1 0 0 1-.98-.18l6.452-6.453a1 1 0 0 0-1.414-1.414l-6.453 6.452a1 1 0 0 1-.18-.98l3.355-9.494a1 1 0 0 1 .591-.603Z"
                        clip-rule="evenodd" />
                    </svg>
                  </p>
                  <p class="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ms-2"
                    @click="deleteProduct(product.id)">
                    <svg class="w-[16px] h-[16px] text-gray-400 dark:text-warning" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                  </p>
                </td>
              </tr>

            </tbody>
          </table>
          <blocks-modals-create-product @sendForm="sendForm" :showForm="showForm" @closeModal="closeModal"
            :item="product" :buttonTitle="buttonTitle" />
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
import type { IProduct } from '~/types/myStore';

const { $baseApiUrl } = useNuxtApp();
const baseApiUrl = $baseApiUrl as string;
const myStore = useMyStore();
const { getProducts, setProduct, getProduct, patchProduct, removeProduct } = myStore;
const { products, product } = storeToRefs(myStore);

const currentPage = ref(1);
const limitPage = ref(3);
const showProduct = ref(false);
const searchTitle = ref('');
const showForm = ref(false);
const buttonTitle = ref('Add Product');


const sendForm = async (action: string, product: IProduct) => {
  if (action === 'create') {
    await setProduct(product, baseApiUrl);
  } else {
    await patchProduct(product, baseApiUrl);
  };
  await getProducts(`${baseApiUrl}/api/v1/product/?limit=${limitPage.value}&offset=0&ordering=title`);
}

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

const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const productDropdowns = ref<{ [key: string]: boolean }>({});
const toggleProductDropdown = (productId: number | string) => {
  productDropdowns.value[productId] = !productDropdowns.value[productId];
};
const isProductDropdownOpen = (productId: number | string) => {
  return productDropdowns.value[productId];
};

const productDetail = async (productId: number | string) => {
  await getProduct(productId, baseApiUrl);
  showProduct.value = !showProduct.value;
};

const deleteProduct = async (productId: number | string) => {
  await removeProduct(productId, baseApiUrl);
  await getProducts(`${$baseApiUrl}/api/v1/product/?limit=${limitPage.value}&offset=0&ordering=title`);
};

const updateProduct = async (productId: number | string) => {
  await getProduct(productId, baseApiUrl);
  buttonTitle.value = 'Update Product';
  showForm.value = !showForm.value;
};

const nextPage = async (url: string) => {
  await getProducts(`${url}&title=${searchTitle.value}`);
};

const prevPage = async (url: string) => {
  await getProducts(`${url}&title=${searchTitle.value}`);
};

const closeModal = () => {
  showForm.value = !showForm.value;
};
</script>
