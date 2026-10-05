<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findTool, money, state } from '../stores/demo'
import EmptyState from '../components/EmptyState.vue'
import ToolCard from '../components/ToolCard.vue'

const route = useRoute()
const router = useRouter()
const search = ref(String(route.query.q || ''))
const selectedCategory = ref('Todas')
const viewMode = ref('grid')
const categories = ['Todas', ...new Set(state.tools.map(tool => tool.category))]
const filteredTools = computed(() => state.tools.filter(tool => {
  const query = search.value.trim().toLocaleLowerCase('es')
  const matchesText = !query || `${tool.title} ${tool.category} ${tool.location} ${tool.description}`.toLocaleLowerCase('es').includes(query)
  return tool.available && matchesText && (selectedCategory.value === 'Todas' || selectedCategory.value === tool.category)
}))
const featured = computed(() => state.tools.find(tool => tool.featured) || state.tools[0])
function submitSearch() { router.replace({ path: '/', query: search.value ? { q: search.value } : {} }) }
</script>

<template>
  <div class="home-page">
    <section class="welcome-row">
      <div><div class="eyebrow eyebrow-with-dot"><span></span> HECHO PARA TU COMUNIDAD</div><h1>Lo que necesitas,<br class="mobile-break"> <em>cerca de ti.</em></h1><p class="hero-subtitle">Encuentra herramientas de tus vecinos y dale una nueva vida a las que tienes guardadas.</p></div>
      <div class="hero-sticker"><span>↗</span><strong>Compartir<br>nos acerca.</strong></div>
    </section>

    <section class="search-panel">
      <label class="search-field"><span class="search-symbol">⌕</span><input v-model="search" @keyup.enter="submitSearch" placeholder="¿Qué proyecto tienes en mente?" aria-label="Buscar herramientas"><button v-if="search" class="clear-search" @click="search = ''; submitSearch()" aria-label="Limpiar búsqueda">×</button></label>
      <div class="search-location"><span>⌖</span><span>Temuco, Chile</span><span class="location-chevron">⌄</span></div>
      <button class="button button-primary search-submit" @click="submitSearch">Buscar <span>↗</span></button>
    </section>

    <section class="quick-meta"><span><i class="meta-icon green-icon">⌖</i>Herramientas a menos de 3 km</span><span><i class="meta-icon orange-icon">◷</i>Disponibles para esta semana</span><button class="text-button" @click="viewMode = viewMode === 'grid' ? 'map' : 'grid'">{{ viewMode === 'grid' ? 'Ver en mapa ↗' : 'Ver en lista ↗' }}</button></section>

    <section class="featured-banner" v-if="featured">
      <div class="featured-copy"><span class="featured-kicker">UNA BUENA IDEA PARA EMPEZAR</span><h2>Tu próximo proyecto<br>no necesita esperar.</h2><p>Herramientas útiles, compartidas por personas que viven cerca.</p><RouterLink :to="`/herramientas/${featured.id}`" class="button button-light">Descubrir herramientas <span>↗</span></RouterLink></div>
      <div class="banner-art"><div class="sun-disc"></div><div class="banner-tool">{{ featured.icon }}</div><div class="banner-orbit orbit-one"></div><div class="banner-orbit orbit-two"></div><span class="banner-spark spark-one">✳</span><span class="banner-spark spark-two">✦</span><div class="banner-label">BUEN VECINO<br><strong>★★★★★</strong></div></div>
    </section>

    <section class="section-heading tool-section-heading"><div><span class="eyebrow">EL CATÁLOGO LOCAL</span><h2>Explora herramientas <span class="heading-count">{{ filteredTools.length }}</span></h2></div><button class="sort-button">Recomendadas <span>⌄</span></button></section>
    <div class="category-row"><button v-for="category in categories" :key="category" class="category-chip" :class="{ 'category-active': selectedCategory === category }" @click="selectedCategory = category">{{ category === 'Todas' ? '✳  Todas' : category }}</button></div>

    <div v-if="viewMode === 'grid'" class="tool-grid">
      <ToolCard v-for="tool in filteredTools" :key="tool.id" :tool="tool" />
      <EmptyState v-if="!filteredTools.length" title="No encontramos herramientas" description="Prueba con otra búsqueda o categoría." action="Ver todas" />
    </div>
    <div v-else class="map-view">
      <div class="mock-map">
        <div class="map-park park-one"></div><div class="map-park park-two"></div><div class="map-water"></div><div class="map-street street-a"></div><div class="map-street street-b"></div><div class="map-street street-c"></div><div class="map-road road-a"></div><div class="map-road road-b"></div><div class="map-road road-c"></div>
        <span class="map-label label-centro">TEMUCO CENTRO</span><span class="map-label label-alemania">AV. ALEMANIA</span><span class="map-label label-valdivia">PEDRO DE VALDIVIA</span>
        <RouterLink v-for="(tool, index) in filteredTools.slice(0, 5)" :key="tool.id" :to="`/herramientas/${tool.id}`" class="map-pin" :class="`pin-${index + 1}`" :title="tool.title">{{ tool.icon }}</RouterLink>
        <div class="map-legend"><span class="status-dot"></span> {{ filteredTools.length }} herramientas cerca</div>
      </div>
      <div class="map-list"><ToolCard v-for="tool in filteredTools.slice(0, 3)" :key="tool.id" :tool="tool" /></div>
    </div>
    <section class="home-bottom-note"><span class="note-star">✳</span><p>¿Tienes una herramienta sin usar? <RouterLink to="/publicar">Compártela con tu comunidad.</RouterLink></p></section>
  </div>
</template>
