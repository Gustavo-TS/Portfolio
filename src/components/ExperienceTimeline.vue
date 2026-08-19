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
      <component :is="`h${headingLevel}`" class="timeline-title">{{ exp.role }}</component>
      <span class="timeline-company">{{ exp.company }}</span>
      <ul v-if="Array.isArray(exp.description)" class="timeline-desc timeline-desc-list">
        <li v-for="item in exp.description" :key="item">{{ item }}</li>
      </ul>
      <p v-else class="timeline-desc">{{ exp.description }}</p>
      
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
  },
  headingLevel: {
    type: Number,
    default: 3,
    validator: value => value >= 2 && value <= 6
  }
});
</script>

<style scoped>
.timeline-desc-list {
  display: grid;
  gap: 0.65rem;
  padding: 0;
  list-style: none;
}

.timeline-desc-list li {
  position: relative;
  padding-left: 1.1rem;
}

.timeline-desc-list li::before {
  content: '';
  position: absolute;
  top: 0.7em;
  left: 0;
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 8px color-mix(in srgb, var(--color-primary) 65%, transparent);
}
</style>
