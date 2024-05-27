// plugins/auth.ts
export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();

  if (process.client) {
    authStore.fetchUser();
  }

  return {
    provide: {
      auth: authStore,
    },
  };
});
