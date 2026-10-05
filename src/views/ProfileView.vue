<script setup>
import { computed } from 'vue'
import { activePersona, money, resetDemo, state } from '../stores/demo'
import { notify } from '../stores/demo'
const me=activePersona
const myTools=computed(()=>state.tools.filter(t=>t.ownerId===me.value.id))
function restore(){resetDemo();notify('La demo se restauró a sus datos iniciales.')}
</script>
<template>
  <div class="page-container profile-page"><div class="page-title-block"><span class="eyebrow">TU ESPACIO EN LA COMUNIDAD</span><h1>Hola, {{ me.name.split(' ')[0] }}.</h1><p>Tu perfil conecta lo que sabes hacer con lo que tu comunidad necesita.</p></div>
    <div class="profile-layout"><section class="profile-card"><div class="profile-cover"><span>⌂</span><span class="profile-cover-spark">✳</span></div><div class="profile-main"><span class="avatar profile-avatar" :class="me.color">{{ me.initials }}</span><span class="verified-tag">✳ PERFIL DE DEMOSTRACIÓN</span><h2>{{ me.name }}</h2><p>{{ me.role }} · Comunidad Temuco</p><div class="profile-stats"><div><strong>{{ myTools.length }}</strong><span>Herramientas</span></div><div><strong>{{ state.loans.filter(l=>l.borrowerId===me.id||l.ownerId===me.id).length }}</strong><span>Préstamos</span></div><div><strong>4,9</strong><span>Valoración</span></div></div><button class="button button-secondary button-full" @click="notify('La edición de perfil se habilitará en una siguiente iteración.')">Editar perfil <span>↗</span></button></div></section>
      <div class="profile-panels"><section class="settings-card"><div class="settings-heading"><span class="settings-icon">⌖</span><div><strong>Tu comunidad</strong><small>Ubicación de referencia</small></div><button class="text-button" @click="notify('La edición de ubicación se habilitará en una siguiente iteración.')">Editar</button></div><div class="settings-value">Temuco, Región de La Araucanía</div></section><section class="settings-card"><div class="settings-heading"><span class="settings-icon">◇</span><div><strong>Privacidad y confianza</strong><small>Cuida los datos que compartes</small></div></div><ul class="privacy-list"><li><span>✓</span> Solo comparte un punto de encuentro público.</li><li><span>✓</span> Revisa costos y condiciones antes de confirmar.</li><li><span>✓</span> Tus transacciones quedan en tu historial.</li></ul></section><section class="settings-card demo-settings"><div class="settings-heading"><span class="settings-icon">↻</span><div><strong>Prototipo navegable</strong><small>Los datos se guardan en este navegador.</small></div></div><button class="button button-quiet" @click="restore">Restablecer datos de demostración</button></section></div></div>
    <div class="profile-footnote"><span>ℹ</span><p>Esta vista es una simulación de interfaz. No crea cuentas reales ni envía información a un servidor.</p></div>
  </div>
</template>
