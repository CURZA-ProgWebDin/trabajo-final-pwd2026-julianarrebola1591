<template>
  <section class="container">
    <h1>Editar Producto</h1>

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

      <div class="form-acciones">
        <button class="btn btn-guardar" type="submit">Guardar Producto</button>

        <button class="btn btn-cancelar" type="button" @click="volver">Cancelar</button>
      </div>

      <p v-if="mensaje">{{ mensaje }}</p>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import { useProductosStore } from '@/stores/productos'
import { useCategoriasStore } from '@/stores/categorias'
import { useProveedoresStore } from '@/stores/proveedores'

const route = useRoute()
const router = useRouter()

const productosStore = useProductosStore()
const categoriasStore = useCategoriasStore()
const proveedoresStore = useProveedoresStore()

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
  await productosStore.fetchProductos()

  const productoEncontrado = productosStore.productos.find((p) => p.id === Number(route.params.id))

  if (productoEncontrado) {
    producto.nombre = productoEncontrado.nombre
    producto.descripcion = productoEncontrado.descripcion
    producto.precio_costo = productoEncontrado.precio_costo
    producto.precio_venta = productoEncontrado.precio_venta
    producto.stock_actual = productoEncontrado.stock_actual
    producto.stock_minimo = productoEncontrado.stock_minimo
    producto.categoria_id = productoEncontrado.categoria_id.id
    producto.proveedor_id = productoEncontrado.proveedor_id.id
  }
})

function volver() {
  router.push({ name: 'Productos' })
}

async function guardarProducto() {
  if (!producto.nombre) {
    mensaje.value = 'Debe ingresar un nombre'
    return
  }

  console.log('Producto enviado al backend:', JSON.parse(JSON.stringify(producto)))

  const ok = await productosStore.editarProducto(route.params.id, producto)

  if (ok) {
    mensaje.value = 'Producto editado correctamente'
    router.push({ name: 'Productos' })
  } else {
    mensaje.value = productosStore.error
  }
}
</script>
