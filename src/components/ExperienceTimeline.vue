<template>
  <div class="timeline">
    <div 
      v-for="(exp, index) in experiences" 
      :key="exp.company + exp.role"
      class="timeline-item reveal"
      :class="`delay-${(index % 3) + 1}`"
      :style="{ '--item-index': index }"
    >
      <span class="timeline-badge">{{ exp.period }}</span>
      <h3 class="timeline-title">{{ exp.role }}</h3>
      <span class="timeline-company">{{ exp.company }}</span>
      <p class="timeline-desc">{{ exp.description }}</p>
      
      <div class="timeline-tags">
        <span 
          v-for="tag in exp.tags" 
          :key="tag" 
          class="timeline-tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  experiences: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
/* Os estilos principais já estão definidos globalmente em style.css */
</style>
