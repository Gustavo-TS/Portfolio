const sharedProfile = {
  name: 'Gustavo Tagliatti Sampaio',
  location: 'São Paulo, SP – Brasil',
  avatar: '/assets/eu.png',
  resumeUrl: '#',
  socials: {
    github: '#',
    linkedin: 'https://linkedin.com/in/gustavo-tagliatti-sampaio-8989aa323',
    email: 'guths2006@gmail.com',
    instagram: '#'
  }
};

const projectImages = {
  fidelity: '/assets/projects/fidelity.png',
  xsfera: 'https://xsfera.com.br/wp-content/uploads/2022/09/Logo-2.svg',
  maia: '/assets/projects/maia.png',
  blueProjects: 'https://www.blueprojects.com.br/wp-content/uploads/2020/03/blueprojects-logo-headr.png',
  rochaCalderon: 'https://rochacalderon.com.br/wp-content/uploads/2024/12/logo-30-anos_RC-07-1.png',
  bttech: 'https://regulabt.bttech.com.br/assets/logo-small-7fd48107.png'
};

const skills = [
  { name: 'C#', category: 'Linguagens', icon: 'fas fa-code', color: '#9b4f96' },
  { name: 'JavaScript ES6+', category: 'Linguagens', icon: 'fab fa-js', color: '#f7df1e' },
  { name: 'Java', category: 'Linguagens', icon: 'fab fa-java', color: '#f89820' },
  { name: 'TypeScript', category: 'Linguagens', icon: 'fas fa-code', color: '#3178c6' },
  { name: '.NET Core / Framework', category: 'Frameworks', icon: 'fas fa-layer-group', color: '#512bd4' },
  { name: 'Node.js', category: 'Frameworks', icon: 'fab fa-node-js', color: '#339933' },
  { name: 'Vue.js', category: 'Frameworks', icon: 'fab fa-vuejs', color: '#42b883' },
  { name: 'SQL Server', category: 'Bancos de Dados', icon: 'fas fa-database', color: '#cc2927' },
  { name: 'MySQL', category: 'Bancos de Dados', icon: 'fas fa-database', color: '#4479a1' },
  { name: 'PostgreSQL', category: 'Bancos de Dados', icon: 'fas fa-database', color: '#4169e1' },
  { name: 'AWS Lambda & S3', category: 'Cloud', icon: 'fab fa-aws', color: '#ff9900' },
  { name: 'Serverless Framework', category: 'Cloud', icon: 'fas fa-cloud', color: '#fd5750' },
  { name: 'Microserviços', category: 'Arquitetura', icon: 'fas fa-network-wired', color: '#06b6d4' },
  { name: 'REST APIs', category: 'Arquitetura', icon: 'fas fa-server', color: '#a855f7' },
  { name: 'OpenAI API', category: 'Inteligência Artificial', icon: 'fas fa-brain', color: '#10a37f' },
  { name: 'Git & CI/CD', category: 'Ferramentas', icon: 'fab fa-git-alt', color: '#f05032' },
  { name: 'Scrum / Kanban', category: 'Metodologias', icon: 'fas fa-list-check', color: '#ec4899' },
  { name: 'Inglês C1', category: 'Idiomas', icon: 'fas fa-language', color: '#73e0ff' }
];

