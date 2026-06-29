<script setup>
import CategoriasForm from '@/components/CategoriasForm.vue'
</script>

<template>
  <h1>Crear nueva categoria</h1>
  <CategoriasForm />
  <router-link :to="{ name: 'Categorias' }">Volver</router-link>
</template>
