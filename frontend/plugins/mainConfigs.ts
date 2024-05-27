export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseApiUrl = config.public.baseApiUrl;
  nuxtApp.provide('baseApiUrl', baseApiUrl);
});