export const portfolioData = {
  profile: {
    ...sharedProfile,
    role: 'Desenvolvedor Full Stack | C#/.NET, Node.js, Vue.js e AWS',
    about: 'Graduando em Engenharia de Software com experiência no ecossistema de serviços financeiros, compliance regulatório e soluções baseadas em Inteligência Artificial. Desenvolvo APIs robustas, arquiteturas serverless e produtos digitais escaláveis.'
  },
  skills,
  experiences: [
    {
      role: 'Desenvolvedor Full Stack Junior',
      company: 'Blue Projects',
      period: '2025 – Presente',
      description: 'Desenvolvimento de soluções para serviços financeiros, sistemas bancários empresariais, compliance regulatório, inteligência artificial e plataformas internas. Atuação full stack com APIs, interfaces, integrações e bancos de dados relacionais.',
      tags: ['C#', '.NET', 'JavaScript', 'Vue.js', 'SQL', 'AWS']
    }
  ],
  education: [
    {
      role: 'Bacharelado em Engenharia de Software',
      company: 'Centro Universitário Eniac',
      period: 'Jul 2025 – Dez 2026',
      description: 'Graduação em andamento com foco em engenharia, arquitetura e desenvolvimento de software.',
      tags: ['Formação Acadêmica', 'Em andamento']
    },
    {
      role: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
      company: 'Centro Universitário Eniac',
      period: 'Ago 2024 – Jul 2025',
      description: 'Formação superior em análise, projeto, desenvolvimento e manutenção de sistemas.',
      tags: ['Formação Acadêmica', 'ADS']
    },
    {
      role: 'Ensino Médio Técnico em Informática',
      company: 'Eniac',
      period: '2022 – 2024',
      description: 'Formação técnica com projetos acadêmicos e tecnológicos reconhecidos na MostraTech como melhor projeto da instituição e do curso técnico.',
      tags: ['Técnico em Informática', 'MostraTech']
    }
  ],
  courses: [
    {
      role: 'Programa Avançado de Inglês',
      company: 'Opengate School',
      period: 'Jul 2020 – Dez 2022',
      description: 'Formação avançada em inglês, consolidando proficiência fluente no nível C1.',
      tags: ['Inglês', 'C1', 'Formação Complementar']
    },
    {
      role: 'Curso de Inglês',
      company: 'Fisk Language School',
      period: 'Jan 2017 – Jul 2020',
      description: 'Formação continuada em língua inglesa.',
      tags: ['Inglês', 'Formação Complementar']
    }
  ],
  projects: [
    {
      title: 'Fidelity (HSBC/ NBC / Santander)',
      description: 'Desenvolvimento e manutenção de APIs robustas em C# (.NET) focadas em gerenciamento de cartões e sistemas bancários empresariais (Corporate Banking). Integração APIs e otimização de consultas em bancos de dados relacionais para garantir a consistência e a baixa latência exigidas pelo setor bancário.',
      category: 'Fintech', image: projectImages.fidelity, demoUrl: '#', githubUrl: '#',
      tags: ['C#', '.NET', 'APIs', 'SQL']
    },
    {
      title: 'Xsfera AI Assist',
      description: 'Desenvolvimento de uma solução de Inteligência Artificial (IA) para consultas regulatórias automáticas e instantâneas ao Banco Central do Brasil (BCB). Integração do processamento de linguagem natural da OpenAI com curadoria humana especializada, resultando em ganho significativo de eficiência e precisão para equipes de compliance.',
      category: 'Inteligência Artificial', image: projectImages.xsfera, demoUrl: '#', githubUrl: '#',
      tags: ['JavaScript', 'SQL Server', 'OpenAI API', 'Compliance']
    },
    {
      title: 'Xsfera Capital Monitor',
      description: 'Projeto e implementação de um sistema de gestão de capital focado em conformidade regulatória, cálculo preciso e controle de PRIP e PRS5. Automação da geração de relatórios DLO, mitigando erros manuais e otimizando a eficiência operacional do cliente.',
      category: 'Fintech', image: projectImages.xsfera, demoUrl: '#', githubUrl: '#',
      tags: ['JavaScript', 'SQL Server', 'AWS Lambda', 'S3', 'Serverless']
    },
    {
      title: 'RegulaBT (BTTECH)',
      description: 'Sustentação e evolução de plataforma voltada para o acompanhamento regulatório, centralizando normativos, publicações e estudos do Banco Central. Correção de bugs críticos, refatoração de layouts e desenvolvimento de novas telas/funcionalidades de alta usabilidade.',
      category: 'RegTech', image: projectImages.bttech, demoUrl: '#', githubUrl: '#',
      tags: ['PostgreSQL', 'JavaScript', 'Vue.js']
    },
    {
      title: 'Studio Juris (BTTECH)',
      description: 'Desenvolvimento full stack de ponta a ponta (infraestrutura, APIs e interfaces) para sistema de gestão interna e acompanhamento de entregas jurídicas.',
      category: 'Full Stack', image: projectImages.bttech, demoUrl: '#', githubUrl: '#',
      tags: ['SQL Server', 'JavaScript', 'Vue.js']
    },
    {
      title: 'Maia – Plataforma Educacional',
      description: 'Implementação de recursos de front-end focados em acessibilidade e usabilidade para uma plataforma educacional inclusiva voltada a alunos com diferenças de aprendizagem.',
      category: 'Educação', image: projectImages.maia, demoUrl: '#', githubUrl: '#',
      tags: ['Vue.js', 'Acessibilidade', 'UX']
    },
    {
      title: 'EPM – Enterprise Process Manager',
      description: 'Atuação em ferramenta interna de otimização de processos corporativos através do desenvolvimento e ajuste de Stored Procedures e UDFs customizadas.',
      category: 'Enterprise', image: projectImages.blueProjects, demoUrl: '#', githubUrl: '#',
      tags: ['JavaScript', 'MySQL', 'Stored Procedures', 'UDFs']
    },
    {
      title: 'EPM 2 – Enterprise Process Manager',
      description: 'Atuação no desenvolvimento do front-end da segunda versão da ferramenta interna de otimização de processos corporativos.',
      category: 'Enterprise', image: projectImages.blueProjects, demoUrl: '#', githubUrl: '#',
      tags: ['JavaScript', 'Vue.js', 'Front-end']
    },
    {
      title: 'Escritório Rocha Calderon',
      description: 'Desenvolvimento full stack de ponta a ponta (infraestrutura, APIs e interfaces) para sistema de gestão interna e acompanhamento de entregas jurídicas.',
      category: 'Full Stack', image: projectImages.rochaCalderon, demoUrl: '#', githubUrl: '#',
      tags: ['SQL Server', 'JavaScript', 'Vue.js']
    }
  ]
};

