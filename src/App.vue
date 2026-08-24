<template>
  <div class="app-shell" @mousemove="handleGlobalMouseMove">
    <a class="skip-link" href="#main-content">{{ language === 'en' ? 'Skip to content' : 'Pular para o conteúdo' }}</a>
    <CustomCursor />
    <BackgroundCanvas />
    <div class="glow-blob blob-1" aria-hidden="true"></div><div class="glow-blob blob-2" aria-hidden="true"></div><div class="glow-blob blob-3" aria-hidden="true"></div>

    <nav class="navbar scrolled" :aria-label="language === 'en' ? 'Main navigation' : 'Navegação principal'">
      <div class="container">
        <a href="#hero" class="logo" @click.prevent="goToSection(0)">GUSTAVO<span class="logo-dot" aria-hidden="true"></span></a>
        <ul id="main-navigation" class="nav-links" :class="{ active: isMobileMenuOpen }">
          <li v-for="(section, index) in sections" :key="section.name"><a :href="`#${section.name}`" class="nav-link" :class="{ active: activeSectionIndex === index }" :aria-current="activeSectionIndex === index ? 'page' : undefined" @click.prevent="goToSection(index)">{{ section.label }}</a></li>
        </ul>
        <div class="nav-actions">
          <button class="language-toggle" type="button" :aria-label="copy.languageLabel" @click="toggleLanguage"><span :class="{ active: language === 'pt' }">PT</span><i aria-hidden="true"></i><span :class="{ active: language === 'en' }">EN</span></button>
          <button ref="navToggleRef" class="nav-toggle" type="button" aria-controls="main-navigation" :aria-expanded="isMobileMenuOpen" :aria-label="isMobileMenuOpen ? copy.closeMenu : copy.openMenu" @click="toggleMobileMenu"><i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" aria-hidden="true"></i></button>
        </div>
      </div>
    </nav>
    <div v-if="isMobileMenuOpen" class="nav-backdrop" aria-hidden="true" @click="closeMobileMenu(true)"></div>

    <div class="side-nav" :aria-label="language === 'en' ? 'Section navigation' : 'Navegação por seções'">
      <button v-for="(section, index) in sections" :key="`side-${section.name}`" class="side-dot-btn" :class="{ active: activeSectionIndex === index }" :aria-label="section.label" :aria-current="activeSectionIndex === index ? 'step' : undefined" @click="goToSection(index)"><span class="side-dot-label">{{ section.label }}</span></button>
    </div>

    <main id="main-content" class="sections-flow" tabindex="-1">
      <section id="hero" class="portfolio-section reveal-section is-visible" data-section-index="0">
        <div class="container">
            <div class="hero-grid">
              <div class="hero-card-3d-wrapper"><div class="hero-card-3d glass-panel" :style="heroCardStyle">
                <h1 class="hero-title" :aria-label="`${copy.hello} ${localizedPortfolio.profile.name}`">
                  <span class="hero-greeting" aria-hidden="true">{{ copy.hello }}</span>
                  <span class="text-gradient-clip hero-name" aria-hidden="true">{{ localizedPortfolio.profile.name }}</span>
                </h1>
                <p class="hero-role">{{ localizedPortfolio.profile.role }}</p>
                <p class="hero-desc">{{ localizedPortfolio.profile.about }}</p>
                <div class="hero-actions"><MagneticButton><a href="#projects" class="btn btn-primary" @click.prevent="goToSection(2)">{{ copy.viewProjects }} <i class="fas fa-arrow-right" aria-hidden="true"></i></a></MagneticButton><MagneticButton><a href="#contact" class="btn btn-secondary" @click.prevent="goToSection(4)">{{ copy.contact }}</a></MagneticButton></div>
              </div></div>
              <div class="hero-visual"><div class="avatar-wrapper"><svg class="avatar-orbit" viewBox="0 0 240 240" aria-hidden="true"><g class="orbit-track orbit-track--outer" transform="rotate(-58 120 120)"><circle class="orbit-line" cx="120" cy="120" r="112"/><circle class="orbit-dot orbit-dot--purple" cx="232" cy="120" r="4"/></g><g class="orbit-track orbit-track--middle" transform="rotate(24 120 120)"><circle class="orbit-line" cx="120" cy="120" r="98"/><circle class="orbit-dot orbit-dot--cyan" cx="218" cy="120" r="3.4"/></g><g class="orbit-track orbit-track--inner" transform="rotate(138 120 120)"><circle class="orbit-line orbit-line--dashed" cx="120" cy="120" r="84"/><circle class="orbit-dot orbit-dot--pink" cx="204" cy="120" r="3"/></g></svg><div class="glow-ring"></div><img :src="localizedPortfolio.profile.avatar" :alt="copy.avatarAlt" class="avatar-img" :style="avatarParallaxStyle" draggable="false"></div></div>
            </div>

        </div>
      </section>

      <section id="about" class="portfolio-section reveal-section" data-section-index="1" aria-labelledby="about-heading">
        <div class="container section-container--narrow">
            <div class="section-content-shell section-content-shell--narrow">
              <div class="about-grid">
                <h2 id="about-heading" class="sr-only">{{ sections[1].label }}</h2>
                <div class="about-card glass-panel"><h3 class="about-info-title">{{ copy.aboutTitle }}</h3><p class="about-text">{{ copy.aboutParagraphOne }}</p><div class="about-experience"><h3 class="about-experience-title">{{ copy.experienceTitle }}</h3><ExperienceTimeline :experiences="localizedPortfolio.experiences" :heading-level="4" /></div><div class="about-stats"><div class="stat-item"><span class="stat-num">{{ localizedPortfolio.projects.length }}</span><span class="stat-label">{{ copy.projects }}</span></div><div class="stat-item"><span class="stat-num">C1</span><span class="stat-label">{{ copy.english }}</span></div></div></div>
                <div class="skills-wrapper"><h3 class="about-info-title">{{ copy.techStack }}</h3><SkillsGrid :skills="localizedPortfolio.skills" :language="language" /></div>
              </div>
            </div>

        </div>
      </section>

      <section id="projects" class="portfolio-section reveal-section" data-section-index="2" aria-labelledby="projects-heading">
        <div class="container">
            <div class="projects-wrapper"><div class="section-header"><span class="section-subtitle">{{ copy.myWork }}</span><h2 id="projects-heading" class="section-title">{{ copy.projectsTitle }}</h2></div><ProjectCarousel3D :projects="localizedPortfolio.projects" :language="language" /></div>
        </div>
      </section>

      <section id="education" class="portfolio-section reveal-section" data-section-index="3" aria-labelledby="education-heading">
        <div class="container section-container--narrow">
            <div class="section-content-shell section-content-shell--narrow">
              <div class="education-wrapper">
                <div class="section-header"><span class="section-subtitle">{{ copy.educationSubtitle }}</span><h2 id="education-heading" class="section-title">{{ copy.academicBackgroundTitle }}</h2></div>
                <div class="education-grid">
                  <div class="education-column"><h3 class="education-column-title">{{ copy.educationTitle }}</h3><ExperienceTimeline :experiences="localizedPortfolio.education" /></div>
                  <div class="education-column"><h3 class="education-column-title">{{ copy.coursesTitle }}</h3><ExperienceTimeline :experiences="localizedPortfolio.courses" /></div>
                </div>
              </div>
            </div>

        </div>
      </section>

      <section id="contact" class="portfolio-section reveal-section" data-section-index="4" aria-labelledby="contact-heading">
        <div class="container">
            <div class="contact-grid contact-grid--compact">
              <div class="contact-card contact-card--expanded glass-panel">
                <h2 id="contact-heading" class="contact-title">{{ copy.contactTitle }}</h2>
                <p class="contact-intro">{{ copy.contactIntro }}</p>
                <ul class="contact-info-list">
                  <li class="contact-info-item"><div class="contact-icon-box"><i class="fas fa-location-dot" aria-hidden="true"></i></div><div><span class="contact-info-label">{{ copy.location }}</span><span class="contact-info-value">{{ localizedPortfolio.profile.location }}</span></div></li>
                  <li class="contact-info-item"><div class="contact-icon-box"><i class="fab fa-linkedin-in" aria-hidden="true"></i></div><div><span class="contact-info-label">LinkedIn</span><a :href="localizedPortfolio.profile.socials.linkedin" target="_blank" rel="noopener noreferrer" class="contact-info-value contact-link-alias">{{ copy.linkedinAlias }}</a></div></li>
                  <li class="contact-info-item"><div class="contact-icon-box"><i class="fab fa-github" aria-hidden="true"></i></div><div><span class="contact-info-label">GitHub</span><a :href="localizedPortfolio.profile.socials.github" target="_blank" rel="noopener noreferrer" class="contact-info-value contact-link-alias">Gustavo-TS</a></div></li>
                </ul>
                <div class="contact-actions">
                  <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary contact-action"><i class="fab fa-whatsapp" aria-hidden="true"></i> {{ language === 'en' ? 'Send WhatsApp' : 'Enviar WhatsApp' }}</a>
                  <a :href="`mailto:${localizedPortfolio.profile.socials.email}`" class="btn btn-secondary contact-action"><i class="fas fa-envelope" aria-hidden="true"></i> {{ language === 'en' ? 'Send email' : 'Enviar e-mail' }}</a>
                </div>
              </div>
            </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioContentEn, portfolioData } from './data.js';
