<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const AuthStore = useAuthStore()
const { login } = AuthStore
const { authenticated } = storeToRefs(AuthStore)

const error = ref('')

const user = reactive({
  nombre: '',
  password: '',
})

async function submit() {
  if (!user.password && !user.nombre) {
    error.value = 'Usuario o contraseña deben ser ingresados'
    return
  }

  await login(user)
  if (AuthStore.jwt) {
    router.push({ name: 'Home' })
  }
}
</script>

<template>
  <section>
    <h1>Ingreso</h1>
    <form @submit.prevent="submit">
      <input type="text" v-model="user.nombre" placeholder="Usuario" />
      <input type="password" v-model="user.password" placeholder="Contraseña" />
      <button @submit.prevent="submit">ingresar</button>

      <p v-if="error">{{ error }}</p>
    </form>
  </section>
</template>

<style scoped></style>
