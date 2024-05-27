<template>
  <div>
    <h1>Home Page</h1>
    <p>{{ user }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';

const { $baseApiUrl } = useNuxtApp();
const authStore = useAuthStore();
const { fetchUser } = authStore;
const { user } = storeToRefs(authStore);

onMounted(async () => {
  console.log('Component mounted, fetching user...');
  await fetchUser($baseApiUrl);
});
</script>