import BackgroundCanvas from './components/BackgroundCanvas.vue';
import CustomCursor from './components/CustomCursor.vue';
import ExperienceTimeline from './components/ExperienceTimeline.vue';
import MagneticButton from './components/MagneticButton.vue';
import ProjectCarousel3D from './components/ProjectCarousel3D.vue';
import SkillsGrid from './components/SkillsGrid.vue';

gsap.registerPlugin(ScrollTrigger);

const translations = {
  pt: { nav:['Início','Sobre','Projetos','Formação Acadêmica','Contato'], languageLabel:'Mudar idioma para inglês', openMenu:'Abrir menu', closeMenu:'Fechar menu', available:'Disponível para novos projetos', hello:'Olá, eu sou', viewProjects:'Ver Projetos', contact:'Contato', avatarAlt:'Avatar de Gustavo Tagliatti Sampaio', aboutTitle:'Engenharia, finanças e inovação', aboutParagraphOne:'Graduando em Engenharia de Software e Desenvolvedor Full Stack com atuação no ecossistema de serviços financeiros, sistemas bancários empresariais e compliance regulatório.', projects:'Projetos reais', english:'Inglês', techStack:'Competências Técnicas', myWork:'Projetos Profissionais', projectsTitle:'Soluções em Fintech, RegTech e IA', experienceTitle:'Experiência Profissional', educationSubtitle:'Trajetória de estudos', academicBackgroundTitle:'Formação Acadêmica', educationTitle:'Graduações', coursesTitle:'Cursos e Idiomas', contactTitle:'Entre em contato comigo', contactIntro:'Estou em São Paulo e disponível para oportunidades, projetos e conversas sobre tecnologia, serviços financeiros e inteligência artificial.', location:'Localização', linkedinAlias:'Ver perfil no LinkedIn', name:'Nome', namePlaceholder:'Seu nome', emailPlaceholder:'seu.email@exemplo.com', message:'Mensagem', messagePlaceholder:'Escreva sua mensagem...', sending:'Enviando...', send:'Enviar Mensagem', sentTitle:'Mensagem Enviada!', sentMessage:'Obrigado pelo contato. Responderei em breve!' },
  en: { nav:['Home','About','Projects','Academic Background','Contact'], languageLabel:'Switch language to Portuguese', openMenu:'Open menu', closeMenu:'Close menu', available:'Available for new projects', hello:"Hi, I'm", viewProjects:'View Projects', contact:'Contact', avatarAlt:'Avatar of Gustavo Tagliatti Sampaio', aboutTitle:'Engineering, finance and innovation', aboutParagraphOne:'Software Engineering undergraduate and Full Stack Developer working across financial services, corporate banking systems and regulatory compliance.', projects:'Real projects', english:'English', techStack:'Technical Skills', myWork:'Professional Projects', projectsTitle:'Fintech, RegTech and AI Solutions', experienceTitle:'Professional Experience', educationSubtitle:'Learning journey', academicBackgroundTitle:'Academic Background', educationTitle:'Degrees', coursesTitle:'Courses and Languages', contactTitle:'Get in touch with me', contactIntro:'Based in São Paulo and available for opportunities, projects and conversations about technology, financial services and artificial intelligence.', location:'Location', linkedinAlias:'View LinkedIn profile', name:'Name', namePlaceholder:'Your name', emailPlaceholder:'your.email@example.com', message:'Message', messagePlaceholder:'Write your message...', sending:'Sending...', send:'Send Message', sentTitle:'Message Sent!', sentMessage:'Thank you for reaching out. I will reply soon!' }
};

