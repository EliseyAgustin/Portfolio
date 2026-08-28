// Funciones para renderizar componentes

// Renderizar contenido About
function renderAbout() {
  const container = document.getElementById('aboutContent');
  const paragraphs = PORTFOLIO_DATA.about.split('\n\n');

  const aboutDiv = document.createElement('div');
  aboutDiv.className = 'flex flex-col gap-4';

  paragraphs.forEach(paragraph => {
    const p = document.createElement('p');
    p.className = 'text-slate-600 dark:text-slate-400 leading-relaxed font-light';
    p.textContent = paragraph;
    aboutDiv.appendChild(p);
  });

  container.appendChild(aboutDiv);
}

// Renderizar proyectos
function renderProjects() {
  const container = document.getElementById('projectsContainer');

  PORTFOLIO_DATA.projects.forEach(project => {
    const hasImages = Array.isArray(project.images) && project.images.length > 0;

    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all flex flex-col';

    const placeholderMarkup = `
      <div class="project-placeholder absolute inset-0 flex-col items-center justify-center gap-2 text-slate-300 dark:text-slate-600 bg-slate-100 dark:bg-slate-800" style="${hasImages ? 'display:none;' : 'display:flex;'}">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span class="text-xs font-medium">Vista previa próximamente</span>
      </div>
    `;

    const imageSection = `
      <div class="project-image-wrapper group relative aspect-video bg-slate-100 dark:bg-slate-800 cursor-pointer">
        ${hasImages ? `
          <img
            src="${project.images[0]}"
            alt="${project.name}"
            class="w-full h-full object-cover"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
        ` : ''}
        ${placeholderMarkup}
        <div class="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
          <span class="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-white flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h6v6"></path><path d="M9 21H3v-6"></path><path d="M21 3l-7 7"></path><path d="M3 21l7-7"></path>
            </svg>
            ${hasImages ? `Ver galería${project.images.length > 1 ? ` (${project.images.length})` : ''}` : 'Ver más'}
          </span>
        </div>
      </div>
    `;

    card.innerHTML = `
      ${imageSection}
      <div class="p-6 flex flex-col gap-3 flex-1">
        <h3 class="font-bold text-slate-900 dark:text-white text-lg leading-snug">${project.name}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">${project.description}</p>
        <div class="flex flex-wrap gap-1.5 pt-2">
          ${project.stack.map(tech => `<span class="font-mono text-[10px] font-medium px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wide">${tech}</span>`).join('')}
        </div>
        <span class="text-xs font-medium text-emerald-600 dark:text-emerald-400 pt-1">${project.role}</span>
      </div>
    `;

    card.querySelector('.project-image-wrapper').addEventListener('click', () => {
      openProjectModal(project);
    });

    container.appendChild(card);
  });
}

// --- Modal de galería de proyectos ---
const projectModalState = { images: [], index: 0 };

