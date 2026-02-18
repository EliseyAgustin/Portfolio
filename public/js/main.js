// Script principal - Inicialización y funcionalidades

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar componentes
  renderAbout();
  renderExperience();
  renderEducation();
  renderCertifications();
  renderSkills();
  setupAIAssistant();
  
  // Configurar observador de scroll para animaciones
  setupScrollReveal();
  
  // Configurar navbar sticky
  setupStickyNavbar();
});

// Configurar animaciones de reveal al hacer scroll
function setupScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  // Observar todos los elementos con clase 'reveal'
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
}

// Configurar navbar sticky con efecto
function setupStickyNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar sombra cuando hay scroll
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

// Efecto parallax suave al background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const glows = document.querySelectorAll('.bg-glow');
  
  glows.forEach((glow, index) => {
    const speed = index === 0 ? 0.5 : 0.3;
    glow.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Log de inicio
console.log('%c🚀 Portfolio cargado correctamente', 'color: #10b981; font-size: 16px; font-weight: bold;');
console.log('%cDesarrollado con HTML, CSS y JavaScript vanilla + Express', 'color: #64748b;');
console.log('%c> SYSTEM_STATUS: ONLINE', 'color: #10b981; font-family: "Fira Code", monospace;');
