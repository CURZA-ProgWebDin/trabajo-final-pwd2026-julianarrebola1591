<script setup>
import { onMounted } from 'vue'
import { useCategoriasStore } from '@/stores/categorias'
import { storeToRefs } from 'pinia'

const store = useCategoriasStore()

const { categorias, loading, error } = storeToRefs(store)

onMounted(() => {
  store.fetchCategorias()
})
</script>

<template>
  <section>
    <h1>Categorias</h1>
    <router-link :to="{ name: 'CategoriasCreate' }">Crear Categoria</router-link>

    <p v-if="loading">Cargando categorias...</p>

    <p v-if="error">{{ error }}</p>

    <ul v-if="!loading && categorias.length">
      <li v-for="categoria in categorias" :key="categoria.id">
        {{ categoria.nombre }}
      </li>
    </ul>

    <p v-if="!loading && !categorias.length">No hay categorias cargadas.</p>
  </section>

  <router-view></router-view>
</template>
