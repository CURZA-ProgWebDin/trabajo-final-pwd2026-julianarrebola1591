<script setup>
import { onMounted } from 'vue'
import { useProductosStore } from '@/stores/productos'
import { storeToRefs } from 'pinia'

const productosStore = useProductosStore()

const { productos, loading, error } = storeToRefs(productosStore)
const { fetchProductos } = productosStore

onMounted(() => {
  fetchProductos()
})
</script>

<template>
  <section>
    <h1>Productos</h1>
    <router-link :to="{ name: 'ProductosCreate' }">Crear Producto</router-link>

    <p v-if="loading">Cargando productos...</p>

    <p v-if="error">{{ error }}</p>

    <ul v-if="!loading && productos.length">
      <li v-for="producto in productos" :key="producto.id">
        {{ producto.nombre }}
      </li>
    </ul>

    <p v-if="!loading && !productos.length">No hay productos cargados.</p>
  </section>
</template>
