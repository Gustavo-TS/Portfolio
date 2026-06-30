<template>
  <div 
    ref="magneticRef" 
    class="magnetic-wrapper"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    :style="wrapperStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const magneticRef = ref(null);
const translateX = ref(0);
const translateY = ref(0);
const isHovering = ref(false);

const wrapperStyle = computed(() => {
  if (!isHovering.value) {
    return {
      transform: 'translate3d(0, 0, 0)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  }
  return {
    transform: `translate3d(${translateX.value}px, ${translateY.value}px, 0)`,
    transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)' // Mais rápido para acompanhar o mouse
  };
});

const handleMouseMove = (e) => {
  const container = magneticRef.value;
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  // Centro do elemento
  const centerX = rect.left + width / 2;
  const centerY = rect.top + height / 2;

  // Distância do mouse até o centro
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  // Força magnética (quanto o elemento se move em direção ao mouse)
  // Ajuste o multiplicador para maior ou menor atração (0.35 é ideal)
  const strength = 0.35;
  translateX.value = deltaX * strength;
  translateY.value = deltaY * strength;
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  translateX.value = 0;
  translateY.value = 0;
};
</script>

<style scoped>
.magnetic-wrapper {
  display: inline-block;
  will-change: transform;
}
</style>