const language = ref(localStorage.getItem('portfolio-language') || 'pt');
const copy = computed(() => translations[language.value]);
const names = ['hero','about','projects','education','contact'];
const sections = computed(() => names.map((name,index) => ({ name, label:copy.value.nav[index] })));
const localizedPortfolio = computed(() => language.value === 'pt' ? portfolioData : { ...portfolioData, profile:{ ...portfolioData.profile, ...portfolioContentEn.profile }, experiences:portfolioContentEn.experiences, education:portfolioContentEn.education, courses:portfolioContentEn.courses, projects:portfolioContentEn.projects });
const activeSectionIndex = ref(0);
const isMobileMenuOpen = ref(false);
const navToggleRef = ref(null);
const mouseCoords = ref({x:0,y:0});
const whatsappUrl = computed(() => {
  const message = language.value === 'en'
    ? 'Hello, Gustavo! I found your portfolio and would like to get in touch.'
    : 'Olá, Gustavo! Encontrei seu portfólio e gostaria de entrar em contato.';
  return `https://wa.me/${localizedPortfolio.value.profile.socials.whatsapp}?text=${encodeURIComponent(message)}`;
});
let lenis;
let lenisTicker;
let scrollContext;
let introContext;
let orbitContext;
let viewportMediaQuery;
let handleViewportChange;

const closeMobileMenu = (restoreFocus = false) => {
  isMobileMenuOpen.value = false;
  document.body.classList.remove('menu-open');
  if(restoreFocus) requestAnimationFrame(()=>navToggleRef.value?.focus());
};
const toggleMobileMenu = () => {
  if(isMobileMenuOpen.value){
    closeMobileMenu(true);
    return;
  }
  isMobileMenuOpen.value = true;
  document.body.classList.add('menu-open');
  requestAnimationFrame(()=>document.querySelector('#main-navigation .nav-link')?.focus());
};
const handleDocumentKeydown = event => {
  if(event.key === 'Escape' && isMobileMenuOpen.value) closeMobileMenu(true);
};

