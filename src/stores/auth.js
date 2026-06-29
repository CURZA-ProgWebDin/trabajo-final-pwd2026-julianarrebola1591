import AuthService from '@/service/AuthService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const auth_user = ref(null)
    const authenticated = ref(false)
    const jwt = ref('')
    const rol_user = ref('')

    const service = new AuthService()

    async function login(user) {
      await service.login(user)

      if (service.auth_user) {
        const userLogged = service.auth_user

        auth_user.value = userLogged.nombre
        jwt.value = userLogged.access_token
        authenticated.value = true
        rol_user.value = userLogged.rol

        console.log('Usuario:', auth_user.value)
        console.log('Rol:', rol_user.value)
        console.log('JWT:', jwt.value)
        console.log('Autenticado:', authenticated.value)
      }
    }

    function logout() {
      auth_user.value = null
      jwt.value = ''
      authenticated.value = false
      rol_user.value = ''
    }

    async function register(new_user) {
      await service.register(new_user)
    }

    return {
      auth_user,
      jwt,
      rol_user,
      authenticated,
      login,
      logout,
      register,
    }
  },
  {
    persist: true,
  },
)
