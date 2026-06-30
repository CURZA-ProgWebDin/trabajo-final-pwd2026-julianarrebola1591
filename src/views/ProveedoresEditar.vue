<template>
  <section class="container">
    <div>
      <h2>Editar Proveedor</h2>
      <form class="form" @submit.prevent="guardar">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="form.nombre" type="text" required />

          <label for="contacto">Contacto</label>
          <input id="contacto" v-model="form.contacto" type="text" required />

          <label for="telefono">Telefono</label>
          <input id="telefono" v-model="form.telefono" type="text" />

          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="text" />
        </div>

        <div class="form-acciones">
          <button class="btn-guardar" type="submit">Guardar</button>
          <button class="btn-cancelar" type="submit" @click="volver">Cancelar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useProveedoresStore } from '@/stores/proveedores'

const route = useRoute()
const router = useRouter()
const store = useProveedoresStore()

const form = ref({ nombre: '', contacto: '', telefono: '', email: '' })

onMounted(async () => {
  await store.fetchProveedores()
  const proveedor = store.proveedores.find((c) => c.id === Number(route.params.id))
  if (proveedor) form.value = { ...proveedor }
})

function volver() {
  router.push('/proveedores')
}

async function guardar() {
  const ok = await store.editarProveedor(route.params.id, form.value)
  if (ok) router.push('/proveedores')
}
</script>