const handleGlobalMouseMove = event => {
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  mouseCoords.value = { x:(event.clientX/window.innerWidth-.5)*2, y:(event.clientY/window.innerHeight-.5)*2 };
};
const heroCardStyle = computed(() => ({ transform:`rotateX(${-mouseCoords.value.y*6}deg) rotateY(${mouseCoords.value.x*6}deg) translateZ(10px)`, transition:'transform .15s cubic-bezier(.25,1,.5,1)' }));
const avatarParallaxStyle = computed(() => ({
  transform:`perspective(1000px) rotateX(${-mouseCoords.value.y*6}deg) rotateY(${mouseCoords.value.x*6}deg)`,
  transition:'transform .15s cubic-bezier(.25,1,.5,1)'
}));

const goToSection = index => {
  if(index < 0 || index >= names.length) return;
  const target=document.getElementById(names[index]);
  const destinationOffset=index===0 ? 0 : Math.min(200,Math.max(120,window.innerHeight*.18));
  activeSectionIndex.value=index;
  if(index===names.length-1){
    const pageEnd=document.documentElement.scrollHeight-window.innerHeight;
    if(lenis) lenis.scrollTo(pageEnd,{duration:1.15});
    else window.scrollTo({top:pageEnd,behavior:'smooth'});
  } else if(lenis && target) lenis.scrollTo(target,{offset:destinationOffset,duration:1.15});
  else if(target) window.scrollTo({top:target.offsetTop+destinationOffset,behavior:'smooth'});
  closeMobileMenu();
};
const updateDocumentLanguage = () => { const english=language.value==='en'; document.documentElement.lang=english?'en':'pt-BR'; document.title=english?'Gustavo Tagliatti Sampaio | Full Stack Developer Portfolio':'Gustavo Tagliatti Sampaio | Desenvolvedor Full Stack'; };
const toggleLanguage = () => { language.value=language.value==='pt'?'en':'pt'; localStorage.setItem('portfolio-language',language.value); updateDocumentLanguage(); };
onMounted(()=>{
  updateDocumentLanguage();
  document.addEventListener('keydown',handleDocumentKeydown);
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sectionElements=gsap.utils.toArray('.portfolio-section');
  viewportMediaQuery=window.matchMedia('(max-width: 768px)');

  orbitContext=gsap.context(()=>{
    const orbitTracks=gsap.utils.toArray('.avatar-orbit .orbit-track');
    const orbitSettings=[
      {start:-58,direction:1,duration:reducedMotion ? 16 : 5.8},
      {start:24,direction:-1,duration:reducedMotion ? 21 : 8.2},
      {start:138,direction:1,duration:reducedMotion ? 27 : 11.5}
    ];
    orbitTracks.forEach((track,index)=>{
      const settings=orbitSettings[index];
      gsap.set(track,{rotation:settings.start,svgOrigin:'120 120',force3D:true});
      gsap.to(track,{rotation:`${settings.direction > 0 ? '+=' : '-='}360`,duration:settings.duration,repeat:-1,ease:'none',force3D:true});
    });
  });

  if(!reducedMotion){
    introContext=gsap.context(()=>{
      const intro=gsap.timeline({defaults:{ease:'power3.out'}});
      intro
        .from('.navbar',{y:-28,autoAlpha:0,duration:.7})
        .from('.hero-greeting',{y:24,autoAlpha:0,duration:.6},'-=.35')
        .from('.hero-name',{y:42,autoAlpha:0,rotateX:-10,duration:.72,ease:'back.out(1.45)'},'-=.42')
        .from('.hero-role, .hero-desc',{y:24,autoAlpha:0,duration:.65,stagger:.1},'-=.55')
        .from('.hero-actions .magnetic-wrapper',{y:18,autoAlpha:0,scale:.94,duration:.6,stagger:.1},'-=.45')
        .from('.hero-visual',{x:42,autoAlpha:0,scale:.9,rotate:3,duration:1},'-=.9')
        .from('.side-nav .side-dot-btn',{x:18,autoAlpha:0,duration:.4,stagger:.07},'-=.55');
    });
  }

  const startLenis=()=>{
    if(lenis) return;
    lenis=new Lenis({lerp:reducedMotion ? .16 : .075,smoothWheel:true,wheelMultiplier:.82});
    lenis.on('scroll',ScrollTrigger.update);
    lenisTicker=time=>lenis?.raf(time*1000);
    gsap.ticker.add(lenisTicker);
    gsap.ticker.lagSmoothing(0);
  };

  const stopLenis=()=>{
    if(lenisTicker) gsap.ticker.remove(lenisTicker);
    lenis?.destroy();
    lenis=undefined;
    lenisTicker=undefined;
  };

  // O scroll nativo é mais estável em touch apó interações com links,
  // botões, imagens e campos de formulário.
  if(!viewportMediaQuery.matches) startLenis();

  const setupScrollAnimations=(isMobileViewport)=>{
    scrollContext=gsap.context(()=>{
      sectionElements.forEach((section,index)=>{
        const content=section.querySelector(':scope > .container') || section;
        const entryDistance=reducedMotion ? 24 : isMobileViewport ? 46 : 96;
        const entryStart=isMobileViewport ? 'top 94%' : 'top 96%';
        const entryEnd=isMobileViewport ? 'top 68%' : 'top 52%';
        if(index>0){
          gsap.fromTo(content,
            {autoAlpha:0,y:entryDistance,scale:.985},
            {autoAlpha:1,y:0,scale:1,ease:'none',scrollTrigger:{trigger:section,start:entryStart,end:entryEnd,scrub:reducedMotion ? .2 : isMobileViewport ? .35 : .8}}
          );
        }

        if(!reducedMotion && index>0){
          const detailSelectors={
            about:'.about-info-title, .about-text, .about-experience, .stat-item, .skill-card',
            projects:'.section-subtitle, .section-title, .carousel-3d-container',
            education:'.section-subtitle, .section-title, .education-column-title, .timeline-item',
            contact:'.contact-title, .contact-intro, .contact-info-item, .contact-action'
          };
          const detailTargets=section.querySelectorAll(detailSelectors[section.id] || '');
          if(detailTargets.length){
            gsap.fromTo(detailTargets,
              {autoAlpha:0,y:isMobileViewport ? 20 : 30,scale:.97},
              {autoAlpha:1,y:0,scale:1,duration:.72,stagger:.065,ease:'back.out(1.25)',clearProps:'transform,opacity,visibility',scrollTrigger:{trigger:section,start:isMobileViewport ? 'top 86%' : 'top 78%',once:true}}
            );
          }
        }
        ScrollTrigger.create({
          trigger:section,
          start:'top center',
          end:'bottom center',
          onEnter:()=>{activeSectionIndex.value=index;},
          onEnterBack:()=>{activeSectionIndex.value=index;}
        });
      });
    });
  };

  setupScrollAnimations(viewportMediaQuery.matches);
  handleViewportChange=event=>{
    event.matches ? stopLenis() : startLenis();
    scrollContext?.revert();
    setupScrollAnimations(event.matches);
    requestAnimationFrame(()=>ScrollTrigger.refresh());
  };
  viewportMediaQuery.addEventListener('change',handleViewportChange);
  requestAnimationFrame(()=>ScrollTrigger.refresh());
  const initialSectionIndex=names.indexOf(window.location.hash.slice(1));
  if(initialSectionIndex>0) requestAnimationFrame(()=>goToSection(initialSectionIndex));
});
onUnmounted(()=>{
  document.removeEventListener('keydown',handleDocumentKeydown);
  document.body.classList.remove('menu-open');
  viewportMediaQuery?.removeEventListener('change',handleViewportChange);
  orbitContext?.revert();
  introContext?.revert();
  scrollContext?.revert();
  if(lenisTicker) gsap.ticker.remove(lenisTicker);
  lenis?.destroy();
  lenis=undefined;
});
</script>