function openProjectModal(project) {
  projectModalState.images = Array.isArray(project.images) ? project.images : [];
  projectModalState.index = 0;

  document.getElementById('projectModalTitle').textContent = project.name;
  updateProjectModalView();

  const modal = document.getElementById('projectModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

function updateProjectModalView() {
  const { images, index } = projectModalState;
  const title = document.getElementById('projectModalTitle').textContent;
  const hasImages = images.length > 0;

  const img = document.getElementById('projectModalImage');
  const placeholder = document.getElementById('projectModalPlaceholder');

  if (hasImages) {
    img.src = images[index];
    img.alt = title;
    img.style.display = 'block';
    placeholder.style.display = 'none';
  } else {
    img.style.display = 'none';
    placeholder.style.display = 'flex';
  }

  const counter = document.getElementById('projectModalCounter');
  const prevBtn = document.getElementById('projectModalPrev');
  const nextBtn = document.getElementById('projectModalNext');

  if (images.length > 1) {
    counter.textContent = `${index + 1} / ${images.length}`;
    counter.classList.remove('hidden');
    prevBtn.classList.remove('hidden');
    prevBtn.classList.add('flex');
    nextBtn.classList.remove('hidden');
    nextBtn.classList.add('flex');
  } else {
    counter.classList.add('hidden');
    prevBtn.classList.add('hidden');
    nextBtn.classList.add('hidden');
  }
}

function setupProjectModal() {
  const modal = document.getElementById('projectModal');

  document.getElementById('projectModalClose').addEventListener('click', closeProjectModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  document.getElementById('projectModalPrev').addEventListener('click', () => {
    const { images } = projectModalState;
    if (images.length < 2) return;
    projectModalState.index = (projectModalState.index - 1 + images.length) % images.length;
    updateProjectModalView();
  });

  document.getElementById('projectModalNext').addEventListener('click', () => {
    const { images } = projectModalState;
    if (images.length < 2) return;
    projectModalState.index = (projectModalState.index + 1) % images.length;
    updateProjectModalView();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeProjectModal();
    if (e.key === 'ArrowLeft') document.getElementById('projectModalPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('projectModalNext').click();
  });
}

// --- Modo claro / oscuro ---
function setupThemeToggle() {
  const toggle = document.getElementById('themeToggle');

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Renderizar experiencia
function renderExperience() {
  const container = document.getElementById('experienceContainer');

  PORTFOLIO_DATA.experience.forEach(exp => {
    const item = document.createElement('div');

    item.innerHTML = `
      <div class="relative pl-8 border-l border-slate-200 dark:border-slate-800">
        <span class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-white dark:bg-slate-950 border-2 border-emerald-500"></span>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">${exp.role}</h3>
          <span class="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md w-fit">${exp.period}</span>
        </div>
        <p class="text-sm font-medium text-slate-700 dark:text-slate-300">${exp.company} · ${exp.type}</p>
        <p class="text-xs text-slate-400 dark:text-slate-500 mb-3">${exp.location}</p>
        <div class="flex flex-wrap gap-2">
          ${exp.skills.map(skill => `<span class="font-mono text-[10px] px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase">${skill}</span>`).join('')}
        </div>
      </div>
    `;

    container.appendChild(item);
  });
}

// Renderizar educación
function renderEducation() {
  const container = document.getElementById('educationContainer');

  PORTFOLIO_DATA.education.forEach(edu => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors';

    card.innerHTML = `
      <div class="flex flex-col sm:flex-row gap-6">
        <div class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2">
          <img src="${edu.logo}" alt="${edu.institution}" class="w-full h-full object-contain" />
        </div>
        <div class="flex-1">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">${edu.institution}</h3>
            <span class="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md w-fit">${edu.date}</span>
          </div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">${edu.degree}</p>
          <div class="flex flex-wrap gap-2">
            ${edu.skills.map(skill => `<span class="font-mono text-[10px] px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase">${skill}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Renderizar certificaciones
function renderCertifications() {
  const container = document.getElementById('certificationsContainer');

  PORTFOLIO_DATA.certifications.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors';

    card.innerHTML = `
      <div class="flex flex-col sm:flex-row gap-6">
        <div class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2">
          <img src="${cert.logo}" alt="${cert.issuer}" class="w-full h-full object-contain" />
        </div>
        <div class="flex-1">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">${cert.title}</h3>
            <span class="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md w-fit">Exp: ${cert.date}</span>
          </div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">${cert.issuer}</p>
          <p class="font-mono text-[10px] text-slate-400 dark:text-slate-500 mb-4">Credential ID: ${cert.id}</p>
          <div class="flex flex-wrap gap-2">
            ${cert.skills.map(skill => `<span class="font-mono text-[10px] px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase">${skill}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Renderizar skills
function renderSkills() {
  const container = document.getElementById('skillsContainer');

  const skillsGrid = document.createElement('div');
  skillsGrid.className = 'grid grid-cols-2 gap-3';

  PORTFOLIO_DATA.skills.forEach(skill => {
    const item = document.createElement('div');
    item.className = 'p-3 bg-slate-50 dark:bg-slate-800 rounded-lg flex flex-col gap-1';

    item.innerHTML = `
      <span class="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase">${skill.category}</span>
      <span class="text-xs font-semibold text-slate-700 dark:text-slate-200">${skill.name}</span>
    `;

    skillsGrid.appendChild(item);
  });

  container.appendChild(skillsGrid);
}

// Función para manejar el Asistente Virtual
function setupAIAssistant() {
  const form = document.getElementById('aiForm');
  const input = document.getElementById('aiInput');
  const chatContainer = document.getElementById('aiChat');

  addAIMessage('assistant', '¡Hola! Soy el asistente virtual de Agustín. Preguntame sobre su experiencia, formación, proyectos o habilidades técnicas.');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = input.value.trim();
    if (!message) return;

    addAIMessage('user', message);
    input.value = '';

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'flex items-center gap-2 text-xs text-slate-400';
    loadingDiv.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
      Escribiendo...
    `;
    chatContainer.appendChild(loadingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      chatContainer.removeChild(loadingDiv);
      addAIMessage('assistant', data.response);
    } catch (error) {
      console.error('Error:', error);
      chatContainer.removeChild(loadingDiv);
      addAIMessage('assistant', 'No pude conectar con el asistente. Por favor intentá nuevamente en unos segundos.');
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
}

// Escapa HTML antes de insertarlo como texto en el chat (evita self-XSS vía input del usuario)
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Función auxiliar para agregar mensajes al chat
function addAIMessage(type, text) {
  const chatContainer = document.getElementById('aiChat');
  const messageDiv = document.createElement('div');
  const isUser = type === 'user';

  messageDiv.className = `flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`;

  const bubbleClasses = isUser
    ? 'bg-slate-900 dark:bg-emerald-600 text-white rounded-2xl rounded-br-sm'
    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl rounded-bl-sm';

  messageDiv.innerHTML = `
    <span class="text-[10px] font-medium text-slate-400 px-1">${isUser ? 'Tú' : 'Asistente'}</span>
    <p class="max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${bubbleClasses}">${escapeHtml(text)}</p>
  `;

  chatContainer.appendChild(messageDiv);
}
