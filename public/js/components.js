// Funciones para renderizar componentes

// Renderizar contenido About
function renderAbout() {
  const container = document.getElementById('aboutContent');
  const paragraphs = PORTFOLIO_DATA.about.split('\n\n');
  
  const aboutDiv = document.createElement('div');
  aboutDiv.className = 'about-content';
  
  paragraphs.forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    aboutDiv.appendChild(p);
  });
  
  container.appendChild(aboutDiv);
}

// Renderizar experiencia
function renderExperience() {
  const container = document.getElementById('experienceContainer');
  
  PORTFOLIO_DATA.experience.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'experience-timeline';
    
    item.innerHTML = `
      <div class="experience-item">
        <div class="experience-dot"></div>
        <div class="experience-header">
          <h3 class="experience-title">${exp.role}</h3>
          <span class="experience-period mono">${exp.period}</span>
        </div>
        <p class="experience-company">${exp.company} // ${exp.type}</p>
        <p class="experience-location">${exp.location}</p>
        <div class="experience-skills">
          ${exp.skills.map(skill => `<span class="skill-badge mono">${skill}</span>`).join('')}
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
    card.className = 'edu-card';
    
    card.innerHTML = `
      <div class="card-layout">
        <div class="card-logo-wrapper">
          <img src="${edu.logo}" alt="${edu.institution}" class="card-logo" />
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">${edu.institution}</h3>
            <span class="card-date mono">${edu.date}</span>
          </div>
          <p class="card-subtitle">${edu.degree}</p>
          <div class="card-skills">
            ${edu.skills.map(skill => `<span class="card-skill-tag mono">${skill}</span>`).join('')}
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
    card.className = 'cert-card';
    
    card.innerHTML = `
      <div class="card-layout">
        <div class="card-logo-wrapper">
          <img src="${cert.logo}" alt="${cert.issuer}" class="card-logo" />
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">${cert.title}</h3>
            <span class="card-date mono">EXP: ${cert.date}</span>
          </div>
          <p class="card-subtitle">${cert.issuer}</p>
          <p class="card-id mono">Credential ID: ${cert.id}</p>
          <div class="cert-actions">
            <div class="card-skills">
              ${cert.skills.map(skill => `<span class="card-skill-tag mono">${skill}</span>`).join('')}
            </div>
            <button class="verify-btn mono">
              VERIFY_CREDENTIAL
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </button>
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
  skillsGrid.className = 'skills-grid';
  
  PORTFOLIO_DATA.skills.forEach(skill => {
    const item = document.createElement('div');
    item.className = 'skill-item';
    
    item.innerHTML = `
      <span class="skill-category mono">${skill.category}</span>
      <span class="skill-name">${skill.name}</span>
    `;
    
    skillsGrid.appendChild(item);
  });
  
  container.appendChild(skillsGrid);
}

// Función para manejar el AI Assistant
function setupAIAssistant() {
  const form = document.getElementById('aiForm');
  const input = document.getElementById('aiInput');
  const chatContainer = document.getElementById('aiChat');
  
  // Agregar mensaje de bienvenida
  addAIMessage('assistant', 'Conexión establecida. Kernel de IA operativo. ¿Qué consulta desea realizar sobre el perfil de Agustin?');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = input.value.trim();
    if (!message) return;
    
    // Mostrar mensaje del usuario
    addAIMessage('user', message);
    input.value = '';
    
    // Mostrar indicador de carga
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-loading mono';
    loadingDiv.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
      Buscando en base de datos local...
    `;
    chatContainer.appendChild(loadingDiv);
    
    try {
      // Llamar a la API del asistente
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      
      const data = await response.json();
      
      // Remover indicador de carga
      chatContainer.removeChild(loadingDiv);
      
      // Mostrar respuesta del asistente
      addAIMessage('assistant', data.response);
    } catch (error) {
      console.error('Error:', error);
      chatContainer.removeChild(loadingDiv);
      addAIMessage('assistant', 'CONNECTION_FAILURE: Kernel offline. Por favor intenta nuevamente.');
    }
    
    // Scroll al final del chat
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
}

// Función auxiliar para agregar mensajes al chat
function addAIMessage(type, text) {
  const chatContainer = document.getElementById('aiChat');
  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ${type}`;
  
  const label = type === 'user' ? 'USER_PROMPT' : 'SYSTEM_RESPONSE';
  
  messageDiv.innerHTML = `
    <div class="ai-message-header">
      <span class="ai-message-label mono">${label}</span>
    </div>
    <p class="ai-message-text mono">${text}</p>
  `;
  
  chatContainer.appendChild(messageDiv);
}
