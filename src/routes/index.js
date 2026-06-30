import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import authRoutes from './auth_routes.js'

const routes = [
  ...authRoutes,

  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import('../views/ProductosView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/productos/crear',
    name: 'ProductosCreate',
    component: () => import('../views/ProductosCreate.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import('../views/CategoriasView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/categorias/crear',
    name: 'CategoriasCreate',
    component: () => import('../views/CategoriasCreate.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/categorias/editar/:id',
    name: 'CategoriasEditar',
    component: () => import('../views/CategoriasEditar.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/proveedores',
    name: 'Proveedores',
    component: () => import('../views/ProveedoresView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/proveedores/crear',
    name: 'ProveedoresCreate',
    component: () => import('../views/ProveedoresCreate.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/proveedores/editar/:id',
    name: 'ProveedoresEditar',
    component: () => import('../views/ProveedoresEditar.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.jwt) {
    return { name: 'Login' }
  }

  if (to.name === 'Login' && authStore.authenticated) {
    return { name: 'Home' }
  }
})

export default router
