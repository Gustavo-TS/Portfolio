<template>
  <div @mousemove="handleGlobalMouseMove">
    <CustomCursor />
    <BackgroundCanvas />
    <div class="glow-blob blob-1"></div><div class="glow-blob blob-2"></div><div class="glow-blob blob-3"></div>

    <nav class="navbar scrolled">
      <div class="container">
        <a href="#" class="logo" @click.prevent="goToSection(0)">GUSTAVO<span class="logo-dot"></span></a>
        <ul class="nav-links" :class="{ active: isMobileMenuOpen }">
          <li v-for="(section, index) in sections" :key="section.name"><a href="#" class="nav-link" :class="{ active: activeSectionIndex === index }" @click.prevent="goToSection(index)">{{ section.label }}</a></li>
        </ul>
        <button class="language-toggle" type="button" :aria-label="copy.languageLabel" @click="toggleLanguage"><span :class="{ active: language === 'pt' }">PT</span><i aria-hidden="true"></i><span :class="{ active: language === 'en' }">EN</span></button>
        <button class="nav-toggle" type="button" :aria-expanded="isMobileMenuOpen" :aria-label="isMobileMenuOpen ? copy.closeMenu : copy.openMenu" @click="isMobileMenuOpen = !isMobileMenuOpen"><i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" aria-hidden="true"></i></button>
      </div>
    </nav>

    <div class="side-nav">
      <button v-for="(section, index) in sections" :key="`side-${section.name}`" class="side-dot-btn" :class="{ active: activeSectionIndex === index }" :aria-label="section.label" @click="goToSection(index)"><span class="side-dot-label">{{ section.label }}</span></button>
    </div>

    <div class="sections-viewport" @wheel.prevent="handleWheel" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <Transition :name="transitionName" @after-enter="handleTransitionEnd">
        <div :key="activeSectionIndex" class="section-slide">
          <div class="container">
            <div v-if="activeSectionIndex === 0" class="hero-grid">
              <div class="hero-card-3d-wrapper"><div class="hero-card-3d glass-panel" :style="heroCardStyle">
                <div class="hero-tag"><span></span>{{ copy.available }}</div>
                <h1 class="hero-title">{{ copy.hello }}<br><span class="text-gradient-clip">{{ localizedPortfolio.profile.name }}</span></h1>
                <p class="hero-desc">{{ localizedPortfolio.profile.role }}. {{ localizedPortfolio.profile.about }}</p>
                <div class="hero-actions"><MagneticButton><button class="btn btn-primary" @click="goToSection(2)">{{ copy.viewProjects }} <i class="fas fa-arrow-right" aria-hidden="true"></i></button></MagneticButton><MagneticButton><button class="btn btn-secondary" @click="goToSection(4)">{{ copy.contact }}</button></MagneticButton></div>
              </div></div>
              <div class="hero-visual"><div class="avatar-wrapper" :style="avatarParallaxStyle"><div class="glow-ring"></div><img :src="localizedPortfolio.profile.avatar" :alt="copy.avatarAlt" class="avatar-img"></div></div>
            </div>

            <div v-else-if="activeSectionIndex === 1" class="about-grid">
              <div class="about-card glass-panel"><h3 class="about-info-title">{{ copy.aboutTitle }}</h3><p class="about-text">{{ copy.aboutParagraphOne }}</p><p class="about-text">{{ copy.aboutParagraphTwo }}</p><div class="about-experience"><h4 class="about-experience-title">{{ copy.experienceTitle }}</h4><ExperienceTimeline :experiences="localizedPortfolio.experiences" /></div><div class="about-stats"><div class="stat-item"><span class="stat-num">1+</span><span class="stat-label">{{ copy.years }}</span></div><div class="stat-item"><span class="stat-num">7</span><span class="stat-label">{{ copy.projects }}</span></div><div class="stat-item"><span class="stat-num">C1</span><span class="stat-label">{{ copy.english }}</span></div></div></div>
              <div class="skills-wrapper"><h3 class="about-info-title">{{ copy.techStack }}</h3><SkillsGrid :skills="localizedPortfolio.skills" :language="language" /></div>
            </div>

            <div v-else-if="activeSectionIndex === 2" class="projects-wrapper"><div class="section-header"><span class="section-subtitle">{{ copy.myWork }}</span><h2 class="section-title">{{ copy.projectsTitle }}</h2></div><ProjectCarousel3D :projects="localizedPortfolio.projects" :language="language" /></div>

            <div v-else-if="activeSectionIndex === 3" class="education-wrapper">
              <div class="section-header"><span class="section-subtitle">{{ copy.educationSubtitle }}</span><h2 class="section-title">{{ copy.academicBackgroundTitle }}</h2></div>
              <div class="education-grid">
                <div class="education-column"><h3 class="education-column-title">{{ copy.educationTitle }}</h3><ExperienceTimeline :experiences="localizedPortfolio.education" /></div>
                <div class="education-column"><h3 class="education-column-title">{{ copy.coursesTitle }}</h3><ExperienceTimeline :experiences="localizedPortfolio.courses" /></div>
              </div>
            </div>

            <div v-else class="contact-grid">
              <div class="contact-card glass-panel"><h3 class="contact-title">{{ copy.contactTitle }}</h3><p class="contact-intro">{{ copy.contactIntro }}</p><ul class="contact-info-list"><li class="contact-info-item"><div class="contact-icon-box"><i class="fas fa-location-dot" aria-hidden="true"></i></div><div><span class="contact-info-label">{{ copy.location }}</span><span class="contact-info-value">{{ localizedPortfolio.profile.location }}</span></div></li><li class="contact-info-item"><div class="contact-icon-box"><i class="fas fa-envelope" aria-hidden="true"></i></div><div><span class="contact-info-label">E-mail</span><a :href="`mailto:${localizedPortfolio.profile.socials.email}`" class="contact-info-value">{{ localizedPortfolio.profile.socials.email }}</a></div></li><li class="contact-info-item"><div class="contact-icon-box"><i class="fab fa-linkedin-in" aria-hidden="true"></i></div><div><span class="contact-info-label">LinkedIn</span><a :href="localizedPortfolio.profile.socials.linkedin" target="_blank" rel="noopener noreferrer" class="contact-info-value">linkedin.com/in/gustavo-tagliatti-sampaio-8989aa323</a></div></li></ul></div>
              <form class="contact-form glass-panel" @submit.prevent="submitForm"><div v-if="!formSubmitted"><div class="form-group"><label for="name" class="form-label">{{ copy.name }}</label><input id="name" v-model="formData.name" type="text" class="form-control" :placeholder="copy.namePlaceholder" required></div><div class="form-group"><label for="email" class="form-label">E-mail</label><input id="email" v-model="formData.email" type="email" class="form-control" :placeholder="copy.emailPlaceholder" required></div><div class="form-group"><label for="message" class="form-label">{{ copy.message }}</label><textarea id="message" v-model="formData.message" rows="4" class="form-control" :placeholder="copy.messagePlaceholder" required></textarea></div><MagneticButton style="width:100%"><button type="submit" class="btn btn-primary form-submit" :disabled="isSubmitting"><span v-if="isSubmitting"><i class="fas fa-spinner fa-spin" aria-hidden="true"></i> {{ copy.sending }}</span><span v-else>{{ copy.send }} <i class="fas fa-paper-plane" aria-hidden="true"></i></span></button></MagneticButton></div><div v-else class="form-success-msg" role="status"><i class="fas fa-check-circle fa-2x" aria-hidden="true"></i><div><h4>{{ copy.sentTitle }}</h4><p>{{ copy.sentMessage }}</p></div></div></form>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { portfolioContentEn, portfolioData } from './data.js';