<style>
.projects-wrapper{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%}
.about-info-title{margin-bottom:1.35rem}
.about-experience{margin-top:1.5rem}
.about-experience-title{font-size:1.02rem;margin-bottom:1rem;color:var(--color-primary)}
.about-experience .timeline{padding-left:1rem}
.about-experience .timeline-item{margin-bottom:1.1rem}
.form-success-msg p{font-weight:400;font-size:.85rem;margin-top:.2rem}
.section-content-shell{width:100%;display:flex;justify-content:center}
.section-content-shell--narrow{
  padding:0;
  zoom:.9;
}
.section-container--narrow{max-width:1440px}
.education-wrapper{width:100%}
.education-grid{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
.education-column-title{font-size:1.15rem;margin-bottom:1rem;color:var(--color-primary)}
.education-column .timeline{padding-left:1.1rem}
.education-column .timeline-item{margin-bottom:1.25rem}
.contact-link-alias{display:inline-flex;align-items:center;gap:.45rem}
.contact-link-alias::after{content:'\2197';font-size:.85em;opacity:.72}
.contact-grid--compact{
  grid-template-columns:1fr;
  max-width:1040px;
  margin:0 auto;
}
.contact-card--expanded{
  padding:clamp(2.25rem,5vw,4.5rem);
  text-align:center;
}
.contact-card--expanded .contact-title{
  font-size:clamp(2.5rem,5vw,4.5rem);
  line-height:1.05;
  margin-bottom:1.25rem;
  background:var(--text-gradient);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.contact-card--expanded .contact-intro{
  max-width:720px;
  margin:0 auto 2.25rem;
  font-size:1.05rem;
}
.contact-card--expanded .contact-info-list{
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:1rem;
  margin-bottom:2.25rem;
}
.contact-card--expanded .contact-info-item{
  align-items:center;
  padding:1rem;
  text-align:left;
  border:1px solid var(--border-color);
  border-radius:14px;
  background:rgba(255,255,255,.02);
}
.contact-actions{
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  gap:1rem;
}
.contact-action{min-width:210px;justify-content:center}
.about-grid{
  width:100%;
  max-width:1320px;
  margin:0 auto;
  grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);
  gap:2.15rem;
  align-items:stretch;
}
.about-grid .about-card{
  height:100%;
  padding:clamp(1.5rem,2.2vw,2.2rem);
}
.about-grid .skills-wrapper{
  height:100%;
  padding:.2rem 0 0;
  display:flex;
  flex-direction:column;
}
.about-grid .skills-grid{
  flex:1;
  grid-template-columns:repeat(auto-fit,minmax(96px,1fr));
  grid-auto-rows:1fr;
  gap:.65rem;
}
.about-grid .skill-card{
  min-height:76px;
  padding:.62rem .5rem;
  gap:.35rem;
}
.about-grid .skill-icon{font-size:1.64rem}
.about-grid .skill-name{font-size:.77rem;line-height:1.2}
.about-grid .about-info-title{font-size:1.55rem;margin-bottom:1rem}
.about-grid .about-text{font-size:.95rem;line-height:1.58;margin-bottom:.8rem}
.about-grid .about-experience{margin-top:1rem}
.about-grid .about-experience-title{font-size:.98rem;margin-bottom:.75rem}
.about-grid .timeline-desc{font-size:.87rem;line-height:1.48;margin-bottom:.8rem}
.about-grid .timeline-desc-list{gap:.44rem}
.about-grid .timeline-tag{font-size:.68rem;padding:.16rem .42rem}
.about-grid .about-stats{margin-top:1.1rem;gap:.8rem}
.about-grid .stat-num{font-size:1.8rem}
#about .section-content-shell--narrow{zoom:1}
.education-wrapper{max-width:1144px;margin:0 auto;width:100%}

@media(max-width:992px){
  .about-info-title{margin-bottom:1rem}
  .about-experience{margin-top:1.25rem}
  .education-grid{gap:1.75rem}
  .section-container--narrow{max-width:1100px}
  .about-grid,.education-wrapper{max-width:100%}
  .about-grid{grid-template-columns:1fr;gap:1.5rem}
  .about-grid .skills-grid{grid-template-columns:repeat(auto-fit,minmax(112px,1fr))}
  .about-grid .about-card,
  .about-grid .skills-wrapper{height:auto}
}

@media(max-width:768px){
  .section-container--narrow{max-width:100%}
  .about-grid,.education-wrapper{max-width:100%}
  .about-grid .skills-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem}
  .about-grid .skill-card{min-height:82px;padding:.65rem .5rem}
  .education-grid{grid-template-columns:1fr;gap:1.5rem}
  .education-column-title{font-size:1.02rem;margin-bottom:.8rem}
  .education-column .timeline{padding-left:.9rem}
  .education-column .timeline-item{margin-bottom:1rem}
  .contact-card--expanded{padding:2rem 1.15rem}
  .contact-card--expanded .contact-title{font-size:clamp(2.2rem,12vw,3.1rem)}
  .contact-card--expanded .contact-info-list{grid-template-columns:1fr;margin-bottom:1.5rem}
  .contact-actions{flex-direction:column}
  .contact-action{width:100%;min-width:0}
}

