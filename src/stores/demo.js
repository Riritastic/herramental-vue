import { computed, reactive, watch } from 'vue'

const seed = {
  personaId: 'enrique',
  tools: [
    { id: 't-01', title: 'Taladro percutor Bosch', category: 'Perforación', icon: '🔩', price: 3500, unit: 'día', owner: 'Enrique Pincheira', ownerId: 'enrique', rating: '4.9', reviews: 12, distance: '0,8 km', location: 'Temuco Centro', available: true, condition: 'Muy bueno', description: 'Taladro percutor de 750 W, ideal para concreto, madera y metal. Incluye maletín y juego básico de brocas.', color: 'peach', featured: true },
    { id: 't-02', title: 'Sierra circular Makita', category: 'Corte', icon: '🪚', price: 5000, unit: 'día', owner: 'Camila Rojas', ownerId: 'camila', rating: '5.0', reviews: 8, distance: '1,2 km', location: 'Avenida Alemania', available: true, condition: 'Excelente', description: 'Sierra circular de 7 1/4 pulgadas con guía paralela. Se entrega con disco instalado y manual de uso.', color: 'blue', featured: true },
    { id: 't-03', title: 'Escalera telescópica 3,8 m', category: 'Acceso', icon: '🪜', price: 4200, unit: 'día', owner: 'Enrique Pincheira', ownerId: 'enrique', rating: '4.8', reviews: 6, distance: '1,6 km', location: 'Temuco Centro', available: true, condition: 'Muy bueno', description: 'Escalera de aluminio extensible, liviana y fácil de transportar. Altura máxima extendida: 3,8 metros.', color: 'yellow', featured: false },
    { id: 't-04', title: 'Hidrolavadora Kärcher K2', category: 'Limpieza', icon: '💦', price: 6000, unit: 'día', owner: 'Javier Soto', ownerId: 'javier', rating: '4.7', reviews: 15, distance: '2,1 km', location: 'Pedro de Valdivia', available: true, condition: 'Bueno', description: 'Hidrolavadora compacta para patios, vehículos y muebles de exterior. Incluye manguera y boquilla regulable.', color: 'mint', featured: false },
    { id: 't-05', title: 'Lijadora orbital Stanley', category: 'Terminaciones', icon: '🌀', price: 2800, unit: 'día', owner: 'Camila Rojas', ownerId: 'camila', rating: '4.9', reviews: 5, distance: '1,2 km', location: 'Avenida Alemania', available: true, condition: 'Excelente', description: 'Lijadora orbital compacta para terminaciones en madera. Se entrega con hojas de lija de distintos granos.', color: 'lilac', featured: false },
    { id: 't-06', title: 'Juego de llaves y dados', category: 'Reparación', icon: '🧰', price: 2000, unit: 'día', owner: 'Javier Soto', ownerId: 'javier', rating: '4.6', reviews: 4, distance: '2,1 km', location: 'Pedro de Valdivia', available: true, condition: 'Bueno', description: 'Set de herramientas manuales para reparaciones domésticas: llaves, dados, extensiones y carraca.', color: 'cream', featured: false },
  ],
  requests: [
    { id: 'r-101', toolId: 't-01', toolTitle: 'Taladro percutor Bosch', requester: 'Camila Rojas', requesterId: 'camila', owner: 'Enrique Pincheira', ownerId: 'enrique', from: '12 oct 2026', to: '13 oct 2026', purpose: 'Instalar repisas en el living', total: 7000, status: 'pending', created: 'Hoy, 09:42' },
    { id: 'r-102', toolId: 't-03', toolTitle: 'Escalera telescópica 3,8 m', requester: 'Enrique Pincheira', requesterId: 'enrique', owner: 'Camila Rojas', ownerId: 'camila', from: '08 oct 2026', to: '09 oct 2026', purpose: 'Pintar una pared exterior', total: 8400, status: 'pending', created: 'Ayer, 18:16' },
  ],
  loans: [
    { id: 'L-204', requestId: 'r-090', toolId: 't-02', toolTitle: 'Sierra circular Makita', borrower: 'Enrique Pincheira', borrowerId: 'enrique', owner: 'Camila Rojas', ownerId: 'camila', from: '04 oct 2026', to: '06 oct 2026', purpose: 'Cortar tablas para un mueble', total: 10000, status: 'delivered', nextAction: 'Registrar devolución' },
    { id: 'L-198', requestId: 'r-081', toolId: 't-03', toolTitle: 'Escalera telescópica 3,8 m', borrower: 'Camila Rojas', borrowerId: 'camila', owner: 'Enrique Pincheira', ownerId: 'enrique', from: '28 sep 2026', to: '29 sep 2026', purpose: 'Limpiar canaletas', total: 4200, status: 'returned', nextAction: 'Préstamo completado' },
  ],
  incidents: [
    { id: 'INC-024', loanId: 'L-204', toolTitle: 'Sierra circular Makita', reporter: 'Enrique Pincheira', reporterId: 'enrique', category: 'Condición de herramienta', detail: 'El disco presenta desgaste mayor al indicado antes de la entrega. Dejé de usarla y adjuntaría fotografías al reporte.', status: 'received', created: 'Hoy, 10:06' },
  ],
  notifications: [],
}

