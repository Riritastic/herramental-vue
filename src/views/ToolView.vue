<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { activePersona, findTool, money } from '../stores/demo'
const route = useRoute()
const tool = computed(() => findTool(route.params.id))
const canRequest = computed(() => Boolean(tool.value && tool.value.ownerId !== activePersona.value.id && activePersona.value.id !== 'admin'))
</script>
<template>
  <div v-if="tool" class="detail-page">
    <RouterLink to="/" class="back-link">← Volver a explorar</RouterLink>
    <div class="detail-layout">
      <section class="detail-main">
        <div class="detail-art" :class="`art-${tool.color}`"><span>{{ tool.icon }}</span><small>HERRAMIENTA COMPARTIDA</small><button class="favorite-button">♡</button></div>
        <div class="detail-title-row"><div><div class="eyebrow">{{ tool.category }} <span class="dot-separator">·</span> {{ tool.condition }}</div><h1>{{ tool.title }}</h1><div class="rating-line"><span>★ {{ tool.rating }}</span><span>{{ tool.reviews }} reseñas de la comunidad</span><span>· {{ tool.distance }}</span></div></div></div>
        <section class="detail-section"><h2>Sobre esta herramienta</h2><p>{{ tool.description }}</p></section>
        <section class="detail-section detail-owner"><h2>La comparte</h2><div class="owner-profile"><span class="avatar avatar-coral">{{ tool.owner.split(' ').map(x => x[0]).slice(0,2).join('') }}</span><div><strong>{{ tool.owner }}</strong><small>Miembro de la comunidad · {{ tool.location }}</small></div><span class="owner-rating">★ {{ tool.rating }}</span></div></section>
        <section class="detail-section pickup-info"><h2>Entrega y cuidado</h2><div class="info-row"><span>⌖</span><div><strong>Punto de encuentro</strong><small>{{ tool.location }}, Temuco</small></div></div><div class="info-row"><span>♡</span><div><strong>Cuídala como si fuera tuya</strong><small>Acuerda el estado de la herramienta antes de usarla.</small></div></div></section>
      </section>
      <aside class="booking-card"><span class="availability-label"><i></i> Disponible para solicitar</span><div class="booking-price"><strong>{{ money(tool.price) }}</strong><span>/ {{ tool.unit || 'día' }}</span></div><p>El costo total depende de los días y las condiciones acordadas.</p><RouterLink :to="`/solicitar/${tool.id}`" class="button button-primary button-full">Solicitar herramienta <span>↗</span></RouterLink><div class="booking-assurance"><span>◇</span> Sin cobros sorpresa: revisa las condiciones antes de confirmar.</div><div class="booking-details"><div><span>Disponibilidad</span><strong>Coordinar con {{ tool.owner.split(' ')[0] }}</strong></div><div><span>Ubicación</span><strong>{{ tool.location }}</strong></div><div><span>Estado</span><strong>{{ tool.condition }}</strong></div></div></aside>
    </div>
  </div>
  <div v-else class="page-container"><div class="page-title-block"><span class="eyebrow">NO DISPONIBLE</span><h1>Esta herramienta no está en el catálogo.</h1><RouterLink to="/" class="button button-primary">Volver a explorar</RouterLink></div></div>
</template>
