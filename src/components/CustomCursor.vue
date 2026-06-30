<template>
  <div v-if="isVisible" class="custom-cursor-container">
    <!-- Círculo externo (segue com atraso/suavizado) -->
    <div 
      class="cursor-outer" 
      :class="{ 'is-hovered': isHovered, 'is-clicked': isClicked }"
      :style="outerStyle"
    ></div>
    <!-- Ponto interno (segue de forma síncrona) -->
    <div 
      class="cursor-inner" 
      :class="{ 'is-hovered': isHovered, 'is-clicked': isClicked }"
      :style="innerStyle"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';

const isVisible = ref(false);
const isHovered = ref(false);
const isClicked = ref(false);

const mouseCoords = ref({ x: 0, y: 0 });
const lerpedCoords = ref({ x: 0, y: 0 });

let animationFrameId = null;

// Estilo dinâmico para o cursor interno (ponto)
const innerStyle = computed(() => ({
  transform: `translate3d(${mouseCoords.value.x}px, ${mouseCoords.value.y}px, 0) translate3d(-50%, -50%, 0)`
}));

// Estilo dinâmico para o cursor externo (anel suave)
const outerStyle = computed(() => ({
  transform: `translate3d(${lerpedCoords.value.x}px, ${lerpedCoords.value.y}px, 0) translate3d(-50%, -50%, 0)`
}));

// Equação de Interpolação Linear (Lerp) para atraso físico
const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

const updateCoordinates = () => {
  // Ajuste de velocidade do anel externo (0.15 = lento/suave, 1.0 = instantâneo)
  lerpedCoords.value.x = lerp(lerpedCoords.value.x, mouseCoords.value.x, 0.15);
  lerpedCoords.value.y = lerp(lerpedCoords.value.y, mouseCoords.value.y, 0.15);
  
  animationFrameId = requestAnimationFrame(updateCoordinates);
};

const onMouseMove = (e) => {
  // Se ainda não estava visível, mostra (previne render no canto superior esquerdo no início)
  if (!isVisible.value) {
    isVisible.value = true;
    // Inicializa a posição do lerp no mesmo local para evitar um deslize longo inicial
    lerpedCoords.value.x = e.clientX;
    lerpedCoords.value.y = e.clientY;
  }
  
  mouseCoords.value.x = e.clientX;
  mouseCoords.value.y = e.clientY;
};

const onMouseDown = () => {
  isClicked.value = true;
};

const onMouseUp = () => {
  isClicked.value = false;
};

// Gerenciamento de hovers em botões/links
const checkHoverTargets = (e) => {
  const target = e.target;
  if (!target) return;
  
  // Verifica se o mouse está sobre um elemento interativo
  const isInteractive = target.closest('a, button, input, textarea, select, .interactive-card, .btn');
  isHovered.value = !!isInteractive;
};

onMounted(() => {
  // Desativa o cursor customizado para dispositivos de toque (celulares/tablets)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouchDevice || reducedMotion) {
    isVisible.value = false;
    return;
  }

  // Ativa classe no body para esconder o cursor padrão do sistema (via style.css)
  document.body.classList.add('custom-cursor-active');
  
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);
  
  // Escuta movimentos globais para gerenciar estados de hover
  window.addEventListener('mouseover', checkHoverTargets);
  
  // Inicia o loop de interpolação
  updateCoordinates();
});

onUnmounted(() => {
  document.body.classList.remove('custom-cursor-active');
  
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mousedown', onMouseDown);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('mouseover', checkHoverTargets);
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.custom-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  pointer-events: none;
}

/* Ponto interno */
.cursor-inner {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: var(--color-secondary);
  border-radius: 50%;
  transition: width 0.2s, height 0.2s, background-color 0.2s;
  will-change: transform;
}

/* Anel externo */
.cursor-outer {
  position: absolute;
  width: 32px;
  height: 32px;
  border: 1.5px solid var(--color-primary);
  border-radius: 50%;
  transition: width 0.25s, height 0.25s, border-color 0.25s, background-color 0.25s;
  will-change: transform;
}

/* Efeitos de Hover */
.cursor-inner.is-hovered {
  width: 0;
  height: 0;
  opacity: 0;
}

.cursor-outer.is-hovered {
  width: 52px;
  height: 52px;
  border-color: var(--color-accent);
  background-color: rgba(236, 72, 153, 0.08); /* Rosa translúcido */
}

/* Efeitos de Clique */
.cursor-outer.is-clicked {
  transform: scale(0.85);
  border-color: var(--color-secondary);
  background-color: rgba(6, 182, 212, 0.15);
}
</style>
