<template>
  <div class="skills-grid" role="list" :aria-label="language === 'en' ? 'Technologies and tools' : 'Tecnologias e ferramentas'">
    <div
      v-for="(skill, index) in skills" 
      :key="skill.name"
      class="skill-card glass-panel reveal"
      :class="`delay-${(index % 4) + 1}`"
      role="listitem"
      @mouseenter="hoveredSkill = skill.name"
      @mouseleave="hoveredSkill = null"
      :style="getSkillCardStyle(skill)"
    >
      <div 
        class="skill-icon" 
        :style="{ color: hoveredSkill === skill.name ? skill.color : 'var(--text-secondary)' }"
      >
        <i :class="skill.icon" aria-hidden="true"></i>
      </div>
      <span class="skill-name">{{ skill.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  skills: {
    type: Array,
    required: true
  },
  language: {
    type: String,
    default: 'pt'
  }
});

const hoveredSkill = ref(null);

const getSkillCardStyle = (skill) => {
  const itemIndex = props.skills.findIndex(item => item.name === skill.name) % 4;
  if (hoveredSkill.value === skill.name) {
    return {
      '--item-index': itemIndex,
      borderColor: skill.color,
      boxShadow: `0 0 20px ${skill.color}25`, // Adiciona um glow com 15% de opacidade
      transform: 'translateY(-5px)',
      background: 'rgba(255, 255, 255, 0.05)'
    };
  }
  return { '--item-index': itemIndex };
};
</script>

<style scoped>
/* Os estilos básicos já estão definidos globalmente no style.css, aqui fazemos pequenos ajustes se necessário */
.skill-card {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
