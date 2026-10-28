// Funciones para renderizar componentes

// --- Idioma (ES/EN) ---
let currentLang = 'es';
try { currentLang = localStorage.getItem('lang') === 'en' ? 'en' : 'es'; } catch (e) {}

function getData() {
  return PORTFOLIO_DATA[currentLang];
}

// Busca un texto en UI_STRINGS por ruta con puntos, ej: t('nav.about')
function t(path) {
  const parts = path.split('.');
  let node = UI_STRINGS[currentLang];
  for (const part of parts) {
    if (node == null) return path;
    node = node[part];
  }
  return node != null ? node : path;
}

// Aplica las traducciones a todo el texto fijo marcado con data-i18n* en el HTML
function applyStaticTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });

  const langLabel = document.getElementById('langToggleLabel');
  if (langLabel) langLabel.textContent = currentLang === 'es' ? 'EN' : 'ES';
}

// Vuelve a renderizar todo el contenido dinámico (datos del portafolio) en el idioma actual
function renderDynamicContent() {
  renderStats();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderEducation();
  renderCertifications();
  renderDemo();
  observeReveals();
}

function setupLangToggle() {
  applyStaticTranslations();

  const toggle = document.getElementById('langToggle');
  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    try { localStorage.setItem('lang', currentLang); } catch (e) {}

    applyStaticTranslations();
    renderDynamicContent();
    resetAIAssistant();
  });
}

// Pequeño helper para armar nodos sin repetir createElement
function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html != null) node.innerHTML = html;
  return node;
}

function esc(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

// --- Revelado al scroll (escalonado) ---
let revealObserver = null;

function observeReveals() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.rv').forEach(n => n.classList.add('in'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  }
  document.querySelectorAll('.rv:not(.in)').forEach(n => revealObserver.observe(n));
}

// Respaldo: si el observer no llegó a disparar (scroll muy rápido o salto de ancla), revela lo ya visible o superado
function revealPassed() {
  const limit = window.innerHeight * 0.95;
  document.querySelectorAll('.rv:not(.in)').forEach(n => {
    if (n.getBoundingClientRect().top < limit) n.classList.add('in');
  });
}
window.addEventListener('scroll', () => requestAnimationFrame(revealPassed), { passive: true });
setInterval(revealPassed, 500);

// --- Resultados (con conteo animado) ---
function formatNumber(n) {
  return currentLang === 'es' ? n.toLocaleString('es-AR') : n.toLocaleString('en-US');
}

function renderStats() {
  const container = document.getElementById('statsContainer');
  container.innerHTML = '';

  getData().stats.forEach((stat, i) => {
    const item = el('div', 'rv');
    item.style.setProperty('--d', i);
    item.innerHTML = `
      <div class="stat-num" data-count="${stat.value}" data-prefix="${stat.prefix || ''}" data-suffix="${stat.suffix || ''}">${stat.prefix || ''}${formatNumber(stat.value)}${stat.suffix || ''}</div>
      <p class="stat-label">${esc(stat.label)}</p>
    `;
    container.appendChild(item);
  });

  setupCountUp();
}

