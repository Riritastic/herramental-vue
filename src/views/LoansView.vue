<script setup>
import { computed, ref } from 'vue'
import { activePersona, advanceLoan, money, notify, state } from '../stores/demo'
const filter=ref('active');const me=activePersona
const relevant=computed(()=>state.loans.filter(loan=>me.value.id==='admin'||loan.borrowerId===me.value.id||loan.ownerId===me.value.id))
const loans=computed(()=>relevant.value.filter(loan=>filter.value==='active'?loan.status==='confirmed'||loan.status==='delivered':loan.status==='returned'))
function advance(loan){advanceLoan(loan);notify(loan.status==='delivered'?'Entrega registrada. Recuerda confirmar la devolución al finalizar.':'Devolución registrada. El préstamo quedó en el historial.')}
function canAdvance(loan){return ['confirmed','delivered'].includes(loan.status)&&[loan.ownerId,loan.borrowerId].includes(me.value.id)}
function actionLabel(loan){if(loan.status==='confirmed')return me.value.id===loan.ownerId?'Confirmar entrega':'Registrar recepción';return me.value.id===loan.ownerId?'Confirmar devolución':'Registrar devolución'}
</script>
<template>
  <div class="page-container loans-page"><div class="page-title-row"><div class="page-title-block"><span class="eyebrow">CU-06 · ENTREGA Y DEVOLUCIÓN</span><h1>Mis préstamos</h1><p>Un buen intercambio termina cuando la herramienta vuelve a casa.</p></div><RouterLink to="/" class="button button-secondary">Buscar herramientas <span>↗</span></RouterLink></div>
    <div class="tabs-line"><button :class="{active:filter==='active'}" @click="filter='active'">En curso <span>{{ relevant.filter(l=>l.status==='confirmed'||l.status==='delivered').length }}</span></button><button :class="{active:filter==='history'}" @click="filter='history'">Completados <span>{{ relevant.filter(l=>l.status==='returned').length }}</span></button></div>
    <div v-if="loans.length" class="loan-grid"><article v-for="loan in loans" :key="loan.id" class="loan-card"><div class="loan-card-top"><div class="loan-tool-art" :class="`art-${state.tools.find(t=>t.id===loan.toolId)?.color || 'peach'}`">{{ state.tools.find(t=>t.id===loan.toolId)?.icon || '🔧' }}</div><div><span class="eyebrow">PRÉSTAMO {{ loan.id }}</span><h3>{{ loan.toolTitle }}</h3><span class="status-pill" :class="`status-${loan.status}`"><i></i>{{ loan.status==='confirmed'?'Confirmado':loan.status==='delivered'?'En curso':'Completado' }}</span></div></div>
      <div class="loan-progress"><div class="progress-track"><span :class="{done:true}"></span><span :class="{done:loan.status==='delivered'||loan.status==='returned'}"></span><span :class="{done:loan.status==='returned'}"></span></div><div class="progress-labels"><span>Confirmado</span><span>Entregado</span><span>Devuelto</span></div></div>
      <div class="loan-meta"><div><span>Participantes</span><strong>{{ loan.borrowerId===me.id?'Tú':loan.borrower }} <small>y</small> {{ loan.ownerId===me.id?'tú':loan.owner }}</strong></div><div><span>Período</span><strong>{{ loan.from }} – {{ loan.to }}</strong></div><div><span>Propósito</span><strong>{{ loan.purpose }}</strong></div><div><span>Costo registrado</span><strong>{{ money(loan.total) }}</strong></div></div>
      <button v-if="canAdvance(loan)" class="button button-primary button-full" @click="advance(loan)">{{ actionLabel(loan) }} <span>↗</span></button><div v-else class="completed-note">✓ Intercambio completado</div><RouterLink :to="{path:'/incidentes',query:{loan:loan.id,new:'1'}}" class="report-issue-link">Reportar un problema con este préstamo <span>→</span></RouterLink>
    </article></div><div v-else class="empty-panel"><div class="empty-icon">▧</div><h3>Todo listo para tu próximo proyecto</h3><p>Aquí verás el estado de las herramientas que prestas o pides.</p><RouterLink to="/" class="button button-primary">Explorar herramientas</RouterLink></div>
  </div>
</template>
