import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IOrder, ItemsList } from '~/types/myStore';


export const useOrderStore = defineStore('order', () => {
  const orders = ref<ItemsList<IOrder>>();
  const order = ref<IOrder>();

  const getOrders = async (url: string) => {
    try {
      const data = await $fetch<ItemsList<IOrder>>(url, {
        method: 'GET',
      });
      if (data) {
        orders.value = data;
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  const setOrder = async (order: IOrder, baseApiUrl: string) => {
    try {
      const data = await $fetch<IOrder>(`${baseApiUrl}/api/v1/order/`, {
        method: 'POST',
        body: JSON.stringify(order),
      });
    } catch (error) {
      console.error('Failed to set order', error);
    }
  };

  const getOrder = async (id: number | string, baseApiUrl: string) => {
    try {
      const data = await $fetch<IOrder>(`${baseApiUrl}/api/v1/order/${id}/`, {
        method: 'GET'
      });
      if (data) {
        order.value = data;
      }
    } catch (error) {
      console.error('Failed to get order', error);
    }
  };

  const patchOrder = async (order: IOrder, baseApiUrl: string) => {
    try {
      await $fetch<IOrder>(`${baseApiUrl}/api/v1/order/${order.id}/`, {
        method: 'PATCH',
        body: JSON.stringify(order),
      });
    } catch (error) {
      console.error('Failed to update order', error);

    }
  };

  const removeOrder = async (id: number | string, baseApiUrl: string) => {
    try {
      await $fetch<IOrder>(`${baseApiUrl}/api/v1/order/${id}/`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to remove order', error);
    }
  };


  return {
    order,
    orders,
    getOrders,
    setOrder,
    getOrder,
    patchOrder,
    removeOrder,
  };
});
