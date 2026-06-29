<script setup>
import { reactive, ref } from 'vue'
import { useCategoriasStore } from '@/stores/categorias'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const CategoriasStore = useCategoriasStore()

const mensaje = ref('')

const categoria = reactive({
  nombre: '',
  descripcion: '',
})

async function guardarCategoria() {
  if (!categoria.nombre) {
    mensaje.value = 'Debe ingresar un nombre'
    return
  }
  if (!categoria.descripcion) {
    mensaje.value = 'Se debe ingresar una descripcion'
    return
  }

  const ok = await CategoriasStore.crearCategoria(categoria)

  if (ok) {
    mensaje.value = 'Categoria creada correctamente'
    router.push({ name: 'Categorias' })
  } else {
    mensaje.value = CategoriasStore.error
  }
}
</script>

<template>
  <section class="container">
    <h1>Nueva Categoria</h1>

    <form class="form" @submit.prevent="guardarCategoria">
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" v-model="categoria.nombre" required />
      </div>

      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="categoria.descripcion" />
      </div>

      <button class="btn btn-primary" type="submit">Guardar Categoria</button>

      <p v-if="mensaje">{{ mensaje }}</p>
    </form>
  </section>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
