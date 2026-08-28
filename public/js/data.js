// Datos del portafolio — fuente única, consumida por el frontend (script clásico)
// y por server.js (vía require) para mantener al asistente IA sincronizado.
const PORTFOLIO_DATA = {
  name: "Agustin Elisey Larco",
  title: "Data Analyst | QA Tester",
  location: "Buenos Aires, Provincia de Buenos Aires, Argentina",
  contacts: 48,
  about: `Como ex Analista de Datos en Shalion, apliqué mis habilidades en capacidad de análisis, Quality Assurance y Testing. Mi experiencia incluye el uso de SQL para validación de datos, documentación de procesos y la identificación y reporte de inconsistencias en datos, todo dentro de entornos ágiles colaborativos.

Mi formación académica incluye una Licenciatura en Informática por la Universidad Nacional del Oeste, donde también obtuve una Tecnicatura en Tecnologías Web. Estoy certificado en QA Engineer por Udemy y actualmente desarrollo mis conocimientos en automatización de pruebas y metodologías ágiles para brindar soluciones de calidad en el ámbito tecnológico.`,

  experience: [
    {
      company: "Shalion",
      role: "Analista de Datos",
      type: "Jornada parcial",
      period: "may. 2024 - feb. 2026",
      duration: "1 año 9 meses",
      location: "Provincia de Buenos Aires, Argentina · Híbrido",
      skills: ["Hojas de cálculo de Google", "SQL", "Análisis de Datos", "Quality Assurance"],
      logo: "https://picsum.photos/seed/shalion/200/200"
    }
  ],

  education: [
    {
      institution: "Universidad Nacional del Oeste",
      degree: "Tecnicatura Universitaria en Tecnologías Web",
      date: "mar. 2023",
      skills: ["Desarrollo de API", "Web Development", "JavaScript"],
      logo: "/images/logo-uno.png"
    },
    {
      institution: "Universidad Nacional del Oeste",
      degree: "Licenciatura en Informática",
      date: "mar. 2020",
      skills: ["Gestión de proyectos", "Trabajo en equipo", "Arquitectura de Software"],
      logo: "/images/logo-uno.png"
    }
  ],

  certifications: [
    {
      title: "Play It Safe: Manage Security Risks",
      issuer: "Google",
      date: "ago. 2026",
      id: "GZ4HJNJS1ZOO",
      skills: [],
      logo: "/images/logo-google.svg"
    },
    {
      title: "Foundations of Cybersecurity",
      issuer: "Google",
      date: "ago. 2026",
      id: "VNESX3Q37L61",
      skills: ["Ciberseguridad", "Seguridad de la información"],
      logo: "/images/logo-google.svg"
    },
    {
      title: "QA Engineer desde 0 hasta avanzado",
      issuer: "Udemy",
      date: "jun. 2025",
      id: "UC-5cfd0673-a8c2-4d33-941e-eccd051f32d6",
      skills: ["JIRA", "Casos de prueba", "Metodologías Ágiles", "Testing Automation"],
      logo: "/images/logo-udemy.png"
    },
    {
      title: "Python Essentials 1",
      issuer: "Cisco",
      date: "mar. 2024",
      id: null,
      skills: [],
      logo: "/images/logo-cisco.svg"
    }
  ],

  skills: [
    { name: "SQL", category: "Data & DB" },
    { name: "JIRA", category: "Tools" },
    { name: "Resolución de incidencias", category: "QA" },
    { name: "Casos de prueba", category: "QA" },
    { name: "Trabajo en equipo", category: "Soft Skills" },
    { name: "Google Sheets", category: "Tools" },
    { name: "Agile/Scrum", category: "Process" },
    { name: "Testing Manual", category: "QA" },
    { name: "Documentación", category: "Process" }
  ],

  // Cada proyecto puede tener 0, 1 o varias imágenes en `images`.
  // Si tiene al menos una, la card muestra la primera como miniatura y
  // al hacer click abre el modal con la galería completa (con flechas
  // de navegación si hay más de una). Con el array vacío se muestra un
  // placeholder y la card no es clickeable.
  projects: [
    {
      name: "Sistema de Facturación ARCA",
      description: "Plataforma que simplifica la facturación electrónica con ARCA en simples pasos, reduciendo la complejidad del proceso para el cliente final.",
      role: "Desarrollo full-stack",
      stack: ["React", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
      images: []
    },
    {
      name: "Stock System Obras",
      description: "Sistema de gestión integral para empresas constructoras: control de stock, seguimiento de obras, administración de empleados, sueldos y gastos.",
      role: "Desarrollo full-stack",
      stack: ["React", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
      images: [
        "/images/projects/stock-system-obras-1.png",
        "/images/projects/stock-system-obras-2.png",
        "/images/projects/stock-system-obras-3.png",
        "/images/projects/stock-system-obras-4.png"
      ]
    },
    {
      name: "Buenos Hábitos",
      description: "Aplicación para el seguimiento de hábitos diarios, instalable y con soporte offline (PWA).",
      role: "Desarrollo full-stack",
      stack: ["React", "TypeScript", "Firebase"],
      images: [
        "/images/projects/buenos-habitos-1.png",
        "/images/projects/buenos-habitos-2.png",
        "/images/projects/buenos-habitos-3.png"
      ]
    }
  ]
};

// Permite reutilizar el mismo archivo desde Node (server.js) sin afectar al navegador.
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