import BackgroundCanvas from './components/BackgroundCanvas.vue';
import CustomCursor from './components/CustomCursor.vue';
import ExperienceTimeline from './components/ExperienceTimeline.vue';
import MagneticButton from './components/MagneticButton.vue';
import ProjectCarousel3D from './components/ProjectCarousel3D.vue';
import SkillsGrid from './components/SkillsGrid.vue';

const translations = {
  pt: { nav:['Início','Sobre','Projetos','Formação Acadêmica','Contato'], languageLabel:'Mudar idioma para inglês', openMenu:'Abrir menu', closeMenu:'Fechar menu', available:'Disponível para novos projetos', hello:'Olá, eu sou', viewProjects:'Ver Projetos', contact:'Contato', avatarAlt:'Avatar de Gustavo Tagliatti Sampaio', aboutTitle:'Engenharia, finanças e inovação', aboutParagraphOne:'Graduando em Engenharia de Software e Desenvolvedor Full Stack com atuação no ecossistema de serviços financeiros, sistemas bancários empresariais e compliance regulatório.', aboutParagraphTwo:'Experiência com APIs em C#/.NET e Node.js, soluções em Vue.js, bancos relacionais, arquitetura AWS Serverless e Inteligência Artificial. Projetos acadêmicos e técnicos premiados na MostraTech.', years:'Ano de Exp', projects:'Projetos reais', english:'Inglês', techStack:'Competências Técnicas', myWork:'Projetos Profissionais', projectsTitle:'Soluções em Fintech, RegTech e IA', experienceTitle:'Experiência Profissional', educationSubtitle:'Trajetória de estudos', academicBackgroundTitle:'Formação Acadêmica', educationTitle:'Graduações', coursesTitle:'Cursos e Idiomas', contactTitle:'Vamos conversar?', contactIntro:'Estou em São Paulo e disponível para oportunidades, projetos e conversas sobre tecnologia, serviços financeiros e inteligência artificial.', location:'Localização', name:'Nome', namePlaceholder:'Seu nome', emailPlaceholder:'seu.email@exemplo.com', message:'Mensagem', messagePlaceholder:'Escreva sua mensagem...', sending:'Enviando...', send:'Enviar Mensagem', sentTitle:'Mensagem Enviada!', sentMessage:'Obrigado pelo contato. Responderei em breve!' },
  en: { nav:['Home','About','Projects','Academic Background','Contact'], languageLabel:'Switch language to Portuguese', openMenu:'Open menu', closeMenu:'Close menu', available:'Available for new projects', hello:"Hi, I'm", viewProjects:'View Projects', contact:'Contact', avatarAlt:'Avatar of Gustavo Tagliatti Sampaio', aboutTitle:'Engineering, finance and innovation', aboutParagraphOne:'Software Engineering undergraduate and Full Stack Developer working across financial services, corporate banking systems and regulatory compliance.', aboutParagraphTwo:'Experience with C#/.NET and Node.js APIs, Vue.js solutions, relational databases, AWS Serverless architecture and Artificial Intelligence. Award-winning academic and technical projects at MostraTech.', years:'Year Exp', projects:'Real projects', english:'English', techStack:'Technical Skills', myWork:'Professional Projects', projectsTitle:'Fintech, RegTech and AI Solutions', experienceTitle:'Professional Experience', educationSubtitle:'Learning journey', academicBackgroundTitle:'Academic Background', educationTitle:'Degrees', coursesTitle:'Courses and Languages', contactTitle:"Let's connect", contactIntro:'Based in São Paulo and available for opportunities, projects and conversations about technology, financial services and artificial intelligence.', location:'Location', name:'Name', namePlaceholder:'Your name', emailPlaceholder:'your.email@example.com', message:'Message', messagePlaceholder:'Write your message...', sending:'Sending...', send:'Send Message', sentTitle:'Message Sent!', sentMessage:'Thank you for reaching out. I will reply soon!' }
};