function setupCountUp() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      obs.unobserve(entry.target);
      const node = entry.target;
      const end = Number(node.dataset.count);
      const prefix = node.dataset.prefix;
      const suffix = node.dataset.suffix;
      const start = performance.now();
      const dur = 1400;
      (function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        node.textContent = prefix + formatNumber(Math.round(end * eased)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.stat-num').forEach(n => obs.observe(n));
}

// --- Demo: detección de duplicados ---
const DEMO_ROWS = [
  ['SKU-1001', 'Zapatilla Runner', false],
  ['SKU-1002', 'Mochila Urbana', false],
  ['SKU-1001', 'Zapatilla Runner', true],
  ['SKU-1003', 'Campera Térmica', false],
  ['SKU-1002', 'Mochila Urbana', true],
  ['SKU-1004', 'Gorra Trucker', false],
  ['SKU-1005', 'Botella Inox', false],
  ['SKU-1003', 'Campera Térmica', true],
  ['SKU-1006', 'Remera Algodón', false],
  ['SKU-1001', 'Zapatilla Runner', true],
  ['SKU-1007', 'Short Deportivo', false],
  ['SKU-1004', 'Gorra Trucker', true]
];

let demoRunning = false;
let demoTimers = [];

function renderDemo() {
  demoTimers.forEach(clearTimeout);
  demoTimers = [];
  demoRunning = false;

  const body = document.getElementById('demoBody');
  body.innerHTML = '';
  DEMO_ROWS.forEach(([sku, name, dup]) => {
    const tr = document.createElement('tr');
    tr.className = dup ? 'is-dup' : 'is-ok';
    tr.innerHTML = `<td>${sku}</td><td>${name}</td><td>${dup ? t('demo.dup') : t('demo.ok')}</td>`;
    body.appendChild(tr);
  });

  document.getElementById('demoTotal').textContent = DEMO_ROWS.length;
  document.getElementById('demoUnique').textContent = '-';
  document.getElementById('demoRemoved').textContent = '-';
  document.getElementById('demoDone').textContent = '';
  document.getElementById('demoRun').hidden = false;
  document.getElementById('demoRun').disabled = false;
  document.getElementById('demoRun').textContent = t('demo.run');
  document.getElementById('demoReset').hidden = true;
}

function runDemo() {
  if (demoRunning) return;
  demoRunning = true;

  const runBtn = document.getElementById('demoRun');
  runBtn.disabled = true;
  runBtn.textContent = t('demo.running');

  const rows = Array.from(document.querySelectorAll('#demoBody tr'));
  const step = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 20 : 170;
  let removed = 0;

  rows.forEach((tr, i) => {
    demoTimers.push(setTimeout(() => {
      tr.classList.add('scanning');
      demoTimers.push(setTimeout(() => {
        tr.classList.remove('scanning');
        if (tr.classList.contains('is-dup')) {
          tr.classList.add('gone');
          removed++;
          document.getElementById('demoRemoved').textContent = removed;
          document.getElementById('demoUnique').textContent = DEMO_ROWS.length - removed;
          demoTimers.push(setTimeout(() => tr.classList.add('hidden'), 450));
        }
      }, step));
    }, i * step));
  });

  demoTimers.push(setTimeout(() => {
    demoRunning = false;
    document.getElementById('demoDone').textContent = t('demo.done');
    runBtn.hidden = true;
    document.getElementById('demoReset').hidden = false;
    document.getElementById('demoReset').focus();
  }, rows.length * step + step + 600));
}

function setupDemo() {
  document.getElementById('demoRun').addEventListener('click', runDemo);
  document.getElementById('demoReset').addEventListener('click', () => {
    renderDemo();
    document.getElementById('demoRun').focus();
  });
  renderDemo();
}

// Renderizar contenido About
function renderAbout() {
  const container = document.getElementById('aboutContent');
  container.innerHTML = '';
  getData().about.split('\n\n').forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    container.appendChild(p);
  });

  const langs = document.getElementById('languagesContainer');
  langs.innerHTML = getData().languages.map(l => `<li>${esc(l.name)}<small>${esc(l.level)}</small></li>`).join('');

  const soft = document.getElementById('softSkillsContainer');
  soft.innerHTML = getData().softSkills.map(s => `<li>${esc(s)}</li>`).join('');
}

// Renderizar experiencia
function renderExperience() {
  const container = document.getElementById('experienceContainer');
  container.innerHTML = '';

  getData().experience.forEach(exp => {
    const job = el('article', 'job');
    job.innerHTML = `
      <div class="rv">
        <h3 class="job-company">${esc(exp.company)}</h3>
        <p class="job-role">${esc(exp.role)}</p>
        <p class="job-meta">${esc(exp.type)} · ${esc(exp.location)}</p>
        <span class="job-period">${esc(exp.period)}</span>
      </div>
      <div class="rv" style="--d:2">
        <ul class="job-bullets">${exp.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
        <ul class="chips">${exp.skills.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      </div>
    `;
    container.appendChild(job);
  });
}

