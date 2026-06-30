import CategoriasService from '@/service/CategoriasService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriasStore = defineStore('categorias', () => {
  const categorias = ref([])
  const loading = ref(false)
  const error = ref('')

  const service = CategoriasService

  async function fetchCategorias() {
    loading.value = true
    error.value = ''

    try {
      categorias.value = await service.getAll()
    } catch (e) {
      categorias.value = []
      error.value = 'No se pudieron cargar las categorias'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function crearCategoria(categoria) {
    loading.value = true
    error.value = ''

    try {
      await service.create(categoria)
      await fetchCategorias()
      return true
    } catch (e) {
      categoria.value = []
      error.value = 'No se pudieron cargar las categorias'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function editarCategoria(id, categoria) {
    loading.value = true
    error.value = ''

    try {
      await service.update(id, categoria)
      await fetchCategorias()
      return true
    } catch (e) {
      error.value = 'No se pudo editar la categoria'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function eliminarCategoria(id) {
    loading.value = true
    error.value = ''

    try {
      await service.delete(id)
      await fetchCategorias()
      return true
    } catch (e) {
      error.value = 'No se pudo eliminar la categoria'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    categorias,
    loading,
    error,
    fetchCategorias,
    crearCategoria,
    editarCategoria,
    eliminarCategoria,
  }
})
