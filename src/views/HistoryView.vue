<script setup>
import { computed } from 'vue'
import { activePersona, money, state } from '../stores/demo'
const me=activePersona
const records=computed(()=>state.loans.filter(l=>me.value.id==='admin'||l.borrowerId===me.value.id||l.ownerId===me.value.id).filter(l=>l.status==='returned'))
</script>
<template>
  <div class="page-container history-page"><div class="page-title-block"><span class="eyebrow">CU-07 · TRANSACCIONES REGISTRADAS</span><h1>Lo que ya compartimos.</h1><p>Un registro claro ayuda a cuidar cada herramienta y cada encuentro.</p></div>
    <div class="history-summary"><div><span>INTERCAMBIOS COMPLETADOS</span><strong>{{ records.length }}</strong></div><div><span>VALOR COMPARTIDO</span><strong>{{ money(records.reduce((sum,l)=>sum+l.total,0)) }}</strong></div><div><span>COMUNIDAD</span><strong>Temuco <i>⌖</i></strong></div></div>
    <section class="history-section"><div class="section-heading"><div><span class="eyebrow">TU HISTORIAL</span><h2>Préstamos completados</h2></div><button class="filter-button">Últimos primero <span>⌄</span></button></div>
      <div v-if="records.length" class="history-table-wrap"><table class="history-table"><thead><tr><th>HERRAMIENTA</th><th>PARTICIPANTE</th><th>FECHA</th><th>COSTO</th><th>ESTADO</th></tr></thead><tbody><tr v-for="loan in records" :key="loan.id"><td><div class="history-tool"><span class="history-icon">{{ state.tools.find(t=>t.id===loan.toolId)?.icon || '🔧' }}</span><span><strong>{{ loan.toolTitle }}</strong><small>{{ loan.id }}</small></span></div></td><td>{{ loan.borrowerId===me.id?loan.owner:loan.borrower }}</td><td>{{ loan.from }} – {{ loan.to }}</td><td>{{ money(loan.total) }}</td><td><span class="status-pill status-returned"><i></i>Completado</span></td></tr></tbody></table></div>
      <div v-else class="empty-panel"><div class="empty-icon">◷</div><h3>Tu historial empezará aquí</h3><p>Cuando finalice un préstamo, podrás revisar el detalle de la transacción.</p><RouterLink to="/" class="button button-secondary">Explorar herramientas</RouterLink></div>
    </section><div class="privacy-note"><span>◇</span> Tu historial contiene información de tus transacciones. Solo tú puedes consultar estos detalles.</div>
  </div>
</template>
