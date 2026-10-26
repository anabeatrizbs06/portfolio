/**
 * ====================================================================
 * CONFIGURAÇÃO DO PORTFÓLIO & CENTRAL DE LINKS
 * ====================================================================
 * 
 * Este arquivo é o local centralizado para você personalizar:
 * 1. Seus links de contato (GitHub, LinkedIn, E-mail)
 * 2. Seus projetos (links de demonstração e código no GitHub)
 * 3. Suas informações pessoais e habilidades
 * 
 * Basta alterar os valores entre aspas abaixo!
 * ====================================================================
 */

const PORTFOLIO_CONFIG = {
  // ==================================================================
  // 1. INFORMAÇÕES PESSOAIS & APRESENTAÇÃO
  // ==================================================================
  personal: {
    name: "Ana Beatriz",
    role: "Desenvolvedora Front-end & UI Designer",
    status: "Disponível para novos projetos e oportunidades",
    
    // Frase curta na seção inicial (Hero)
    heroHeadline: "Design refinado com código elegante e funcional.",
    heroDescription: "Estudante de Desenvolvimento de Sistemas unindo sensibilidade visual em UI/UX e desenvolvimento front-end com foco em performance, estética e usabilidade.",

    // Detalhes da seção Sobre Mim
    about: {
      tagline: "Transformando ideias em interfaces modernas e intuitivas.",
      paragraphs: [
        "Olá! Sou estudante de <strong>Desenvolvimento de Sistemas</strong> apaixonada por criar soluções digitais que combinam uma identidade visual marcante com uma arquitetura de código limpa.",
        "Meu foco está em unir design de interfaces (UI/UX) com tecnologias web modernas. Valorizo tipografia bem trabalhada, transições suaves, layouts responsivos e atenção meticulosa aos detalhes que tornam uma experiência memorável.",
        "Estou sempre explorando novas técnicas de front-end e boas práticas de código, pronta para colaborar em projetos criativos e desafiadores."
      ],
      quickFacts: {
        focus: "Desenvolvimento de Sistemas & Front-end",
        interests: "UI/UX Design, Interfaces Interativas, CSS Moderno",
        location: "Brasil",
        availability: "Projetos Freelance & Estágios"
      }
    }
  },

  // ==================================================================
  // 2. SEUS LINKS DE CONTATO (Preencha aqui!)
  // ==================================================================
  contact: {
    // Insira a URL do seu perfil no GitHub (Ex: "https://github.com/seu-usuario")
    github: "LINK_DO_MEU_GITHUB",

    // Insira a URL do seu perfil no LinkedIn (Ex: "https://linkedin.com/in/seu-perfil")
    linkedin: "LINK_DO_MEU_LINKEDIN",

    // Insira seu endereço de e-mail (Ex: "seu-email@gmail.com")
    email: "MEU_EMAIL"
  },

  // ==================================================================
  // 3. HABILIDADES & FERRAMENTAS
  // ==================================================================
  skills: [
    { name: "HTML5 Semântico", category: "frontend" },
    { name: "CSS3 & Flexbox / Grid", category: "frontend" },
    { name: "JavaScript Puro (ES6+)", category: "frontend" },
    { name: "UI & UX Design", category: "design" },
    { name: "Design Systems & Tipografia", category: "design" },
    { name: "Prototipagem no Figma", category: "design" },
    { name: "Git & GitHub", category: "tools" },
    { name: "Design Responsivo & Mobile First", category: "frontend" },
    { name: "Acessibilidade Web (a11y)", category: "tools" }
  ],

  // ==================================================================
  // 4. SEUS PROJETOS
  // ==================================================================
  // Você pode editar os títulos, descrições, tags e links de cada projeto.
  // Para adicionar mais projetos, basta duplicar um dos blocos { ... } abaixo.
  // ==================================================================
  projects: [
    {
      id: 1,
      number: "01",
      title: "Landing Page Aesthetic & Interativa",
      category: "Web Design / Front-end",
      description: "Interface com visual minimalista e moderno, desenvolvida com micro-interações elegantes, tipografia refinada e layout 100% responsivo.",
      tags: ["HTML5", "CSS3", "JavaScript", "UI Design"],
      image: "assets/images/project-1.svg",
      
      // Insira o link do projeto publicado no ar:
      demoUrl: "LINK_DO_PROJETO_1",
      
      // Insira o link do repositório no GitHub:
      githubUrl: "LINK_GITHUB_PROJETO_1"
    },
    {
      id: 2,
      number: "02",
      title: "Aplicação Web de Gestão & Foco",
      category: "Aplicação Front-end",
      description: "Sistema para organização pessoal e gestão de atividades diárias, com armazenamento local no navegador, filtros dinâmicos e navegação fluida.",
      tags: ["JavaScript Puro", "DOM API", "CSS Grid", "Clean Code"],
      image: "assets/images/project-2.svg",
      
      // Insira o link do projeto publicado no ar:
      demoUrl: "LINK_DO_PROJETO_2",
      
      // Insira o link do repositório no GitHub:
      githubUrl: "LINK_GITHUB_PROJETO_2"
    },
    {
      id: 3,
      number: "03",
      title: "Design System & Dashboard de Métricas",
      category: "UI/UX & Front-end",
      description: "Biblioteca de componentes reutilizáveis e dashboard com tema escuro e detalhes em lilás, pensada para visualização harmoniosa de dados.",
      tags: ["CSS Custom Properties", "JavaScript", "Componentização", "UX"],
      image: "assets/images/project-3.svg",
      
      // Insira o link do projeto publicado no ar:
      demoUrl: "LINK_DO_PROJETO_3",
      
      // Insira o link do repositório no GitHub:
      githubUrl: "LINK_GITHUB_PROJETO_3"
    }
  ]
};
