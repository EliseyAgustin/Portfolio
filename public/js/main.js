// Script principal - Inicialización y funcionalidades

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar componentes
  renderAbout();
  renderProjects();
  renderExperience();
  renderEducation();
  renderCertifications();
  renderSkills();
  setupAIAssistant();
  setupProjectModal();
  setupThemeToggle();

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
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Agregar sombra sutil cuando hay scroll
    if (currentScroll > 20) {
      const isDark = document.documentElement.classList.contains('dark');
      navbar.style.boxShadow = isDark
        ? '0 1px 6px rgba(0, 0, 0, 0.4)'
        : '0 1px 6px rgba(15, 23, 42, 0.06)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
}

console.log('Portfolio cargado correctamente');
