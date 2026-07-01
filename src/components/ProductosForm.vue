<script setup>
import { reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import { useCategoriasStore } from '@/stores/categorias'
import { useProveedoresStore } from '@/stores/proveedores'
import { useProductosStore } from '@/stores/productos'

const router = useRouter()

const categoriasStore = useCategoriasStore()
const proveedoresStore = useProveedoresStore()
const productosStore = useProductosStore()

const { categorias } = storeToRefs(categoriasStore)
const { proveedores } = storeToRefs(proveedoresStore)

const mensaje = ref('')

const producto = reactive({
  nombre: '',
  descripcion: '',
  precio_costo: '',
  precio_venta: '',
  stock_actual: '',
  stock_minimo: '',
  categoria_id: '',
  proveedor_id: '',
})

onMounted(async () => {
  await categoriasStore.fetchCategorias()
  await proveedoresStore.fetchProveedores()
})

async function guardarProducto() {
  if (!producto.nombre) {
    mensaje.value = 'Debe ingresar un nombre'
    return
  }

  if (!producto.precio_costo || !producto.precio_venta) {
    mensaje.value = 'Debe ingresar los precios'
    return
  }

  if (!producto.categoria_id) {
    mensaje.value = 'Debe ingresar categoria'
    return
  }

  const ok = await productosStore.crearProducto(producto)

  if (ok) {
    mensaje.value = 'Producto creado correctamente'
    router.push({ name: 'Productos' })
  } else {
    mensaje.value = productosStore.error
  }
}
</script>

<template>
  <section class="container">
    <h1>Nuevo Producto</h1>

    <form class="form" @submit.prevent="guardarProducto">
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" v-model="producto.nombre" required />
      </div>

      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="producto.descripcion" />
      </div>

      <div class="form-group">
        <label>Precio de costo</label>
        <input type="number" step="0.01" v-model="producto.precio_costo" required />
      </div>

      <div class="form-group">
        <label>Precio de venta</label>
        <input type="number" step="0.01" v-model="producto.precio_venta" required />
      </div>

      <div class="form-group">
        <label>Stock actual</label>
        <input type="number" v-model="producto.stock_actual" required />
      </div>

      <div class="form-group">
        <label>Stock mínimo</label>
        <input type="number" v-model="producto.stock_minimo" required />
      </div>

      <div class="form-group">
        <label>Categoría</label>
        <select v-model="producto.categoria_id" required>
          <option value="">Seleccione una categoría</option>

          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.nombre }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Proveedor</label>
        <select v-model="producto.proveedor_id" required>
          <option value="">Seleccione un proveedor</option>

          <option v-for="proveedor in proveedores" :key="proveedor.id" :value="proveedor.id">
            {{ proveedor.nombre }}
          </option>
        </select>
      </div>

      <button class="btn btn-guardar" type="submit">Guardar Producto</button>

      <p v-if="mensaje">{{ mensaje }}</p>
    </form>
  </section>
</template>
