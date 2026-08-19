<template>
  <canvas ref="canvasRef" class="bg-canvas" aria-hidden="true" role="presentation"></canvas>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const canvasRef = ref(null);
let ctx = null;
let animationFrameId = null;
let prefersReducedMotion = false;
const particles = [];
const mouse = {
  x: null,
  y: null,
  radius: 120, // Raio de influência do mouse
};

// Configurações do sistema
const maxParticles = 90;
const connectionDistance = 110;

class Particle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;
    // Velocidades aleatórias baixas para flutuação suave
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 2 + 1;
    // Cor com opacidade leve
    this.color = `rgba(99, 102, 241, ${Math.random() * 0.4 + 0.1})`;
  }

  update(width, height) {
    this.width = width;
    this.height = height;
    
    // Movimento normal
    this.x += this.vx;
    this.y += this.vy;

    // Efeito de magnetismo com o mouse
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 0 && dist < mouse.radius) {
        // Atrai levemente em direção ao mouse
        const force = (mouse.radius - dist) / mouse.radius;
        this.x += (dx / dist) * force * 0.8;
        this.y += (dy / dist) * force * 0.8;
      }
    }

    // Colisão com bordas da tela
    if (this.x < 0 || this.x > width) {
      this.vx = -this.vx;
      this.x = Math.max(0, Math.min(this.x, width));
    }
    if (this.y < 0 || this.y > height) {
      this.vy = -this.vy;
      this.y = Math.max(0, Math.min(this.y, height));
    }
  }

  draw() {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';
    ctx.fill();
    // Limpar o shadowBlur para não afetar outras linhas
    ctx.shadowBlur = 0;
  }
}

const resizeCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Limpar e re-inicializar partículas se o tamanho mudar drasticamente
  const count = window.innerWidth < 768 ? Math.floor(maxParticles / 3) : maxParticles;
  
  if (particles.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
  } else {
    // Apenas atualiza dimensões das partículas existentes
    particles.forEach(p => {
      p.width = canvas.width;
      p.height = canvas.height;
    });
    
    // Corta ou adiciona partículas baseadas no tamanho
    if (particles.length > count) {
      particles.splice(count);
    } else if (particles.length < count) {
      for (let i = particles.length; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    }
  }
};

const handleMouseMove = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

const handleMouseLeave = () => {
  mouse.x = null;
  mouse.y = null;
};

const animate = () => {
  if (!ctx || !canvasRef.value) return;
  const canvas = canvasRef.value;
  
  // Limpa o canvas com um fundo bem escuro semi-transparente para deixar um rastro sutil
  ctx.fillStyle = '#08080a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Atualiza e desenha partículas
  particles.forEach(p => {
    p.update(canvas.width, canvas.height);
    p.draw();
  });
  
  // Desenha conexões
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < connectionDistance) {
        // Opacidade diminui quanto mais distante
        const alpha = (1 - dist / connectionDistance) * 0.15;
        
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        
        // Gradiente sutil entre as partículas
        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
    
    // Conexões com o mouse
    if (mouse.x !== null && mouse.y !== null) {
      const dx = particles[i].x - mouse.x;
      const dy = particles[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < mouse.radius) {
        const alpha = (1 - dist / mouse.radius) * 0.25;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        
        // Cor ciano-indigo misturada próxima ao mouse
        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
  
  if (!prefersReducedMotion && !document.hidden) {
    animationFrameId = requestAnimationFrame(animate);
  }
};

const handleVisibilityChange = () => {
  if (!document.hidden && !prefersReducedMotion && !animationFrameId) {
    animate();
  } else if (document.hidden && animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  resizeCanvas();
  animate();
  
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseleave', handleMouseLeave);
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseleave', handleMouseLeave);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>
