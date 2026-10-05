<script setup>
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { activePersona, personas, state } from './stores/demo'

const route = useRoute()
const accountOpen = ref(false)
const title = computed(() => route.meta.title || 'Herramental')
const primaryLinks = [
  { to: '/', label: 'Explorar', icon: '⌕', exact: true },
  { to: '/solicitudes', label: 'Solicitudes', icon: '▤', badge: computed(() => state.requests.filter(r => r.ownerId === state.personaId && r.status === 'pending').length) },
  { to: '/prestamos', label: 'Mis préstamos', icon: '▧' },
  { to: '/historial', label: 'Historial', icon: '◷' },
]
const supportLinks = [
  { to: '/incidentes', label: 'Incidentes', icon: '◉' },
  { to: '/perfil', label: 'Mi perfil', icon: '◌' },
]
function switchPersona(id) { state.personaId = id; accountOpen.value = false }
</script>

<template>
  <div class="app-frame">
    <aside class="sidebar">
      <RouterLink to="/" class="brand" aria-label="Herramental, inicio">
        <span class="brand-mark"><span></span><span></span><span></span></span>
        <span class="brand-name">herramental<span>.</span></span>
      </RouterLink>
      <div class="community-chip"><span class="status-dot"></span> Comunidad Temuco</div>
      <p class="nav-caption">MENÚ PRINCIPAL</p>
      <nav class="side-nav" aria-label="Navegación principal">
        <RouterLink v-for="link in primaryLinks" :key="link.to" :to="link.to" class="nav-link" :class="{ 'router-link-exact-active': link.exact && route.path === '/' }">
          <span class="nav-icon">{{ link.icon }}</span><span>{{ link.label }}</span>
          <span v-if="link.badge?.value" class="nav-badge">{{ link.badge.value }}</span>
        </RouterLink>
      </nav>
      <RouterLink to="/publicar" class="side-create"><span>＋</span> Publicar herramienta</RouterLink>
      <p class="nav-caption support-caption">TU CUENTA</p>
      <nav class="side-nav" aria-label="Cuenta y soporte">
        <RouterLink v-for="link in supportLinks" :key="link.to" :to="link.to" class="nav-link">
          <span class="nav-icon">{{ link.icon }}</span><span>{{ link.label }}</span>
        </RouterLink>
      </nav>
      <div class="sidebar-bottom">
        <div class="community-card"><div class="community-illustration">⌂</div><strong>Lo que tienes, le sirve a alguien.</strong><p>Comparte herramientas y haz comunidad.</p><RouterLink to="/publicar">Publicar algo <span>↗</span></RouterLink></div>
        <div class="sidebar-version">HERRAMENTAL <span>DEMO · V0.1</span></div>
      </div>
    </aside>

    <div class="main-column">
      <header class="topbar">
        <div class="mobile-brand"><span class="brand-mark"><span></span><span></span><span></span></span><span>herramental<span class="brand-period">.</span></span></div>
        <div class="breadcrumb"><span>Temuco</span><span class="crumb-divider">/</span><strong>{{ title }}</strong></div>
        <div class="topbar-actions">
          <span class="demo-indicator"><span></span> Entorno de demostración</span>
          <div class="account-wrap">
            <button class="account-button" @click="accountOpen = !accountOpen" :aria-expanded="accountOpen">
              <span class="avatar" :class="activePersona.color">{{ activePersona.initials }}</span>
              <span class="account-copy"><strong>{{ activePersona.name }}</strong><small>{{ activePersona.role }}</small></span>
              <span class="chevron">⌄</span>
            </button>
            <div v-if="accountOpen" class="account-menu">
              <small class="menu-label">CAMBIAR PERFIL DE DEMO</small>
              <button v-for="persona in personas" :key="persona.id" class="persona-option" @click="switchPersona(persona.id)">
                <span class="avatar avatar-small" :class="persona.color">{{ persona.initials }}</span><span><strong>{{ persona.name }}</strong><small>{{ persona.role }}</small></span><span v-if="state.personaId === persona.id" class="check-mark">✓</span>
              </button>
              <p class="menu-note">Los cambios se guardan en este navegador.</p>
            </div>
          </div>
        </div>
      </header>
      <main class="content-area"><RouterView v-slot="{ Component }"><Transition name="page" mode="out-in"><component :is="Component" /></Transition></RouterView></main>
      <footer class="app-footer"><span>Hecho para compartir, cuidar y volver a usar.</span><span>Herramental · Prototipo navegable</span></footer>
    </div>

    <nav class="mobile-nav" aria-label="Navegación móvil">
      <RouterLink to="/" exact-active-class="mobile-active"><span>⌕</span>Explorar</RouterLink>
      <RouterLink to="/solicitudes" active-class="mobile-active"><span>▤</span>Solicitudes</RouterLink>
      <RouterLink to="/publicar" class="mobile-add" aria-label="Publicar herramienta"><span>＋</span></RouterLink>
      <RouterLink to="/prestamos" active-class="mobile-active"><span>▧</span>Préstamos</RouterLink>
      <RouterLink to="/perfil" active-class="mobile-active"><span>◌</span>Perfil</RouterLink>
    </nav>
    <div class="toast-stack" aria-live="polite"><TransitionGroup name="toast"><div v-for="item in state.notifications" :key="item.id" class="toast"><span>✓</span>{{ item.message }}</div></TransitionGroup></div>
  </div>
</template>
