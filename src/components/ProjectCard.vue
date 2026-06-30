<template>
  <div 
    ref="cardRef"
    class="project-card-container"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="project-card glass-panel interactive-card"
      :style="cardStyle"
    >
      <!-- Brilho reflexivo (Efeito Glare) -->
      <div class="card-glare" :style="glareStyle"></div>

      <!-- Imagem do Projeto -->
      <div class="project-img-wrapper">
        <img
          :src="project.image"
          :alt="`Captura de tela do projeto ${project.title}`"
          class="project-img"
          loading="lazy"
          width="640"
          height="400"
          decoding="async"
        />
        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <!-- Detalhes do Projeto -->
      <div class="project-content">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-desc">{{ project.description }}</p>
        
        <div class="project-links">
          <a v-if="hasLink(project.demoUrl)" :href="project.demoUrl" target="_blank" rel="noopener noreferrer" class="project-link">
            <i class="fas fa-external-link-alt" aria-hidden="true"></i> {{ language === 'en' ? 'View project' : 'Ver projeto' }}
          </a>
          <a v-if="hasLink(project.githubUrl)" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="project-link">
            <i class="fab fa-github" aria-hidden="true"></i> {{ language === 'en' ? 'Code' : 'Código' }}
          </a>
          <span v-if="!hasLink(project.demoUrl) && !hasLink(project.githubUrl)" class="project-status">{{ language === 'en' ? 'Case study in progress' : 'Case em documentação' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  language: {
    type: String,
    default: 'pt'
  }
});

const hasLink = (url) => Boolean(url && url !== '#');

const cardRef = ref(null);
const rotateX = ref(0);
const rotateY = ref(0);
const glareX = ref(50);
const glareY = ref(50);
const glareOpacity = ref(0);
const isHovering = ref(false);

const cardStyle = computed(() => {
  if (!isHovering.value) {
    return {
      transform: 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    };
  }
  return {
    transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale3d(1.02, 1.02, 1.02)`,
    boxShadow: 'var(--shadow-glow-hover)',
    transition: 'transform 0.05s linear, box-shadow 0.3s ease'
  };
});

const glareStyle = computed(() => ({
  background: `radial-gradient(circle at ${glareX.value}% ${glareY.value}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 60%)`,
  opacity: glareOpacity.value,
  transition: isHovering.value ? 'opacity 0.15s ease' : 'opacity 0.5s ease'
}));

const handleMouseMove = (e) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const card = cardRef.value;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  // Coordenadas do mouse relativas ao centro do card (-0.5 a 0.5)
  const relativeX = (e.clientX - rect.left) / width - 0.5;
  const relativeY = (e.clientY - rect.top) / height - 0.5;

  // Rotação máxima de 10 graus
  const maxRotation = 10;
  rotateY.value = relativeX * maxRotation;
  rotateX.value = -relativeY * maxRotation; // Eixo Y rotaciona com movimento X, Eixo X rotaciona invertido com movimento Y

  // Posição do brilho reflexivo (porcentagem de 0 a 100)
  glareX.value = ((e.clientX - rect.left) / width) * 100;
  glareY.value = ((e.clientY - rect.top) / height) * 100;
};

const handleMouseEnter = () => {
  isHovering.value = true;
  glareOpacity.value = 1;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  rotateX.value = 0;
  rotateY.value = 0;
  glareOpacity.value = 0;
};
</script>

<style scoped>
.project-card-container {
  perspective: 1000px;
  height: 100%;
}

.project-card {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-style: preserve-3d;
  will-change: transform;
}

.card-glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.project-img-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
  transform: translateZ(20px); /* Traz a imagem ligeiramente para frente em 3D */
}

.project-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover .project-img {
  transform: scale(1.05);
}

.project-tags {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  z-index: 2;
}

.tag {
  background: rgba(8, 8, 10, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-primary);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.project-content {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  transform: translateZ(30px); /* Traz o texto ainda mais para a frente para efeito parallax */
}

.project-title {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.project-desc {
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 1.8rem;
  flex-grow: 1;
}

.project-links {
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
}

.project-link {
  font-size: 0.88rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  transition: var(--transition-fast);
}

.project-link:hover {
  color: var(--color-primary);
  transform: translateY(-1px);
}

.project-status {
  color: var(--text-muted);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
</style>
