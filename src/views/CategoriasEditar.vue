<template>
  <section class="container">
    <div>
      <h2>Editar Categoría</h2>
      <form class="form" @submit.prevent="guardar">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="form.nombre" type="text" required />

          <label for="descripcion">Descripcion</label>
          <input id="descripcion" v-model="form.descripcion" type="text" required />
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
import { useCategoriasStore } from '@/stores/categorias'

const route = useRoute()
const router = useRouter()
const store = useCategoriasStore()

const form = ref({ nombre: '', descripcion: '' })

onMounted(async () => {
  await store.fetchCategorias()
  const categoria = store.categorias.find((c) => c.id === Number(route.params.id))
  if (categoria) form.value = { ...categoria }
})

function volver() {
  router.push('/categorias')
}

async function guardar() {
  const ok = await store.editarCategoria(route.params.id, form.value)
  if (ok) router.push('/categorias')
}
</script>