export const portfolioContentEn = {
  profile: {
    role: 'Full Stack Developer | C#/.NET, Node.js, Vue.js and AWS',
    about: 'Software Engineering undergraduate with experience in financial services, regulatory compliance and AI-powered solutions. I build robust APIs, serverless architectures and scalable digital products.'
  },
  experiences: [
    { role: 'Junior Full Stack Developer', company: 'Blue Projects', period: '2025 – Present', description: 'Development of solutions for financial services, corporate banking, regulatory compliance, artificial intelligence and internal platforms. Full stack work across APIs, interfaces, integrations and relational databases.', tags: ['C#', '.NET', 'JavaScript', 'Vue.js', 'SQL', 'AWS'] }
  ],
  education: [
    { role: 'BSc in Software Engineering', company: 'Centro Universitário Eniac', period: 'Jul 2025 – Dec 2026', description: 'Degree in progress focused on software engineering, architecture and development.', tags: ['Higher Education', 'In progress'] },
    { role: 'Associate Degree in Systems Analysis and Development', company: 'Centro Universitário Eniac', period: 'Aug 2024 – Jul 2025', description: 'Higher education covering systems analysis, design, development and maintenance.', tags: ['Higher Education', 'Systems Development'] },
    { role: 'Technical High School Diploma in Information Technology', company: 'Eniac', period: '2022 – 2024', description: 'Technical education with academic technology projects recognized at MostraTech as the best project across the institution and technical program.', tags: ['Information Technology', 'MostraTech'] }
  ],
  courses: [
    { role: 'Advanced English Program', company: 'Opengate School', period: 'Jul 2020 – Dec 2022', description: 'Advanced English education consolidating fluent C1 proficiency.', tags: ['English', 'C1', 'Additional Education'] },
    { role: 'English Course', company: 'Fisk Language School', period: 'Jan 2017 – Jul 2020', description: 'Continued English-language education.', tags: ['English', 'Additional Education'] }
  ],
  projects: [
    { title: 'Fidelity — Corporate Banking', description: 'Development and maintenance of robust C#/.NET APIs for card management and corporate banking systems serving clients such as HSBC, NBC and Santander. Optimized integrations and relational queries for consistency and low latency.', category: 'Fintech', image: projectImages.fidelity, demoUrl: '#', githubUrl: '#', tags: ['C#', '.NET', 'APIs', 'SQL'] },
    { title: 'Xsfera AI Assist', description: 'AI solution for instant regulatory queries to the Central Bank of Brazil, combining OpenAI natural-language processing with specialized human curation to improve compliance efficiency and accuracy.', category: 'Artificial Intelligence', image: projectImages.xsfera, demoUrl: '#', githubUrl: '#', tags: ['JavaScript', 'SQL Server', 'OpenAI API', 'Compliance'] },
    { title: 'Xsfera Capital Monitor', description: 'Capital management and regulatory compliance system for PRIP and PRS5 calculations and controls, including automated DLO reporting to reduce manual errors and improve operations.', category: 'Fintech', image: projectImages.xsfera, demoUrl: '#', githubUrl: '#', tags: ['JavaScript', 'SQL Server', 'AWS Lambda', 'S3', 'Serverless'] },
    { title: 'RegulaBT — BTTECH', description: 'Maintenance and evolution of a regulatory monitoring platform centralizing standards, publications and Central Bank studies. Critical bug fixes, layout refactoring and new features.', category: 'RegTech', image: projectImages.bttech, demoUrl: '#', githubUrl: '#', tags: ['PostgreSQL', 'JavaScript', 'Vue.js'] },
    { title: 'Maia — Educational Platform', description: 'Accessible and usable front-end features for an inclusive educational platform serving students with learning differences.', category: 'Education', image: projectImages.maia, demoUrl: '#', githubUrl: '#', tags: ['Vue.js', 'Accessibility', 'UX'] },
    { title: 'EPM — Enterprise Process Manager', description: 'Corporate process optimization through the development and adjustment of custom Stored Procedures and UDFs in an internal tool.', category: 'Enterprise', image: projectImages.blueProjects, demoUrl: '#', githubUrl: '#', tags: ['JavaScript', 'MySQL', 'Stored Procedures', 'UDFs'] },
    { title: 'EPM 2 — Enterprise Process Manager', description: 'Front-end development for the second version of the internal corporate process optimization tool.', category: 'Enterprise', image: projectImages.blueProjects, demoUrl: '#', githubUrl: '#', tags: ['JavaScript', 'Vue.js', 'Front-end'] },
    { title: 'Rocha Calderon Management System', description: 'End-to-end full stack development — infrastructure, APIs and interfaces — for internal management and legal-delivery tracking.', category: 'Full Stack', image: projectImages.rochaCalderon, demoUrl: '#', githubUrl: '#', tags: ['SQL Server', 'JavaScript', 'Vue.js'] },
    { title: 'Studio Juris (BTTECH)', description: 'End-to-end full stack development — infrastructure, APIs and interfaces — for internal management and legal-delivery tracking.', category: 'Full Stack', image: projectImages.bttech, demoUrl: '#', githubUrl: '#', tags: ['SQL Server', 'JavaScript', 'Vue.js'] }
  ]
};
