<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div class="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64">Today cards count
      </div>
      <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64">Total product
        count
      </div>
      <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64">Today cash</div>
      <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64">Total debit</div>
    </div>
    <div>
      <blocks-tables-product-list @show-action="showAction" />
    </div>
    <div class="grid grid-cols-2 gap-4 my-4">
      <div>
        <blocks-forms-create-product :item="product" />
      </div>
      <div>
        <blocks-cards-product :item="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia';
import { useProductStore } from '~/stores/product';

const productStore = useProductStore();
const { getProduct } = productStore;
const { product } = storeToRefs(productStore);

const showAction = async (id: number | string, baseApiUrl: string) => {
  await getProduct(id, baseApiUrl);
};

</script>
