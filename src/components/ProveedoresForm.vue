<script setup>
import { reactive, ref } from 'vue'
import { useProveedoresStore } from '@/stores/proveedores'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const ProveedoresStore = useProveedoresStore()

const mensaje = ref('')

const proveedor = reactive({
  nombre: '',
  contacto: '',
  telefono: '',
  email: '',
})

async function guardarProveedor() {
  if (!proveedor.nombre) {
    mensaje.value = 'Debe ingresar un nombre'
    return
  }

  const ok = await ProveedoresStore.crearProveedor(proveedor)

  if (ok) {
    mensaje.value = 'Proveedor creada correctamente'
    router.push({ name: 'Proveedores' })
  } else {
    mensaje.value = ProveedoresStore.error
  }
}
</script>

<template>
  <section class="container">
    <h1>Nueva Proveedor</h1>

    <form class="form" @submit.prevent="guardarProveedor">
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" v-model="proveedor.nombre" required />
      </div>

      <div class="form-group">
        <label>Contacto</label>
        <textarea v-model="proveedor.contacto" />
      </div>
      <div class="form-group">
        <label>Teléfono</label>
        <input type="text" v-model="proveedor.telefono" required />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" v-model="proveedor.email" required />
      </div>

      <button class="btn btn-guardar" type="submit">Guardar Proveedor</button>

      <p v-if="mensaje">{{ mensaje }}</p>
    </form>
  </section>
</template>

<style scoped></style>
