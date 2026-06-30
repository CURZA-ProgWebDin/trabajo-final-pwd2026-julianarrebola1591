<script setup>
import { ref, onMounted } from 'vue'
import { useCategoriasStore } from '@/stores/categorias'
import { storeToRefs } from 'pinia'
import { instance as axios } from '@/plugins/axios'
import { useRouter } from 'vue-router'

const store = useCategoriasStore()
const router = useRouter()
const categoriaAEliminar = ref(null)

const { categorias, loading, error } = storeToRefs(store)

onMounted(() => {
  store.fetchCategorias()
})

function irAEditar(id) {
  router.push(`/categorias/editar/${id}`)
}

function confirmarEliminar(categoria) {
  categoriaAEliminar.value = categoria
}

function cancelar() {
  categoriaAEliminar.value = null
}

async function eliminar() {
  await store.eliminarCategoria(categoriaAEliminar.value.id)
  categoriaAEliminar.value = null
}
</script>

<template>
  <section>
    <h1>Categorias</h1>
    <router-link :to="{ name: 'CategoriasCreate' }">Crear Categoria</router-link>

    <p v-if="loading">Cargando categorias...</p>
    <p v-if="error">{{ error }}</p>

    <table v-if="!loading && categorias.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>{{ categoria.id }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>{{ categoria.descripcion }}</td>
          <td class="acciones">
            <button @click="irAEditar(categoria.id)" class="btn-editar">Editar</button>
            <button @click="confirmarEliminar(categoria)" class="btn-eliminar">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && !categorias.length">No hay categorias cargadas.</p>

    <div v-if="categoriaAEliminar" class="overlay">
      <div class="dialogo">
        <p>
          ¿Seguro que querés eliminar <strong>{{ categoriaAEliminar.nombre }}</strong
          >?
        </p>
        <div class="dialogo-acciones">
          <button @click="eliminar" class="btn-eliminar">Sí, eliminar</button>
          <button @click="cancelar" class="btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  </section>
</template>