const language = ref(localStorage.getItem('portfolio-language') || 'pt');
const copy = computed(() => translations[language.value]);
const names = ['hero','about','projects','education','contact'];
const sections = computed(() => names.map((name,index) => ({ name, label:copy.value.nav[index] })));
const localizedPortfolio = computed(() => language.value === 'pt' ? portfolioData : { ...portfolioData, profile:{ ...portfolioData.profile, ...portfolioContentEn.profile }, experiences:portfolioContentEn.experiences, education:portfolioContentEn.education, courses:portfolioContentEn.courses, projects:portfolioContentEn.projects });
const activeSectionIndex = ref(0);
const transitionName = ref('cube-next');
const isTransitioning = ref(false);
const isMobileMenuOpen = ref(false);
const mouseCoords = ref({x:0,y:0});
const formData = reactive({name:'',email:'',message:''});
const isSubmitting = ref(false);
const formSubmitted = ref(false);
let accumulatedWheelDelta = 0;
let wheelResetTimer;
let touchStartY = 0;

const handleGlobalMouseMove = event => { mouseCoords.value = { x:(event.clientX/window.innerWidth-.5)*2, y:(event.clientY/window.innerHeight-.5)*2 }; };
const heroCardStyle = computed(() => ({ transform:`rotateX(${-mouseCoords.value.y*6}deg) rotateY(${mouseCoords.value.x*6}deg) translateZ(10px)`, transition:'transform .15s cubic-bezier(.25,1,.5,1)' }));
const avatarParallaxStyle = computed(() => ({ transform:`translate3d(${mouseCoords.value.x*15}px,${mouseCoords.value.y*15}px,60px)`, transition:'transform .2s cubic-bezier(.25,1,.5,1)' }));

