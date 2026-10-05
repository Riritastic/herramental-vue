<script setup>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { activePersona, createRequest, findTool, money, notify } from '../stores/demo'
import EmptyState from '../components/EmptyState.vue'
const route = useRoute();const router = useRouter();const tool = computed(() => findTool(route.params.id))
const today = new Date();const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0,10)
const form = reactive({ from: localDate, to: localDate, purpose: '', note: '' })
const days = computed(() => { if (!form.from || !form.to) return 1; return Math.max(1, Math.ceil((new Date(`${form.to}T12:00:00`) - new Date(`${form.from}T12:00:00`)) / 86400000) + 1) })
const total = computed(() => tool.value ? tool.value.price * days.value : 0)
function prettyDate(value) { if (!value) return ''; return new Intl.DateTimeFormat('es-CL',{day:'numeric',month:'short'}).format(new Date(`${value}T12:00:00`)) }
function submit() {
  if (!tool.value || tool.value.ownerId === activePersona.value.id || activePersona.value.id === 'admin' || !form.purpose.trim() || !form.from || !form.to || form.to < form.from) return
  const request = createRequest({ tool: tool.value, from: prettyDate(form.from), to: prettyDate(form.to), purpose: form.purpose.trim(), days: days.value })
  notify('Tu solicitud fue enviada a ' + tool.value.owner.split(' ')[0] + '.')
  router.push({ name: 'requests', query: { sent: request.id } })
}
</script>
<template>
  <div v-if="tool" class="page-container request-page">
    <RouterLink :to="`/herramientas/${tool.id}`" class="back-link">← Volver al detalle</RouterLink>
    <div class="page-title-block"><span class="eyebrow">CU-04 · SOLICITAR PRÉSTAMO</span><h1>Cuéntale a {{ tool.owner.split(' ')[0] }}<br><em>qué necesitas.</em></h1><p>Una solicitud clara ayuda a que ambos sepan qué esperar.</p></div>
    <div class="request-layout">
      <form class="form-card" @submit.prevent="submit">
        <div class="form-section-title"><span class="step-number">1</span><div><strong>¿Cuándo la necesitas?</strong><small>Coordinarán la entrega directamente.</small></div></div>
        <div class="form-grid"><label class="field"><span>Desde</span><input v-model="form.from" type="date" required></label><label class="field"><span>Hasta</span><input v-model="form.to" type="date" :min="form.from" required></label></div>
        <div class="form-section-title form-section-spaced"><span class="step-number">2</span><div><strong>¿Para qué la usarás?</strong><small>Describe brevemente tu proyecto.</small></div></div>
        <label class="field"><span>Propósito de uso</span><textarea v-model="form.purpose" rows="3" maxlength="180" placeholder="Ej. Instalar dos repisas en el living..." required></textarea><small class="field-hint">{{ form.purpose.length }}/180 caracteres</small></label>
        <label class="field"><span>Mensaje para {{ tool.owner.split(' ')[0] }} <small>(opcional)</small></span><textarea v-model="form.note" rows="2" placeholder="¿Tienes alguna pregunta sobre la herramienta?"></textarea></label>
        <div class="request-terms"><span>◇</span><p>Antes de confirmar, revisa el estado de la herramienta y acuerda con el prestador el punto de encuentro.</p></div>
        <button class="button button-primary button-full" type="submit" :disabled="!form.purpose.trim() || form.to < form.from">Enviar solicitud <span>↗</span></button>
      </form>
      <aside class="summary-card"><div class="summary-tool"><div class="summary-art" :class="`art-${tool.color}`">{{ tool.icon }}</div><div><strong>{{ tool.title }}</strong><small>{{ tool.owner }} · {{ tool.distance }}</small></div></div><div class="summary-divider"></div><div class="summary-row"><span>Tarifa diaria</span><strong>{{ money(tool.price) }}</strong></div><div class="summary-row"><span>Días solicitados</span><strong>{{ days }} {{ days === 1 ? 'día' : 'días' }}</strong></div><div class="summary-divider"></div><div class="summary-row summary-total"><span>Total estimado</span><strong>{{ money(total) }}</strong></div><p class="summary-footnote">Monto de referencia. Confirma las condiciones con el prestador antes del intercambio.</p></aside>
    </div>
  </div>
  <div v-else class="page-container"><EmptyState title="Herramienta no disponible" description="Vuelve al catálogo para escoger otra." action="Explorar" /></div>
</template>