@supports not (zoom: 1) {
  .section-content-shell--narrow{
    transform:scale(.9);
    transform-origin:center center;
  }
}

/* Fluxo vertical real: as seções participam do layout e surgem durante o scroll. */
html{
  scroll-behavior:smooth;
  scroll-padding-top:5.5rem;
}

html,body{
  overflow-x:hidden;
  overflow-y:auto;
  height:auto;
}

.sections-flow{
  position:relative;
  width:100%;
}

.portfolio-section{
  position:relative;
  width:100%;
  min-height:100svh;
  padding:clamp(6.5rem,9vw,8rem) 0 clamp(4.5rem,7vw,7rem);
  display:flex;
  align-items:center;
  scroll-margin-top:5rem;
}

.portfolio-section > .container{
  display:block;
  flex:none;
}

.reveal-section{
  opacity:1;
  transform:none;
  transition:none;
  will-change:opacity,transform;
}

.reveal-section.is-visible{
  opacity:1;
  transform:translate3d(0,0,0);
}

@media(max-width:768px){
  html{
    overflow-x:hidden;
    overflow-y:auto;
    height:auto;
    touch-action:pan-y;
    -webkit-overflow-scrolling:touch;
  }

  body{
    overflow:visible;
    height:auto;
    min-height:100%;
    touch-action:pan-y;
  }

  .sections-flow,
  .portfolio-section,
  .portfolio-section > .container,
  .glass-panel{
    touch-action:pan-y;
  }

  .portfolio-section > .container{
    user-select:none;
    -webkit-user-select:none;
  }

  .portfolio-section :is(a,button,input,textarea,select){
    touch-action:manipulation;
  }

  .portfolio-section :is(input,textarea,select){
    user-select:text;
    -webkit-user-select:text;
  }

  .portfolio-section{
    min-height:auto;
    padding:6.5rem 0 4rem;
    align-items:flex-start;
  }

  #hero{
    min-height:100svh;
    align-items:center;
  }

  .reveal-section{
    transform:translate3d(0,28px,0);
  }
}

