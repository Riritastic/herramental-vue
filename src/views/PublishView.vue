<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { notify, publishTool } from '../stores/demo'
const router = useRouter();const photoReady = ref(false)
const form = reactive({ title:'', category:'Perforación', icon:'🔧', price:'', unit:'día', condition:'Muy bueno', location:'Temuco Centro', color:'peach', description:'' })
const categories=['Perforación','Corte','Acceso','Limpieza','Terminaciones','Reparación','Jardín','Otro']
const icons=['🔩','🪚','🪜','💦','🌀','🧰','🪴','🔧']
function chooseCategory() { const i=categories.indexOf(form.category);form.icon=icons[i] || '🔧' }
function submit() { const item=publishTool({...form,price:Number(form.price)});notify('Tu herramienta ya está en el catálogo.');router.push(`/herramientas/${item.id}`) }
</script>
<template>
  <div class="page-container publish-page">
    <RouterLink to="/" class="back-link">← Volver al catálogo</RouterLink>
    <div class="page-title-block"><span class="eyebrow">CU-02 · PUBLICAR HERRAMIENTA</span><h1>Haz espacio en tu bodega,<br><em>y en tu comunidad.</em></h1><p>Comparte lo que tienes. Alguien cerca puede necesitarlo hoy.</p></div>
    <div class="publish-layout"><form class="form-card" @submit.prevent="submit">
      <div class="form-section-title"><span class="step-number">1</span><div><strong>Cuéntanos sobre la herramienta</strong><small>Mientras más detalles, más confianza.</small></div></div>
      <label class="field"><span>Nombre de la herramienta</span><input v-model.trim="form.title" required maxlength="70" placeholder="Ej. Taladro percutor Bosch"></label>
      <div class="form-grid"><label class="field"><span>Categoría</span><select v-model="form.category" @change="chooseCategory"> <option v-for="category in categories" :key="category">{{ category }}</option></select></label><label class="field"><span>Estado</span><select v-model="form.condition"><option>Excelente</option><option>Muy bueno</option><option>Bueno</option></select></label></div>
      <label class="field"><span>Descripción</span><textarea v-model.trim="form.description" required rows="4" maxlength="300" placeholder="Describe su uso, accesorios incluidos y cualquier detalle importante."></textarea><small class="field-hint">{{ form.description.length }}/300 caracteres</small></label>
      <div class="form-section-title form-section-spaced"><span class="step-number">2</span><div><strong>Disponibilidad y condiciones</strong><small>Indica el valor de referencia y dónde coordinar.</small></div></div>
      <div class="form-grid"><label class="field"><span>Tarifa de referencia</span><div class="input-prefix"><span>$</span><input v-model.number="form.price" type="number" min="500" step="500" required placeholder="3.500"></div></label><label class="field"><span>Unidad</span><select v-model="form.unit"><option value="día">Por día</option><option value="fin de semana">Por fin de semana</option></select></label></div>
      <label class="field"><span>Punto de encuentro</span><select v-model="form.location"><option>Temuco Centro</option><option>Avenida Alemania</option><option>Pedro de Valdivia</option><option>Coordinar con prestador</option></select></label>
      <div class="request-terms"><span>♡</span><p>Comparte una ubicación de referencia, no tu dirección exacta. Acuerda la entrega en un lugar seguro.</p></div>
      <button class="button button-primary button-full" type="submit" :disabled="!form.title || !form.description || !form.price">Publicar herramienta <span>↗</span></button>
    </form>
    <aside class="publish-preview"><span class="eyebrow">VISTA PREVIA</span><div class="preview-card"><div class="tool-art" :class="`art-${form.color}`"><span class="tool-icon">{{ form.icon }}</span><span class="featured-tag">TU COMUNIDAD</span></div><div class="tool-card-body"><div class="tool-card-top"><span class="eyebrow">{{ form.category }}</span><span class="rating">★ Nuevo</span></div><h3>{{ form.title || 'Nombre de tu herramienta' }}</h3><div class="tool-owner"><span class="owner-avatar">EP</span><span>Tu perfil</span><span class="owner-dot">·</span><span>{{ form.location }}</span></div><div class="tool-card-footer"><strong>${{ Number(form.price || 0).toLocaleString('es-CL') }} <small>/ {{ form.unit }}</small></strong><span>↗</span></div></div></div><div class="preview-tip"><span>✳</span><p>Una buena descripción y una tarifa transparente ayudan a que más vecinos se animen a pedirla.</p></div></aside></div>
  </div>
</template>