function loadState() {
  try {
    const saved = localStorage.getItem('herramental-demo-v1')
    return saved ? { ...seed, ...JSON.parse(saved) } : structuredClone(seed)
  } catch { return structuredClone(seed) }
}

export const state = reactive(loadState())
watch(state, value => localStorage.setItem('herramental-demo-v1', JSON.stringify(value)), { deep: true })

export const personas = [
  { id: 'enrique', name: 'Enrique Pincheira', role: 'Prestador', initials: 'EP', color: 'avatar-blue' },
  { id: 'camila', name: 'Camila Rojas', role: 'Solicitante', initials: 'CR', color: 'avatar-coral' },
  { id: 'admin', name: 'Equipo Herramental', role: 'Administrador', initials: 'EH', color: 'avatar-green' },
]
export const activePersona = computed(() => personas.find(p => p.id === state.personaId) || personas[0])
export const money = value => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value)
export const findTool = id => state.tools.find(tool => tool.id === id)
export const notify = message => { const id = Date.now() + Math.random(); state.notifications.unshift({ id, message }); setTimeout(() => { const i = state.notifications.findIndex(n => n.id === id); if (i >= 0) state.notifications.splice(i, 1) }, 3500) }

export function createRequest({ tool, from, to, purpose, days }) {
  const me = activePersona.value
  const request = { id: `r-${Date.now()}`, toolId: tool.id, toolTitle: tool.title, requester: me.name, requesterId: me.id, owner: tool.owner, ownerId: tool.ownerId, from, to, purpose, total: tool.price * days, status: 'pending', created: 'Ahora' }
  state.requests.unshift(request)
  return request
}
export function decideRequest(request, decision) {
  request.status = decision
  if (decision === 'accepted') {
    state.loans.unshift({ id: `L-${String(Date.now()).slice(-3)}`, requestId: request.id, toolId: request.toolId, toolTitle: request.toolTitle, borrower: request.requester, borrowerId: request.requesterId, owner: request.owner, ownerId: request.ownerId, from: request.from, to: request.to, purpose: request.purpose, total: request.total, status: 'confirmed', nextAction: 'Confirmar entrega' })
  }
}
export function advanceLoan(loan) {
  if (loan.status === 'confirmed') { loan.status = 'delivered'; loan.nextAction = 'Registrar devolución' }
  else if (loan.status === 'delivered') { loan.status = 'returned'; loan.nextAction = 'Préstamo completado' }
}
export function createIncident({ loan, category, detail }) {
  const me = activePersona.value
  state.incidents.unshift({ id: `INC-${String(Date.now()).slice(-3)}`, loanId: loan.id, toolTitle: loan.toolTitle, reporter: me.name, reporterId: me.id, category, detail, status: 'received', created: 'Ahora' })
}
export function publishTool(form) {
  const me = activePersona.value
  const tool = { ...form, id: `t-${Date.now()}`, owner: me.name, ownerId: me.id, rating: 'Nuevo', reviews: 0, distance: 'Cerca de ti', available: true, featured: false }
  state.tools.unshift(tool)
  return tool
}
export function resetDemo() { Object.assign(state, structuredClone(seed)) }
