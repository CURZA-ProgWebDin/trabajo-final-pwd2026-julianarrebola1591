<script setup>
import ProductosForm from '@/components/ProductosForm.vue'
</script>

<template>
  <h1>Crear nuevo producto</h1>
  <ProductosForm />
  <router-link :to="{ name: 'Productos' }">Volver</router-link>
</template>
