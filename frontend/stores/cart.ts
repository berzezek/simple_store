import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ICart, ItemsList } from '~/types/myStore';


export const useCartStore = defineStore('cart', () => {
  const carts = ref<ItemsList<ICart>>();
  const cart = ref<ICart>();

  const getCarts = async (url: string) => {
    try {
      const data = await $fetch<ItemsList<ICart>>(url, {
        method: 'GET',
      });
      if (data) {
        carts.value = data;
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const setCart = async (cart: ICart, baseApiUrl: string) => {
    try {
      const data = await $fetch<ICart>(`${baseApiUrl}/api/v1/cart/`, {
        method: 'POST',
        body: JSON.stringify(cart),
      });
    } catch (error) {
      console.error('Failed to set cart', error);
    }
  };

  const getCart = async (id: number | string, baseApiUrl: string) => {
    try {
      const data = await $fetch<ICart>(`${baseApiUrl}/api/v1/cart/${id}/`, {
        method: 'GET'
      });
      if (data) {
        cart.value = data;
      }
    } catch (error) {
      console.error('Failed to get cart', error);
    }
  };

  const patchCart = async (cart: ICart, baseApiUrl: string) => {
    try {
      await $fetch<ICart>(`${baseApiUrl}/api/v1/cart/${cart.id}/`, {
        method: 'PATCH',
        body: JSON.stringify(cart),
      });
    } catch (error) {
      console.error('Failed to update cart', error);

    }
  };

  const removeCart = async (id: number | string, baseApiUrl: string) => {
    try {
      await $fetch<ICart>(`${baseApiUrl}/api/v1/cart/${id}/`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to remove cart', error);
    }
  };


  return {
    cart,
    carts,
    getCarts,
    setCart,
    getCart,
    patchCart,
    removeCart,
  };
});