const goToSection = index => { if(index<0 || index>=sections.value.length || index===activeSectionIndex.value || isTransitioning.value) return; transitionName.value=index>activeSectionIndex.value?'cube-next':'cube-prev'; activeSectionIndex.value=index; isTransitioning.value=true; isMobileMenuOpen.value=false; };
const handleTransitionEnd = () => { isTransitioning.value=false; };
const handleWheel = event => { if(isTransitioning.value){ accumulatedWheelDelta=0; return; } if(accumulatedWheelDelta && Math.sign(accumulatedWheelDelta)!==Math.sign(event.deltaY)) accumulatedWheelDelta=0; accumulatedWheelDelta+=event.deltaY; clearTimeout(wheelResetTimer); wheelResetTimer=setTimeout(()=>{accumulatedWheelDelta=0;},140); if(Math.abs(accumulatedWheelDelta)<90) return; const direction=accumulatedWheelDelta>0?1:-1; accumulatedWheelDelta=0; goToSection(activeSectionIndex.value+direction); };
const handleKeyDown = event => { if(isTransitioning.value) return; if(['ArrowDown','PageDown',' '].includes(event.key)){event.preventDefault();goToSection(activeSectionIndex.value+1);} else if(['ArrowUp','PageUp'].includes(event.key)){event.preventDefault();goToSection(activeSectionIndex.value-1);} };
const handleTouchStart = event => { touchStartY=event.touches[0].clientY; };
const handleTouchEnd = event => { if(isTransitioning.value) return; const delta=event.changedTouches[0].clientY-touchStartY; if(delta<-60) goToSection(activeSectionIndex.value+1); else if(delta>60) goToSection(activeSectionIndex.value-1); };
const updateDocumentLanguage = () => { const english=language.value==='en'; document.documentElement.lang=english?'en':'pt-BR'; document.title=english?'Gustavo Tagliatti Sampaio | Full Stack Developer Portfolio':'Gustavo Tagliatti Sampaio | Desenvolvedor Full Stack'; };
const toggleLanguage = () => { language.value=language.value==='pt'?'en':'pt'; localStorage.setItem('portfolio-language',language.value); updateDocumentLanguage(); };
const submitForm = () => { isSubmitting.value=true; setTimeout(()=>{isSubmitting.value=false;formSubmitted.value=true;formData.name='';formData.email='';formData.message='';},900); };
onMounted(()=>{updateDocumentLanguage();window.addEventListener('keydown',handleKeyDown);});
onUnmounted(()=>{clearTimeout(wheelResetTimer);window.removeEventListener('keydown',handleKeyDown);});
</script>

<style>
.projects-wrapper{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%}.about-info-title{margin-bottom:2rem}.about-experience{margin-top:2rem}.about-experience-title{font-size:1.15rem;margin-bottom:1.25rem;color:var(--color-primary)}.about-experience .timeline{padding-left:1.25rem}.about-experience .timeline-item{margin-bottom:1.5rem}.form-success-msg p{font-weight:400;font-size:.85rem;margin-top:.2rem}.education-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}.education-column-title{font-size:1.35rem;margin-bottom:1.5rem;color:var(--color-primary)}.education-column .timeline{padding-left:1.5rem}.education-column .timeline-item{margin-bottom:2rem}@media(max-width:768px){.education-grid{grid-template-columns:1fr;gap:3rem}}
</style>
