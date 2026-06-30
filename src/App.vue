<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()

const { authenticated, auth_user } = storeToRefs(authStore)

function cerrarSesion() {
  authStore.logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <nav>
    <div class="nav-left">
      <router-link to="/">Home</router-link>
      <router-link to="/productos">Productos</router-link>
      <router-link to="/categorias">Categorías</router-link>
      <router-link to="/proveedores">Proveedores</router-link>
    </div>

    <div class="nav-right" v-if="authenticated">
      <span class="usuario"> Bienvenido {{ auth_user }} </span>

      <button class="btn-logout" @click="cerrarSesion">Logout</button>
    </div>
  </nav>

  <router-view />
</template>

<style scope>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1f2937;
  padding: 15px 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 20px;
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover {
  color: #60a5fa;
}

nav a.router-link-active {
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
  padding-bottom: 4px;
}

.nav-left,
.nav-right {
  display: flex;
  align-items: center;
}

.usuario {
  color: white;
  margin-right: 15px;
  font-weight: bold;
}
</style>
