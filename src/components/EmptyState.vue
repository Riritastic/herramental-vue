<script setup>
defineProps({ title: String, description: String, action: String })
</script>
<template>
  <div class="empty-state"><div class="empty-icon">⌁</div><h3>{{ title }}</h3><p>{{ description }}</p><slot><RouterLink v-if="action" to="/" class="button button-secondary">{{ action }}</RouterLink></slot></div>
</template>
