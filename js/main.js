/**
 * ====================================================================
 * LÓGICA PRINCIPAL DO PORTFÓLIO (INTERAÇÕES & RENDERIZAÇÃO)
 * ====================================================================
 * Este arquivo consome os dados centralizados de `PORTFOLIO_CONFIG`
 * (localizado em js/config.js) e implementa:
 * - Renderização dinâmica de projetos, habilidades e contatos
 * - Detecção amigável de links de exemplo (evitando quebras ou 404)
 * - Menu de navegação responsivo & links ativos
 * - Animações suaves de rolagem e revelação (Scroll Reveal)
 * - Validação e envio transparente do formulário de contato via mailto
 * - Sistema de notificações toast aesthetic
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização dos módulos
  initDataBinding();
  initNavigation();
  initScrollAnimations();
  initContactForm();
  initFooter();
});

/* ====================================================================
   1. BINDING DE DADOS E RENDERIZAÇÃO A PARTIR DE js/config.js
   ==================================================================== */
function initDataBinding() {
  if (typeof PORTFOLIO_CONFIG === 'undefined') {
    console.warn('PORTFOLIO_CONFIG não foi encontrado. Verifique o arquivo js/config.js.');
    return;
  }

  const { personal, skills, projects, contact } = PORTFOLIO_CONFIG;

  // Informações Pessoais
  if (personal) {
    const heroStatus = document.getElementById('hero-status');
    const heroDesc = document.getElementById('hero-description');
    const aboutName = document.getElementById('about-name');
    const aboutRole = document.getElementById('about-role');
    const aboutParagraphs = document.getElementById('about-paragraphs');

    if (heroStatus && personal.status) heroStatus.textContent = personal.status;
    if (heroDesc && personal.heroDescription) heroDesc.textContent = personal.heroDescription;
    if (aboutName && personal.name) aboutName.textContent = personal.name;
    if (aboutRole && personal.role) aboutRole.textContent = personal.role;

    if (aboutParagraphs && personal.about && Array.isArray(personal.about.paragraphs)) {
      aboutParagraphs.innerHTML = personal.about.paragraphs
        .map(p => `<p class="bio-paragraph">${p}</p>`)
        .join('');
    }
  }

  // Renderização de Habilidades (Skills)
  const skillsContainer = document.getElementById('skills-container');
  if (skillsContainer && Array.isArray(skills)) {
    skillsContainer.innerHTML = skills.map(skill => `
      <span class="skill-pill">
        <span class="skill-pill-dot"></span>
        <span>${escapeHTML(skill.name)}</span>
      </span>
    `).join('');
  }

  // Renderização de Projetos
  const projectsContainer = document.getElementById('projects-container');
  if (projectsContainer && Array.isArray(projects)) {
    projectsContainer.innerHTML = projects.map(project => `
      <article class="project-card fade-up">
        <div class="project-preview">
          <img src="${escapeHTML(project.image)}" alt="Prévia visual do projeto ${escapeHTML(project.title)}" class="project-preview-img" loading="lazy">
        </div>
        <div class="project-details">
          <div>
            <div class="project-meta">
              <span class="project-number">${escapeHTML(project.number || '01')}</span>
              <span class="project-category">${escapeHTML(project.category || 'Web Application')}</span>
            </div>
            <h3 class="project-title">${escapeHTML(project.title)}</h3>
            <p class="project-description">${escapeHTML(project.description)}</p>
            <div class="project-tags">
              ${(project.tags || []).map(tag => `<span class="tag-item">${escapeHTML(tag)}</span>`).join('')}
            </div>
          </div>
          <div class="project-actions">
            <a href="${escapeHTML(project.demoUrl)}" class="project-btn project-btn-primary action-link" data-link-type="demo" data-label="${escapeHTML(project.title)}">
              <span>Acessar Projeto</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            <a href="${escapeHTML(project.githubUrl)}" class="project-btn project-btn-github action-link" data-link-type="github" data-label="Código no GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>Ver Código</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Renderização de Canais de Contato
  const contactContainer = document.getElementById('contact-channels');
  if (contactContainer && contact) {
    contactContainer.innerHTML = `
      <!-- Card GitHub -->
      <a href="${escapeHTML(contact.github)}" class="channel-card action-link" data-link-type="social" data-label="GitHub">
        <div class="channel-info">
          <div class="channel-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </div>
          <div>
            <div class="channel-label">Repositórios & Código</div>
            <div class="channel-value">GitHub</div>
          </div>
        </div>
        <div class="channel-action-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </a>

      <!-- Card LinkedIn -->
      <a href="${escapeHTML(contact.linkedin)}" class="channel-card action-link" data-link-type="social" data-label="LinkedIn">
        <div class="channel-info">
          <div class="channel-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
          <div>
            <div class="channel-label">Rede Profissional</div>
            <div class="channel-value">LinkedIn</div>
          </div>
        </div>
        <div class="channel-action-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </a>

      <!-- Card E-mail com Ação de Copiar -->
      <div class="channel-card action-link" id="email-card" style="cursor: pointer;" data-link-type="email" data-label="E-mail">
        <div class="channel-info">
          <div class="channel-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </div>
          <div>
            <div class="channel-label">Contato Direto</div>
            <div class="channel-value" id="email-display-text">${escapeHTML(contact.email)}</div>
          </div>
        </div>
        <div class="channel-action-icon" title="Copiar e-mail">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </div>
      </div>
    `;
  }

  // Interceptador inteligente de cliques nos links para guiar a edição
  setupActionLinkListeners();
}

/**
 * Verifica se um link é placeholder (ex: LINK_DO_PROJETO_1) ou link real.
 * Se for placeholder, abre um toast amigável instruindo onde editar!
 */
function setupActionLinkListeners() {
  document.querySelectorAll('.action-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const isPlaceholder = !href || href.startsWith('LINK_') || href === 'MEU_EMAIL' || href === '#';

      if (link.id === 'email-card') {
        e.preventDefault();
        handleEmailCardClick();
        return;
      }

      if (isPlaceholder) {
        e.preventDefault();
        const placeholderName = href || 'LINK_DE_EXEMPLO';
        showToast(
          'Espaço para seu link!',
          `Você pode adicionar o link real substituindo <strong>"${placeholderName}"</strong> no arquivo <code>js/config.js</code>.`,
          'info'
        );
      } else {
        // Link real: abre em nova aba com segurança
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });
}

function handleEmailCardClick() {
  const email = PORTFOLIO_CONFIG?.contact?.email;
  if (!email || email === 'MEU_EMAIL') {
    showToast(
      'Configuração de E-mail',
      'Defina seu e-mail real substituindo <strong>"MEU_EMAIL"</strong> no arquivo <code>js/config.js</code>.',
      'info'
    );
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      showToast('E-mail copiado!', `O endereço <strong>${email}</strong> foi copiado para a área de transferência.`, 'success');
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  } else {
    window.location.href = `mailto:${email}`;
  }
}

/* ====================================================================
   2. NAVEGAÇÃO & MENU RESPONSIVO
   ==================================================================== */
function initNavigation() {
  const headerNav = document.getElementById('header-nav');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-links .nav-link, .mobile-drawer .nav-link');

  // Efeito de rolagem no Header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      headerNav.style.transform = 'translateY(-4px)';
    } else {
      headerNav.style.transform = 'translateY(0)';
    }
  }, { passive: true });

  // Toggle do menu mobile
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isActive = mobileToggle.classList.toggle('is-active');
      mobileDrawer.classList.toggle('is-open', isActive);
      mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Fechar menu ao clicar em um link mobile
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('is-active');
        mobileDrawer.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // Rolagem suave com offset da barra de navegação fixa
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Atualização do link ativo no menu durante o scroll
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link:not(.nav-cta)');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ====================================================================
   3. ANIMAÇÕES DE REVELAÇÃO NO SCROLL (INTERSECTION OBSERVER)
   ==================================================================== */
function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll('.fade-up');

  if (!('IntersectionObserver' in window)) {
    // Fallback para navegadores antigos
    elementsToAnimate.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elementsToAnimate.forEach(el => observer.observe(el));
}

/* ====================================================================
   4. FORMULÁRIO DE CONTATO COM VALIDAÇÃO & TRANSPARÊNCIA
   ==================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const subjectInput = document.getElementById('form-subject');
  const messageInput = document.getElementById('form-message');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorSubject = document.getElementById('error-subject');
  const errorMessage = document.getElementById('error-message');

  // Limpa mensagens de erro ao digitar
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        input.classList.remove('input-error');
        const errEl = document.getElementById(`error-${input.id.replace('form-', '')}`);
        if (errEl) errEl.classList.remove('show');
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validação do Nome
    if (!nameInput.value.trim()) {
      showInputError(nameInput, errorName);
      isValid = false;
    }

    // Validação do E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showInputError(emailInput, errorEmail);
      isValid = false;
    }

    // Validação do Assunto
    if (!subjectInput.value.trim()) {
      showInputError(subjectInput, errorSubject);
      isValid = false;
    }

    // Validação da Mensagem
    if (!messageInput.value.trim()) {
      showInputError(messageInput, errorMessage);
      isValid = false;
    }

    if (!isValid) return;

    // Ação Real e Transparente:
    const targetEmail = PORTFOLIO_CONFIG?.contact?.email || 'MEU_EMAIL';
    const isPlaceholderEmail = targetEmail === 'MEU_EMAIL' || !targetEmail;

    const emailSubject = encodeURIComponent(`[Contato Portfólio] ${subjectInput.value.trim()}`);
    const emailBody = encodeURIComponent(
      `Olá, meu nome é ${nameInput.value.trim()}.\n\n` +
      `Mensagem:\n${messageInput.value.trim()}\n\n` +
      `---\n` +
      `Remetente: ${emailInput.value.trim()}`
    );

    const mailtoUrl = `mailto:${isPlaceholderEmail ? '' : targetEmail}?subject=${emailSubject}&body=${emailBody}`;

    // Dispara a abertura do aplicativo de e-mail do sistema
    window.location.href = mailtoUrl;

    if (isPlaceholderEmail) {
      showToast(
        'Mensagem formatada com sucesso!',
        'Seu cliente de e-mail foi aberto. Para que o e-mail seja preenchido automaticamente como destinatário, insira seu endereço em <strong>MEU_EMAIL</strong> no arquivo <code>js/config.js</code>.',
        'info'
      );
    } else {
      showToast(
        'Tudo pronto!',
        'Seu aplicativo de e-mail foi aberto com todos os dados preenchidos para envio rápido.',
        'success'
      );
    }

    form.reset();
  });
}

function showInputError(inputEl, errorEl) {
  inputEl.classList.add('input-error');
  if (errorEl) errorEl.classList.add('show');
}

/* ====================================================================
   5. RODAPÉ & BOTÃO VOLTAR AO TOPO
   ==================================================================== */
function initFooter() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ====================================================================
   6. SISTEMA DE TOAST NOTIFICATION AESTHETIC
   ==================================================================== */
function showToast(title, message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconSvg = type === 'success' 
    ? `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bfa6ff" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-body">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Trigger anim
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto-remove após 4.5 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 350);
  }, 4500);
}

/* Utilitário para sanitizar HTML em strings */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
