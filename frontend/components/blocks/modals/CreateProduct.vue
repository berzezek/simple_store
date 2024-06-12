<template>
  <div v-if="showForm"
    class="overflow-y-auto fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <!-- Modal header -->
        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Add Product
          </h3>
          <button type="button" @click="closeModal"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
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
          <button type="submit"
            class="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {{ props.buttonTitle }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { IProduct } from '~/types/myStore';

const emit = defineEmits(['sendForm', 'closeModal']);

const props = defineProps({
  showForm: {
    type: Boolean,
    required: false,
    default: false,
  },
  item: {
    type: Object as () => IProduct,
    required: false,
    default: () => ({ id: null, title: '', description: '', tags: [] }),
  },
  buttonTitle: {
    type: String,
    required: false,
    default: 'Add Product',
  },
});

const localItem = ref({ ...props.item });

watch(props, (newProps) => {
  localItem.value = { ...newProps.item };
});

const sendForm = () => {
  if (!localItem.value.id) {
    emit('sendForm', 'create', { ...localItem.value });
  } else {
    emit('sendForm', 'update', { ...localItem.value });
  }
  closeModal();
}

const closeModal = () => {
  emit('closeModal');
}

</script>
