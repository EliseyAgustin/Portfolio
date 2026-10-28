// Script principal - Inicialización y funcionalidades

document.addEventListener('DOMContentLoaded', () => {
  // Idioma: aplica las traducciones fijas antes de renderizar el contenido dinámico
  setupLangToggle();

  renderStats();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderEducation();
  renderCertifications();
  setupDemo();
  setupAIAssistant();
  setupProjectModal();
  setupThemeToggle();
  setupEmailCopy();

  observeReveals();
  setupScramble();
});
