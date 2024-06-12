// stores/myStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useFetch } from '#app';
import type { IProduct, ItemsList, IProductBilling } from '~/types/myStore';


export const useMyStore = defineStore('myStore', () => {
  const products = ref<ItemsList<IProductBilling>>();
  const product = ref<IProduct>();

  const getProducts = async (url: string) => {
    try {
      const data = await $fetch<ItemsList<IProductBilling>>(url, {
        method: 'GET',
      });
      if (data) {
        products.value = data;
      }
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const setProduct = async (product: IProduct, baseApiUrl: string) => {
    try {
      const data = await $fetch<IProduct>(`${baseApiUrl}/api/v1/product/`, {
        method: 'POST',
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.error('Failed to set product', error);
    }
  };

  const getProduct = async (id: number | string, baseApiUrl: string) => {
    try {
      const data = await $fetch<IProduct>(`${baseApiUrl}/api/v1/product/${id}/`, {
        method: 'GET'
      });
      if (data) {
        product.value = data;
      }
    } catch (error) {
      console.error('Failed to get product', error);
    }
  };

  const patchProduct = async (product: IProduct, baseApiUrl: string) => {
    try {
      await $fetch<IProduct>(`${baseApiUrl}/api/v1/product/${product.id}/`, {
        method: 'PATCH',
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  const removeProduct = async (id: number | string, baseApiUrl: string) => {
    try {
      await $fetch<IProduct>(`${baseApiUrl}/api/v1/product/${id}/`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to remove product', error);
    }
  };


  return {
    product,
    products,
    getProducts,
    setProduct,
    getProduct,
    patchProduct,
    removeProduct,
  };
});