@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .reveal-section{
    opacity:1;
    transform:none;
    transition:none;
  }
}

/* UX refresh: hierarchy, responsive navigation and touch ergonomics */
.nav-actions{display:flex;align-items:center;gap:.65rem;flex:0 0 auto}
.nav-toggle{width:44px;height:44px;align-items:center;justify-content:center;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid var(--border-color)}
.nav-backdrop{position:fixed;inset:0;z-index:998;background:rgba(2,3,8,.7);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
body.menu-open{overflow:hidden}
.hero-greeting{display:block}
.hero-name{display:block;text-wrap:balance;overflow-wrap:anywhere;will-change:transform,opacity}
.avatar-orbit{position:absolute;inset:-18%;width:136%;height:136%;z-index:-1;overflow:visible;pointer-events:none}
.orbit-track{transform-origin:120px 120px;will-change:transform}
.orbit-line{fill:none;stroke:rgba(129,140,248,.18);stroke-width:.8}
.orbit-track--middle .orbit-line{stroke:rgba(103,232,249,.14)}
.orbit-line--dashed{stroke:rgba(240,171,252,.16);stroke-dasharray:3 5}
.orbit-dot{transform-box:fill-box;transform-origin:center;filter:drop-shadow(0 0 5px currentColor)}
.orbit-dot--purple{fill:#a5b4fc;color:#818cf8}
.orbit-dot--cyan{fill:#67e8f9;color:#22d3ee}
.orbit-dot--pink{fill:#f0abfc;color:#e879f9}
.hero-card-3d{overflow:hidden;isolation:isolate}
.hero-card-3d > *{position:relative;z-index:1}
.hero-card-3d::after{content:'';position:absolute;inset:-35%;z-index:0;background:linear-gradient(110deg,transparent 38%,rgba(129,140,248,.16) 49%,rgba(103,232,249,.1) 53%,transparent 64%);transform:translateX(-70%) rotate(4deg);pointer-events:none}
.hero-role{margin:-.55rem 0 .8rem;color:#cbd5e1;font-size:.9rem;font-weight:700;letter-spacing:.015em}
.hero-desc{text-wrap:pretty}
.section-title,.contact-title{text-wrap:balance}
.glass-panel{box-shadow:0 18px 60px rgba(0,0,0,.24),0 0 0 1px rgba(255,255,255,.015)}
.skill-card{cursor:default}
.btn-primary{background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#a21caf 100%)}
.side-dot-btn{width:32px;height:32px;background:transparent!important;display:grid;place-items:center;transform:none!important}
.side-dot-btn::before{content:'';width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.3);transition:transform .25s ease,background-color .25s ease,box-shadow .25s ease}
.side-dot-btn:hover::before{background:rgba(255,255,255,.72);transform:scale(1.2)}
.side-dot-btn.active::before{background:var(--color-primary);transform:scale(1.25);box-shadow:0 0 12px var(--color-primary)}
.side-dot-label{right:36px}

@media(min-width:769px){
  .navbar .container{max-width:1280px}
  .hero-grid{grid-template-columns:minmax(0,1.08fr) minmax(280px,.92fr);gap:clamp(2.5rem,6vw,6rem)}
  .hero-card-3d{border-color:rgba(129,140,248,.14)}
}

@media(max-width:768px){
  .navbar .container{padding-inline:1rem;justify-content:flex-start;min-width:0}
  .logo{flex:0 1 auto;min-width:0;margin-right:auto}
  .nav-actions{gap:.45rem}
  .language-toggle{margin:0;min-width:66px}
  .nav-toggle{display:flex;padding:0;z-index:1002}
  .nav-links{
    top:0;
    right:0;
    z-index:1001;
    width:min(86vw,340px);
    height:100dvh;
    padding:6.5rem 1.5rem 2rem;
    gap:.45rem;
    transform:translateX(105%);
    transition:transform .35s cubic-bezier(.16,1,.3,1);
    box-shadow:-24px 0 60px rgba(0,0,0,.45);
  }
  .nav-links.active{right:0;transform:translateX(0)}
  .nav-links li{width:100%}
  .nav-link{display:flex;align-items:center;width:100%;min-height:48px;padding:.75rem 1rem;border-radius:12px;font-size:1rem}
  .nav-link.active{background:rgba(99,102,241,.12)}
  .nav-link::after{display:none}

  #hero{padding-top:6.25rem;padding-bottom:3.5rem}
  .hero-grid{gap:1.4rem;min-width:0}
  .hero-visual{order:-1}
  .avatar-wrapper{width:clamp(164px,52vw,210px)}
  .hero-card-3d-wrapper{min-width:0}
  .hero-card-3d{width:100%;min-width:0;padding:1.35rem!important;transform:none!important}
  .hero-title{font-size:clamp(2rem,10vw,3rem);line-height:1.02;margin-bottom:1.25rem;transform:none}
  .hero-name{margin-top:.25rem}
  .hero-role{font-size:.78rem;line-height:1.45;margin:0 0 .75rem}
  .hero-desc{font-size:.92rem;line-height:1.6;margin-bottom:1.5rem;transform:none}
  .hero-actions{gap:.75rem;transform:none}
  .hero-actions .magnetic-wrapper{display:block;width:100%}
  .portfolio-section{padding:5.75rem 0 3.5rem}
  .contact-card--expanded .contact-intro{font-size:.95rem;line-height:1.6}
}

@media(max-width:420px){
  .container{padding-inline:.9rem}
  .language-toggle{min-width:60px;padding:.38rem .5rem}
  .hero-card-3d{padding:1.1rem!important}
  .hero-title{font-size:clamp(1.9rem,9.5vw,2.45rem)}
  .about-grid .skills-grid{gap:.5rem}
  .about-grid .skill-card{min-height:74px;padding:.55rem .35rem}
  .contact-card--expanded .contact-info-item{padding:.8rem}
}

@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}
  .hero-card-3d,.avatar-img{transform:none!important}
}

@media(prefers-contrast:more){
  :root{--text-secondary:#e2e8f0;--text-muted:#cbd5e1;--border-color:rgba(255,255,255,.3);--border-color-hover:rgba(255,255,255,.55)}
  .glass-panel{background:rgba(8,8,12,.92);backdrop-filter:none}
}

@media(prefers-reduced-motion:no-preference){
  .blob-1{animation:blob-drift-one 14s ease-in-out infinite alternate}
  .blob-2{animation:blob-drift-two 18s ease-in-out infinite alternate}
  .blob-3{animation:blob-drift-three 16s ease-in-out infinite alternate}
  .logo-dot{animation:logo-pulse 2.4s ease-in-out infinite}
  .orbit-dot--cyan{animation:orbit-dot-pulse 2.2s ease-in-out infinite}
  .hero-card-3d::after{animation:hero-light-sweep 1.6s .35s cubic-bezier(.16,1,.3,1) both}
  .hero-actions .btn-primary i{animation:arrow-nudge 1.8s ease-in-out infinite}
  .stat-num{background-size:180% 100%;animation:gradient-shift 5s ease-in-out infinite alternate}
  .contact-icon-box{transition:transform .45s cubic-bezier(.16,1,.3,1),background-color .35s ease,box-shadow .35s ease}
  .contact-info-item:hover .contact-icon-box{transform:translateY(-3px) rotate(-6deg) scale(1.08);background:rgba(129,140,248,.16);box-shadow:0 10px 24px rgba(79,70,229,.22)}
  .skill-card:hover .skill-icon{animation:skill-icon-pop .5s cubic-bezier(.34,1.56,.64,1)}
  .timeline-item:hover .timeline-badge{transform:translateY(-2px);box-shadow:0 8px 20px rgba(79,70,229,.2)}
  .timeline-badge{transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease}
  .contact-action i{transition:transform .35s cubic-bezier(.16,1,.3,1)}
  .contact-action:hover i{transform:translateY(-2px) rotate(-8deg) scale(1.12)}
}

@keyframes blob-drift-one{to{transform:translate3d(8vw,7vh,0) scale(1.08)}}
@keyframes blob-drift-two{to{transform:translate3d(-7vw,-8vh,0) scale(.92)}}
@keyframes blob-drift-three{from{transform:translate(-50%,-50%) scale(.9)}to{transform:translate(-44%,-56%) scale(1.12)}}
@keyframes logo-pulse{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(129,140,248,.35)}50%{transform:scale(1.25);box-shadow:0 0 0 7px rgba(129,140,248,0)}}
@keyframes orbit-dot-pulse{0%,100%{opacity:.5;transform:scale(.75)}50%{opacity:1;transform:scale(1.45)}}
@keyframes hero-light-sweep{from{transform:translateX(-70%) rotate(4deg);opacity:0}35%{opacity:1}to{transform:translateX(70%) rotate(4deg);opacity:0}}
@keyframes arrow-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
@keyframes gradient-shift{from{background-position:0 50%}to{background-position:100% 50%}}
@keyframes skill-icon-pop{0%{transform:scale(1) rotate(0)}55%{transform:scale(1.2) rotate(-8deg)}100%{transform:scale(1) rotate(0)}}
</style>
