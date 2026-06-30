<script setup>
import { onMounted, ref } from 'vue'
import { useProveedoresStore } from '@/stores/proveedores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const store = useProveedoresStore()
const router = useRouter()
const proveedorAEliminar = ref(null)

const { proveedores, loading, error } = storeToRefs(store)
const { fetchProveedores } = store

onMounted(() => {
  fetchProveedores()
})

onMounted(() => {
  store.fetchProveedores()
})

function irAEditar(id) {
  router.push(`/proveedores/editar/${id}`)
}

function confirmarEliminar(proveedor) {
  proveedorAEliminar.value = proveedor
}

function cancelar() {
  proveedorAEliminar.value = null
}

async function eliminar() {
  await store.eliminarProveedor(proveedorAEliminar.value.id)
  proveedorAEliminar.value = null
}
</script>

<template>
  <section>
    <h1>Proveedores</h1>
    <router-link :to="{ name: 'ProveedoresCreate' }">Crear Proveedor</router-link>

    <p v-if="loading">Cargando proveedores...</p>

    <p v-if="error">{{ error }}</p>

    <table v-if="!loading && proveedores.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Contacto</th>
          <th>Email</th>
          <th>Telefono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proveedor in proveedores" :key="proveedor.id">
          <td>{{ proveedor.id }}</td>
          <td>{{ proveedor.nombre }}</td>
          <td>{{ proveedor.contacto }}</td>
          <td>{{ proveedor.email }}</td>
          <td>{{ proveedor.telefono }}</td>
          <td class="acciones">
            <button @click="irAEditar(proveedor.id)" class="btn-editar">Editar</button>
            <button @click="confirmarEliminar(proveedor)" class="btn-eliminar">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && !proveedores.length">No hay proveedores cargados.</p>
    <div v-if="proveedorAEliminar" class="overlay">
      <div class="dialogo">
        <p>
          ¿Seguro que querés eliminar <strong>{{ proveedorAEliminar.nombre }}</strong
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