// Renderizar proyectos
function renderProjects() {
  const container = document.getElementById('projectsContainer');
  container.innerHTML = '';

  getData().projects.forEach(project => {
    const hasImages = Array.isArray(project.images) && project.images.length > 0;
    const hint = hasImages
      ? `${t('project.viewGallery')}${project.images.length > 1 ? ` (${project.images.length})` : ''}`
      : t('project.viewMore');

    const card = el('article', 'project');
    card.innerHTML = `
      <button type="button" class="project-media rv" aria-label="${esc(project.name)} - ${esc(hint)}">
        ${hasImages ? `<img src="${project.images[0]}" alt="${esc(project.name)}" loading="lazy" onerror="this.style.display='none'">` : ''}
        <span class="project-hint">${esc(hint)}</span>
      </button>
      <div class="project-body rv" style="--d:2">
        <h3 class="project-name">${esc(project.name)}</h3>
        <p>${esc(project.description)}</p>
        <p class="project-role">${esc(project.role)}</p>
        <ul class="chips">${project.stack.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
      </div>
    `;
    card.querySelector('.project-media').addEventListener('click', () => openProjectModal(project));
    container.appendChild(card);
  });
}

// Renderizar skills agrupadas por categoría
function renderSkills() {
  const container = document.getElementById('skillsContainer');
  container.innerHTML = '';

  const groups = new Map();
  getData().skills.forEach(s => {
    if (!groups.has(s.category)) groups.set(s.category, []);
    groups.get(s.category).push(s.name);
  });

  let i = 0;
  groups.forEach((names, category) => {
    const g = el('div', 'skill-group');
    g.style.setProperty('--d', i++ % 4);
    g.innerHTML = `<h3>${esc(category)}</h3><ul>${names.map(n => `<li>${esc(n)}</li>`).join('')}</ul>`;
    container.appendChild(g);
  });
}

// Logo con fallback a inicial si el archivo no existe
function logoMarkup(logo, name) {
  return `<img src="${logo}" alt="${esc(name)}" onerror="this.replaceWith(document.createTextNode('${esc((name || '?').charAt(0))}'))">`;
}

