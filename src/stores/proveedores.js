import ProveedoresService from '@/service/ProveedoresService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProveedoresStore = defineStore('Proveedores', () => {
  const proveedores = ref([])
  const loading = ref(false)
  const error = ref('')

  const service = ProveedoresService

  async function fetchProveedores() {
    loading.value = true
    error.value = ''

    try {
      proveedores.value = await service.getAll()
    } catch (e) {
      proveedores.value = []
      error.value = 'No se pudieron cargar las proveedores'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function crearProveedor(proveedor) {
    loading.value = true
    error.value = ''

    try {
      await service.create(proveedor)
      await fetchProveedores()
      return true
    } catch (e) {
      proveedor.value = []
      error.value = 'No se pudieron cargar los proveedores'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function editarProveedor(id, proveedores) {
    loading.value = true
    error.value = ''

    try {
      await service.update(id, proveedores)
      await fetchProveedores()
      return true
    } catch (e) {
      error.value = 'No se pudo editar la proveedores'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function eliminarProveedor(id) {
    loading.value = true
    error.value = ''

    try {
      await service.delete(id)
      await fetchProveedores()
      return true
    } catch (e) {
      error.value = 'No se pudo eliminar la proveedor'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return {
    proveedores,
    loading,
    error,
    fetchProveedores,
    crearProveedor,
    editarProveedor,
    eliminarProveedor,
  }
})
