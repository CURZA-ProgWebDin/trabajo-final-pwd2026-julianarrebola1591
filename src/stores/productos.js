import ProductosService from '@/service/ProductosService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductosStore = defineStore('productos', () => {
  const productos = ref([])
  const loading = ref(false)
  const error = ref('')

  const service = ProductosService

  async function fetchProductos() {
    loading.value = true
    error.value = ''

    try {
      productos.value = await ProductosService.getAll()
    } catch (e) {
      productos.value = []
      error.value = 'No se pudieron cargar los productos'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function crearProducto(producto) {
    loading.value = true
    error.value = ''

    try {
      await service.create(producto)
      await fetchProductos()
      return true
    } catch (e) {
      producto.value = []
      error.value = 'No se pudo cargar el nuevo producto'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function editarProducto(id, productos) {
    loading.value = true
    error.value = ''

    try {
      await service.update(id, productos)
      await fetchProductos()
      return true
    } catch (e) {
      error.value = 'No se pudo editar la productos'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function eliminarProducto(id) {
    loading.value = true
    error.value = ''

    try {
      await service.delete(id)
      await fetchProductoes()
      return true
    } catch (e) {
      error.value = 'No se pudo eliminar la producto'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    productos,
    loading,
    error,
    fetchProductos,
    crearProducto,
    editarProducto,
    eliminarProducto,
  }
})
