import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const instance = axios.create({
  baseURL: 'http://127.0.0.1:5001',
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.jwt) {
    config.headers.Authorization = `Bearer ${authStore.jwt}`
  }

  return config
})
