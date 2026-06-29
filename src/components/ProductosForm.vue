<script setup>
import { reactive, onMounted } from 'vue'

const producto = reactive({
  nombre: '',
  descripcion: '',
  precio_costo: '',
  precio_venta: '',
  stock_actual: '',
  stock_minimo: '',
  producto_id: '',
  proveedor_id: '',
})

/* VA A BUSCAR LAS CATEGORIAS QUE TODAVIA NO ESTÁN EN EL STORE
const productosStore = useProductosStore()
const { productos } = storeToRefs(productosStore)

onMounted(() => productosStore.fetchProductos())
*/

function guardarProducto() {
  console.log(producto)
}
</script>

<template>
  <section class="container">
    <h1>Nuevo Producto</h1>

    <form @submit.prevent="guardarProducto">
      <div>
        <label>Nombre</label>
        <input type="text" v-model="producto.nombre" required />
      </div>

      <div>
        <label>Descripción</label>
        <textarea v-model="producto.descripcion" />
      </div>

      <div>
        <label>Precio de costo</label>
        <input type="number" step="0.01" v-model="producto.precio_costo" required />
      </div>

      <div>
        <label>Precio de venta</label>
        <input type="number" step="0.01" v-model="producto.precio_venta" required />
      </div>

      <div>
        <label>Stock actual</label>
        <input type="number" v-model="producto.stock_actual" required />
      </div>

      <div>
        <label>Stock mínimo</label>
        <input type="number" v-model="producto.stock_minimo" required />
      </div>

      <div>
        <label>Producto</label>

        <select v-model="producto.producto_id">
          <option value="">Seleccione un Producto</option>

          <option v-for="producto in productos" :key="producto.id" :value="producto.id">
            {{ producto.nombre }}
          </option>
        </select>
      </div>

      <div>
        <label>Proveedor</label>

        <select v-model="producto.proveedor_id">
          <option value="">Seleccione un proveedor</option>

          <option v-for="proveedor in proveedores" :key="proveedor.id" :value="proveedor.id">
            {{ proveedor.nombre }}
          </option>
        </select>
      </div>

      <button type="submit">Guardar Producto</button>
    </form>
  </section>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

label {
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  cursor: pointer;
}
</style>
