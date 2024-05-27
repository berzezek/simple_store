// @ts-ignore
import nuxtStorage from 'nuxt-storage';

const updataTokenCookies = (data: {access: string, refresh: string}) => {
  const tokenCookies = useCookie(
    'tokenCookies',
    {
      default: () => {},
      watch: 'shallow'
    }
  );
  tokenCookies.value = [...data];
}

  export const signInApi = async (username: string, password: string) => {
    const config = useRuntimeConfig();
    const baseApiUrl = config.public.baseApiUrl;
    const response = await fetch(`${baseApiUrl}/auth/jwt/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    if (response.ok) {
      const data = await response.json()
      nuxtStorage.localStorage.setData('access', data.access)
      nuxtStorage.localStorage.setData('refresh', data.refresh)
      return response
    } else {
      throw new Error('Invalid credentials')
    }
  }

  export const getUserApi = async () => {
    const config = useRuntimeConfig();
    const baseApiUrl = config.public.baseApiUrl;
    const accessToken = nuxtStorage.localStorage.getData('access')
    if (!accessToken) {
      return navigateTo('/auth/login')
    }
    const response = await fetch(`${baseApiUrl}/auth/users/me/`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log(response)
  }

  export const tokenVerifyApi = async () => {
    const config = useRuntimeConfig();
    const baseApiUrl = config.public.baseApiUrl;
    const accessToken = nuxtStorage.localStorage.getData('access')
    if (!accessToken) {
      return navigateTo('/auth/login')
    }
    const response = await fetch(`${baseApiUrl}/auth/jwt/verify/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ token: accessToken }),
    });
    if (response.ok) {
      return response
    } else {
      throw new Error('Invalid access token')
    }
  }

  export const refreshTokenApi = async () => {
    const config = useRuntimeConfig();
    const baseApiUrl = config.public.baseApiUrl;
    const refreshToken = nuxtStorage.localStorage.getData('refresh')
    if (!refreshToken) {
      return navigateTo('/auth/login')
    }
    const response = await fetch(`${baseApiUrl}/auth/jwt/refresh/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (response.ok) {
      const data = await response.json()
      nuxtStorage.localStorage.setData('access', data.access)
      nuxtStorage.localStorage.setData('refresh', data.refresh)
      return response
    } else {
      throw new Error('Invalid refresh token')
    }
  }