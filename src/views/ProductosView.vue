<script setup>
import { onMounted, ref } from 'vue'
import { useProductosStore } from '@/stores/productos'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const productosStore = useProductosStore()
const router = useRouter()
const productoAEliminar = ref(null)

const { productos, loading, error } = storeToRefs(productosStore)
const { fetchProductos } = productosStore

onMounted(() => {
  fetchProductos()
})

function irAEditar(id) {
  router.push(`/productos/editar/${id}`)
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
    <h1>Productos</h1>
    <router-link :to="{ name: 'ProductosCreate' }">Crear Producto</router-link>

    <p v-if="loading">Cargando productos...</p>

    <p v-if="error">{{ error }}</p>

    <table v-if="!loading && productos.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Precio de compra</th>
          <th>Precio de venta</th>
          <th>Proveedor</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.categoria_id.nombre }}</td>
          <td>{{ producto.precio_costo }}</td>
          <td>{{ producto.precio_venta }}</td>
          <td>{{ producto.proveedor_id.nombre }}</td>
          <td>{{ producto.stock_actual }}</td>
          <td class="acciones">
            <button @click="irAEditar(producto.id)" class="btn-editar">Editar</button>
            <button @click="confirmarEliminar(producto)" class="btn-eliminar">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && !productos.length">No hay productos cargados.</p>

    <div v-if="productoAEliminar" class="overlay">
      <div class="dialogo">
        <p>
          ¿Seguro que querés eliminar <strong>{{ productoAEliminar.nombre }}</strong
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