// Renderizar educación
function renderEducation() {
  const container = document.getElementById('educationContainer');
  container.innerHTML = '';

  getData().education.forEach(edu => {
    const item = el('div', 'edu-item');
    item.innerHTML = `
      <div class="edu-logo">${logoMarkup(edu.logo, edu.institution)}</div>
      <div>
        <h4>${esc(edu.degree)}</h4>
        <p>${esc(edu.institution)} · ${esc(edu.date)}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

// Renderizar certificaciones
function renderCertifications() {
  const container = document.getElementById('certificationsContainer');
  container.innerHTML = '';

  getData().certifications.forEach(cert => {
    const item = el('li');
    item.innerHTML = `
      <div>
        <h4>${esc(cert.title)}</h4>
        <p>${esc(cert.issuer)}</p>
      </div>
      <time>${esc(cert.date)}</time>
    `;
    container.appendChild(item);
  });
}

// --- Modal de galería de proyectos ---
const projectModalState = { images: [], index: 0, zoomed: false, opener: null };

function openProjectModal(project) {
  projectModalState.images = Array.isArray(project.images) ? project.images : [];
  projectModalState.index = 0;
  projectModalState.opener = document.activeElement;

  document.getElementById('projectModalTitle').textContent = project.name;
  setProjectModalZoom(false);
  updateProjectModalView();

  document.getElementById('projectModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('projectModalClose').focus();
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow = '';
  setProjectModalZoom(false);
  if (projectModalState.opener) projectModalState.opener.focus();
}

// Alterna entre la imagen ajustada al modal y su tamaño real (con scroll)
function setProjectModalZoom(zoomed) {
  projectModalState.zoomed = zoomed;
  document.getElementById('projectModalDialog').classList.toggle('zoomed', zoomed);
  const wrapper = document.getElementById('projectModalImageWrapper');
  wrapper.scrollTop = 0;
  wrapper.scrollLeft = 0;
}

function updateProjectModalView() {
  const { images, index } = projectModalState;
  const title = document.getElementById('projectModalTitle').textContent;
  const img = document.getElementById('projectModalImage');
  const placeholder = document.getElementById('projectModalPlaceholder');

  if (images.length > 0) {
    img.src = images[index];
    img.alt = title;
    img.style.display = 'block';
    placeholder.style.display = 'none';
  } else {
    img.style.display = 'none';
    placeholder.style.display = 'block';
  }

  const multi = images.length > 1;
  document.getElementById('projectModalCounter').textContent = multi ? `${index + 1} / ${images.length}` : '';
  document.getElementById('projectModalPrev').classList.toggle('show', multi);
  document.getElementById('projectModalNext').classList.toggle('show', multi);
}

function setupProjectModal() {
  const modal = document.getElementById('projectModal');

  document.getElementById('projectModalClose').addEventListener('click', closeProjectModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  document.getElementById('projectModalImage').addEventListener('click', (e) => {
    e.stopPropagation();
    setProjectModalZoom(!projectModalState.zoomed);
  });

  const move = (dir) => {
    const { images } = projectModalState;
    if (images.length < 2) return;
    projectModalState.index = (projectModalState.index + dir + images.length) % images.length;
    setProjectModalZoom(false);
    updateProjectModalView();
  };
  document.getElementById('projectModalPrev').addEventListener('click', () => move(-1));
  document.getElementById('projectModalNext').addEventListener('click', () => move(1));

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeProjectModal();
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });
}

// --- Copiar email (respaldo por si el navegador no tiene un cliente de correo configurado) ---
function setupEmailCopy() {
  document.querySelectorAll('.email-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email;
      if (!email || !navigator.clipboard) return;

      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        return;
      }

      const tooltip = document.createElement('span');
      tooltip.textContent = t('emailCopied');
      tooltip.className = 'copied';
      btn.appendChild(tooltip);
      setTimeout(() => tooltip.remove(), 1500);
    });
  });
}

// --- Modo claro / oscuro ---
function setupThemeToggle() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
  });
}

// --- Efecto "decodificar" en el nombre del hero ---
function scrambleText(node) {
  const final = node.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&';
  const total = 22;
  let frame = 0;
  const timer = setInterval(() => {
    node.textContent = final.split('').map((ch, i) => {
      if (i < (frame / total) * final.length) return ch;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    if (++frame > total) {
      clearInterval(timer);
      node.textContent = final;
    }
  }, 38);
}

function setupScramble() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('[data-scramble]').forEach(scrambleText);
}

// Función para manejar el Asistente Virtual
function setupAIAssistant() {
  const form = document.getElementById('aiForm');
  const input = document.getElementById('aiInput');

  addAIMessage('assistant', t('ai.welcome'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = input.value.trim();
    if (!message) return;

    const chatContainer = document.getElementById('aiChat');

    addAIMessage('user', message);
    input.value = '';

    const loadingDiv = el('div', 'typing', t('ai.thinking'));
    chatContainer.appendChild(loadingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, lang: currentLang })
      });

      const data = await response.json();

      loadingDiv.remove();
      addAIMessage('assistant', response.ok ? data.response : (data.error || t('ai.connectionError')));
    } catch (error) {
      console.error('Error:', error);
      loadingDiv.remove();
      addAIMessage('assistant', t('ai.connectionError'));
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
}

// Limpia el chat y vuelve a mostrar el saludo inicial en el idioma actual (al cambiar de idioma)
function resetAIAssistant() {
  document.getElementById('aiChat').innerHTML = '';
  addAIMessage('assistant', t('ai.welcome'));
}

// Escapa HTML antes de insertarlo como texto en el chat (evita self-XSS vía input del usuario)
function escapeHtml(text) {
  return esc(text);
}

// Función auxiliar para agregar mensajes al chat
function addAIMessage(type, text) {
  const chatContainer = document.getElementById('aiChat');
  const isUser = type === 'user';
  const msg = el('div', `msg ${isUser ? 'user' : 'bot'}`);
  msg.innerHTML = `<small>${isUser ? t('ai.you') : t('ai.assistant')}</small><p>${escapeHtml(text)}</p>`;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
