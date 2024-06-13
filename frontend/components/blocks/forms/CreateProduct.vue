<template>
  <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">

    <form @submit.prevent="sendForm">
      <div class="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input type="text" name="title" id="title" v-model="localItem.title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type product name" required>
        </div>
        <div>
          <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
          <select id="category" multiple v-model="localItem.tags"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option value="foo">foo</option>
            <option value="bar">bar</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <label for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <textarea id="description" rows="4" v-model="localItem.description"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Write product description here"></textarea>
        </div>
      </div>
      <button type="submit" @click="formAction('create')"
        class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">

        Add new product
      </button>
      <button type="submit" @click="formAction('update')"
        class="ms-2 text-white inline-flex items-center bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">

        Update product
      </button>

      <button type="button" @click="clearForm"
        class="ms-2 text-white inline-flex items-center bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">

        Clear form
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product';
import { ref } from 'vue';
import type { IProduct } from '~/types/myStore';



const { $baseApiUrl } = useNuxtApp();
const baseApiUrl = $baseApiUrl as string;
const productStore = useProductStore();
const { setProduct, patchProduct, getProducts, getProduct } = productStore;

const props = defineProps({
  item: {
    type: Object as () => IProduct,
    required: false,
    default: () => ({ title: '', description: '', tags: [] }),
  }
});

const localItem = ref({ ...props.item });
const actionType = ref('')

watch(() => props.item, (newValue) => {
  localItem.value = { ...newValue };
});


const clearForm = () => {
  localItem.value.title = '';
  localItem.value.description = '';
  localItem.value.tags = []
}

const formAction = (action: string) => {
  actionType.value = action
}

const sendForm = async () => {
  if (actionType.value === 'create') {
    const product = await setProduct(localItem.value, baseApiUrl);
    if (product) {
      await getProduct(product.id, baseApiUrl)
    }
  } else {
    const product = await patchProduct(localItem.value, baseApiUrl)
    if (product) {
      await getProduct(product.id, baseApiUrl)
    }
  };
  await getProducts(`${baseApiUrl}/api/v1/product/?limit=3&offset=0&ordering=title`);
  clearForm();
}
</script>