import ProductosService from '@/service/ProductosService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductosStore = defineStore('productos', () => {
  const productos = ref([])
  const loading = ref(false)
  const error = ref('')

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

  return {
    productos,
    loading,
    error,
    fetchProductos,
  }
})
