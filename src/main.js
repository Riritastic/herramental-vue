import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import ToolView from './views/ToolView.vue'
import RequestView from './views/RequestView.vue'
import PublishView from './views/PublishView.vue'
import RequestsView from './views/RequestsView.vue'
import LoansView from './views/LoansView.vue'
import HistoryView from './views/HistoryView.vue'
import IncidentsView from './views/IncidentsView.vue'
import ProfileView from './views/ProfileView.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Explorar herramientas' } },
    { path: '/herramientas/:id', name: 'tool', component: ToolView, meta: { title: 'Detalle de herramienta' } },
    { path: '/solicitar/:id', name: 'request', component: RequestView, meta: { title: 'Solicitar préstamo' } },
    { path: '/publicar', name: 'publish', component: PublishView, meta: { title: 'Publicar herramienta' } },
    { path: '/solicitudes', name: 'requests', component: RequestsView, meta: { title: 'Solicitudes' } },
    { path: '/prestamos', name: 'loans', component: LoansView, meta: { title: 'Préstamos activos' } },
    { path: '/historial', name: 'history', component: HistoryView, meta: { title: 'Historial' } },
    { path: '/incidentes', name: 'incidents', component: IncidentsView, meta: { title: 'Incidentes' } },
    { path: '/perfil', name: 'profile', component: ProfileView, meta: { title: 'Mi perfil' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() { return { top: 0 } },
})

createApp(App).use(router).mount('#app')
