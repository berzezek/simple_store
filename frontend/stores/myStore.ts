// stores/myStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFetch } from '#app';
import type { IProduct } from '~/types/myStore';


export const useMyStore = defineStore('myStore', () => {
  const products = ref<IProduct[]>([]);

  const getProducts = async (url: string) => {
    try {
      const { data } = await useFetch<IProduct[]>(url, {
        method: 'GET',
      });
      if (data.value) {
        products.value = data.value;
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const setProduct = (product: IProduct, baseApiUrl: string) => {
    try {
      const { data } = useFetch<IProduct>(`${baseApiUrl}/api/v1/product/`, {
        method: 'POST',
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.error('Failed to set product', error);
    }
  };


  return {
    products,
    getProducts,
    setProduct,
  };
});
