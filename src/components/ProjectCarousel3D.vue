<template>
  <div class="carousel-3d-container">
    <!-- Controles do Carrossel (Setas) -->
    <button class="carousel-btn btn-prev" @click="prevSlide" :aria-label="language === 'en' ? 'Previous slide' : 'Slide anterior'">
      <i class="fas fa-chevron-left"></i>
    </button>

    <!-- Trilho 3D dos Cards -->
    <div
      class="carousel-3d-track"
      @touchstart.passive="handleTouchStart"
      @touchend="handleTouchEnd"
      @touchcancel="resetSwipe"
    >
      <div 
        v-for="(project, index) in projects" 
        :key="project.title"
        class="carousel-3d-slide"
        :class="getSlideClass(index)"
        :style="getSlideStyle(index)"
        @click="handleSlideClick(index)"
      >
        <!-- Card Individual com Efeito Tilt (Somente se for o card ativo) -->
        <ProjectCard :project="project" :is-active="index === currentIndex" :language="language" />
      </div>
    </div>

    <button class="carousel-btn btn-next" @click="nextSlide" :aria-label="language === 'en' ? 'Next slide' : 'Próximo slide'">
      <i class="fas fa-chevron-right"></i>
    </button>

    <!-- Indicadores Inferiores (Dots) -->
    <div class="carousel-dots">
      <button 
        v-for="(_, index) in projects" 
        :key="index"
        class="dot-btn"
        :class="{ 'active': index === currentIndex }"
        @click="currentIndex = index"
        :aria-label="language === 'en' ? `Go to project ${index + 1}` : `Ir para projeto ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProjectCard from './ProjectCard.vue';

const props = defineProps({
  projects: {
    type: Array,
    required: true
  },
  language: {
    type: String,
    default: 'pt'
  }
});

const currentIndex = ref(0);
const swipeStartX = ref(null);
const swipeStartY = ref(null);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.projects.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.projects.length) % props.projects.length;
};

const handleTouchStart = (event) => {
  if (event.touches.length !== 1) return;
  const touch = event.touches[0];
  swipeStartX.value = touch.clientX;
  swipeStartY.value = touch.clientY;
};

const resetSwipe = () => {
  swipeStartX.value = null;
  swipeStartY.value = null;
};

const handleTouchEnd = (event) => {
  if (swipeStartX.value === null || event.changedTouches.length === 0) return;
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - swipeStartX.value;
  const deltaY = touch.clientY - swipeStartY.value;

  if (Math.abs(deltaX) >= 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
    deltaX < 0 ? nextSlide() : prevSlide();
  }
  resetSwipe();
};

const handleSlideClick = (index) => {
  // Se o usuário clicar em um card lateral, foca nele
  if (index !== currentIndex.value) {
    currentIndex.value = index;
  }
};

// Determina classes para auxiliar no controle de ponteiro
const getSlideClass = (index) => {
  const offset = getNormalizedOffset(index);
  return {
    'active': offset === 0,
    'left-slide': offset === -1,
    'right-slide': offset === 1,
    'hidden-slide': Math.abs(offset) > 1
  };
};

// Calcula a distância curta considerando que o carrossel é circular
const getNormalizedOffset = (index) => {
  const len = props.projects.length;
  let offset = index - currentIndex.value;
  
  // Normaliza o offset para ficar entre -floor(len/2) e floor(len/2)
  while (offset > len / 2) offset -= len;
  while (offset <= -len / 2) offset += len;
  
  return offset;
};

// Define os estilos 3D dinâmicos de translação, escala e rotação no eixo Y
const getSlideStyle = (index) => {
  const offset = getNormalizedOffset(index);
  const isActive = offset === 0;
  
  let tx = 0;
  let tz = 0;
  let ry = 0;
  let scale = 1;
  let opacity = 1;
  let zIndex = 10;
  
  if (offset === 0) {
    // Card ativo centralizado
    tx = 0;
    tz = 0;
    ry = 0;
    scale = 1.05;
    opacity = 1;
    zIndex = 10;
  } else if (offset === 1) {
    // Card da direita
    tx = 85; // Percentual de deslocamento lateral
    tz = -180; // Afastado no espaço Z
    ry = -30; // Rotacionado levemente para a esquerda
    scale = 0.85;
    opacity = 0.65;
    zIndex = 5;
  } else if (offset === -1) {
    // Card da esquerda
    tx = -85;
    tz = -180;
    ry = 30; // Rotacionado levemente para a direita
    scale = 0.85;
    opacity = 0.65;
    zIndex = 5;
  } else {
    // Demais cards ocultos no fundo
    tx = offset > 0 ? 150 : -150;
    tz = -350;
    ry = offset > 0 ? -45 : 45;
    scale = 0.6;
    opacity = 0;
    zIndex = 1;
  }

  return {
    transform: `translate3d(${tx}%, 0px, ${tz}px) scale(${scale}) rotateY(${ry}deg)`,
    opacity: opacity,
    zIndex: zIndex,
    pointerEvents: isActive ? 'auto' : 'none' // Desativa cliques em links do card inativo
  };
};
</script>

<style scoped>
.carousel-3d-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 2.75rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
}

.carousel-3d-track {
  position: relative;
  width: 100%;
  height: 480px;
  perspective: 1200px; /* Cria o ponto de fuga 3D */
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-3d-slide {
  position: absolute;
  width: min(380px, 100%);
  height: 450px;
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), z-index 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  cursor: pointer;
  will-change: transform, opacity;
}

/* Setas de Navegação */
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(16, 16, 24, 0.7);
  border: 1px solid var(--border-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 20;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: var(--transition-smooth);
}

@media (hover: hover) and (pointer: fine) {
  .carousel-btn:hover {
    background: var(--primary-gradient);
    border-color: transparent;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
    color: white;
    transform: translateY(-50%) scale(1.1);
  }
}

.btn-prev {
  left: -20px;
}

.btn-next {
  right: -20px;
}

/* Dots Indicadores */
.carousel-dots {
  display: flex;
  gap: 0.8rem;
  margin-top: 2rem;
  z-index: 10;
}

.dot-btn {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
}

.dot-btn:hover {
  background: rgba(255, 255, 255, 0.5);
}

.dot-btn.active {
  background: var(--color-primary);
  width: 25px;
  border-radius: 10px;
  box-shadow: 0 0 10px var(--color-primary);
}

@media (max-width: 768px) {
  .carousel-3d-container {
    padding: 1rem 0 0;
  }

  .carousel-3d-track {
    height: auto;
    min-height: 0;
    display: block;
    perspective: none;
    touch-action: pan-y;
    user-select: none;
  }
  
  .carousel-3d-slide {
    position: relative;
    inset: auto;
    width: 100%;
    height: auto;
    opacity: 1 !important;
    z-index: 1 !important;
    margin: 0;
    transform: none !important;
    pointer-events: auto !important;
  }

  .carousel-3d-slide:not(.active) {
    display: none;
  }
  
  .btn-prev {
    left: 8px;
  }
  
  .btn-next {
    right: 8px;
  }

  .carousel-btn {
    top: 106px;
    bottom: auto;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    background: rgba(8, 8, 14, 0.78);
  }

  .carousel-btn:active {
    transform: translateY(-50%) scale(0.94);
  }

  .carousel-dots {
    margin-top: 1.1rem;
    gap: 0.55rem;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
