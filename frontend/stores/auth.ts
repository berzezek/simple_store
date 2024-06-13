import { defineStore } from 'pinia';
import { useCookie } from '#app';
import { ref } from 'vue';
import type { IUser } from '~/types/myStore';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null);
  const accessToken = useCookie<string | null>('access_token');
  const refreshToken = useCookie<string | null>('refresh_token');

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access;
    refreshToken.value = refresh;
  };

  const clearTokens = () => {
    accessToken.value = null;
    refreshToken.value = null;
  };

  const login = async (username: string, password: string, baseApiUrl: string) => {
    try {
      console.log('Login', username, password);
      const { data } = await useFetch<{ access: string, refresh: string }>(`${baseApiUrl}/auth/jwt/create/`, {
        method: 'POST',
        body: { username, password },
      });
      if (data.value) {
        console.log('Login success', data.value);
        setTokens(data.value.access, data.value.refresh);
        await fetchUser(baseApiUrl);
      } else {
        navigateTo('/auth/login');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    clearTokens();
    user.value = null;
  };

  const fetchUser = async (baseApiUrl: string) => {
    if (!accessToken.value) return;
    try {
      const { data } = await useFetch<IUser>(`${baseApiUrl}/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });
      user.value = data.value;
    } catch (error) {
      console.error('Fetch user failed', error);
      logout();
    }
  };

  return {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    fetchUser,
    setTokens,
    clearTokens,
  };
});
