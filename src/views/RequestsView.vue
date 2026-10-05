<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { activePersona, decideRequest, money, notify, state } from '../stores/demo'
const route=useRoute();const tab=ref('incoming');const me=activePersona
const incoming=computed(()=>state.requests.filter(r=>r.ownerId===me.value.id))
const outgoing=computed(()=>state.requests.filter(r=>r.requesterId===me.value.id))
const visible=computed(()=>tab.value==='incoming'?incoming.value:outgoing.value)
const pendingCount=computed(()=>incoming.value.filter(r=>r.status==='pending').length)
function respond(request, decision){decideRequest(request,decision);notify(decision==='accepted'?'Solicitud aceptada. Se creó un préstamo.':'Solicitud rechazada. El solicitante verá el cambio.')}
function statusName(status){return ({pending:'Pendiente',accepted:'Aceptada',rejected:'No aceptada'})[status]||status}
</script>
<template>
  <div class="page-container requests-page">
    <div class="page-title-row"><div class="page-title-block"><span class="eyebrow">CU-05 · COORDINAR UN PRÉSTAMO</span><h1>Solicitudes<span v-if="pendingCount" class="title-count">{{ pendingCount }}</span></h1><p>Conversa y confirma los detalles antes del intercambio.</p></div><RouterLink to="/" class="button button-secondary">Explorar herramientas <span>↗</span></RouterLink></div>
    <div v-if="route.query.sent" class="success-banner"><span>✓</span><div><strong>¡Solicitud enviada!</strong><small>Te avisaremos cuando {{ state.requests.find(r=>r.id===route.query.sent)?.owner?.split(' ')[0] || 'el prestador' }} responda. Revisa aquí el estado.</small></div><button @click="$router.replace('/solicitudes')">×</button></div>
    <div class="tabs-line"><button :class="{active:tab==='incoming'}" @click="tab='incoming'">Recibidas <span>{{ incoming.length }}</span></button><button :class="{active:tab==='outgoing'}" @click="tab='outgoing'">Enviadas <span>{{ outgoing.length }}</span></button></div>
    <section v-if="visible.length" class="request-list">
      <article v-for="request in visible" :key="request.id" class="request-card">
        <div class="request-tool-icon" :class="`art-${state.tools.find(t=>t.id===request.toolId)?.color || 'peach'}`">{{ state.tools.find(t=>t.id===request.toolId)?.icon || '🔧' }}</div>
        <div class="request-card-content"><div class="request-card-heading"><div><span class="eyebrow">{{ tab==='incoming'?'NUEVA SOLICITUD':'TU SOLICITUD' }} · {{ request.id }}</span><h3>{{ request.toolTitle }}</h3></div><span class="status-pill" :class="`status-${request.status}`"><i></i>{{ statusName(request.status) }}</span></div>
          <div class="request-person"><span class="avatar avatar-small" :class="tab==='incoming'?'avatar-coral':'avatar-blue'">{{ (tab==='incoming'?request.requester:request.owner).split(' ').map(x=>x[0]).slice(0,2).join('') }}</span><span><strong>{{ tab==='incoming'?request.requester:request.owner }}</strong><small>{{ tab==='incoming'?'quiere pedir tu herramienta':'prestador' }}</small></span><span class="request-created">{{ request.created }}</span></div>
          <div class="request-details"><span><i>◷</i> {{ request.from }} – {{ request.to }}</span><span><i>◇</i> {{ money(request.total) }} total estimado</span></div>
          <div class="request-purpose"><small>PROPÓSITO</small><p>“{{ request.purpose }}”</p></div>
          <div v-if="request.status==='pending' && tab==='incoming' && me.id!=='admin'" class="request-actions"><button class="button button-primary" @click="respond(request,'accepted')">Aceptar solicitud <span>↗</span></button><button class="button button-quiet" @click="respond(request,'rejected')">No aceptar</button></div>
          <div v-else-if="request.status==='pending'" class="request-waiting"><span class="pulse-dot"></span> Esperando respuesta del prestador</div>
          <RouterLink v-else-if="request.status==='accepted'" to="/prestamos" class="request-loan-link">Ver préstamo creado →</RouterLink>
        </div>
      </article>
    </section>
    <div v-else class="empty-panel"><div class="empty-icon">▤</div><h3>No hay solicitudes {{ tab==='incoming'?'recibidas':'enviadas' }}</h3><p>Cuando alguien solicite una herramienta, aparecerá aquí.</p><RouterLink to="/" class="button button-secondary">Explorar herramientas</RouterLink></div>
    <div class="privacy-note"><span>◇</span> Comparte solo la información necesaria para coordinar el préstamo. Evita publicar tu dirección exacta.</div>
  </div>
</template>
