<script setup>
import { ref } from 'vue'
defineProps({ tool: { type: Object, required: true } })
const favorite = ref(false)
</script>
<template>
  <RouterLink :to="`/herramientas/${tool.id}`" class="tool-card">
    <div class="tool-art" :class="`art-${tool.color || 'peach'}`">
      <span class="tool-icon">{{ tool.icon }}</span>
      <span v-if="tool.featured" class="featured-tag">DESTACADA</span>
      <span class="favorite-button" aria-label="Guardar en favoritos" @click.prevent>♡</span>
    </div>
    <div class="tool-card-body">
      <div class="tool-card-top"><span class="eyebrow">{{ tool.category }}</span><span class="rating">★ {{ tool.rating }}</span></div>
      <h3>{{ tool.title }}</h3>
      <div class="tool-owner"><span class="owner-avatar">{{ tool.owner.split(' ').map(x => x[0]).slice(0,2).join('') }}</span><span>{{ tool.owner }}</span><span class="owner-dot">·</span><span>{{ tool.distance }}</span></div>
      <div class="tool-card-footer"><strong>${{ Number(tool.price).toLocaleString('es-CL') }} <small>/ {{ tool.unit || 'día' }}</small></strong><span class="arrow-link">↗</span></div>
    </div>
  </RouterLink>
</template>
