// Datos del portafolio — fuente única, consumida por el frontend (script clásico)
// y por server.js (vía require) para mantener al asistente IA sincronizado.
//
// PORTFOLIO_DATA tiene una versión por idioma (es/en) con la misma forma.
// Los nombres propios (empresas, instituciones, nombres de proyectos, stack
// tecnológico, títulos oficiales de certificación) se mantienen iguales en
// ambos idiomas a propósito.

const PORTFOLIO_DATA = {
  es: {
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

    projects: [
      {
        name: "Sistema de Facturación ARCA",
        description: "Plataforma que simplifica la facturación electrónica con ARCA en simples pasos, reduciendo la complejidad del proceso para el cliente final.",
        role: "Desarrollo full-stack",
        stack: ["React", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
        images: [
          "/images/projects/facturacion-arca-1.png",
          "/images/projects/facturacion-arca-2.png",
          "/images/projects/facturacion-arca-3.png"
        ]
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
        name: "Atenea Eat",
        description: "Sistema de gestión integral para cafeterías: control de stock e insumos, mapa de mesas en vivo, cobranzas y personal organizado por roles (propietario, empleado).",
        role: "Desarrollo full-stack",
        stack: ["React", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
        images: [
          "/images/projects/atenea-eat-1.png",
          "/images/projects/atenea-eat-2.png",
          "/images/projects/atenea-eat-3.png",
          "/images/projects/atenea-eat-4.png",
          "/images/projects/atenea-eat-5.png"
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
  },

  en: {
    name: "Agustin Elisey Larco",
    title: "Data Analyst | QA Tester",
    location: "Buenos Aires, Buenos Aires Province, Argentina",
    contacts: 48,
    about: `As a former Data Analyst at Shalion, I applied my analytical skills, Quality Assurance and Testing expertise. My experience includes using SQL for data validation, process documentation, and identifying and reporting data inconsistencies, all within collaborative agile environments.

My academic background includes a Bachelor's Degree in Computer Science from Universidad Nacional del Oeste, where I also earned a Technical Degree in Web Technologies. I'm certified as a QA Engineer through Udemy and I'm currently developing my skills in test automation and agile methodologies to deliver quality solutions in the tech field.`,

    experience: [
      {
        company: "Shalion",
        role: "Data Analyst",
        type: "Part-time",
        period: "May 2024 - Feb 2026",
        duration: "1 year 9 months",
        location: "Buenos Aires Province, Argentina · Hybrid",
        skills: ["Google Sheets", "SQL", "Data Analysis", "Quality Assurance"],
        logo: "https://picsum.photos/seed/shalion/200/200"
      }
    ],

    education: [
      {
        institution: "Universidad Nacional del Oeste",
        degree: "University Technical Degree in Web Technologies",
        date: "Mar 2023",
        skills: ["API Development", "Web Development", "JavaScript"],
        logo: "/images/logo-uno.png"
      },
      {
        institution: "Universidad Nacional del Oeste",
        degree: "Bachelor's Degree in Computer Science",
        date: "Mar 2020",
        skills: ["Project Management", "Teamwork", "Software Architecture"],
        logo: "/images/logo-uno.png"
      }
    ],

    certifications: [
      {
        title: "Play It Safe: Manage Security Risks",
        issuer: "Google",
        date: "Aug 2026",
        id: "GZ4HJNJS1ZOO",
        skills: [],
        logo: "/images/logo-google.svg"
      },
      {
        title: "Foundations of Cybersecurity",
        issuer: "Google",
        date: "Aug 2026",
        id: "VNESX3Q37L61",
        skills: ["Cybersecurity", "Information Security"],
        logo: "/images/logo-google.svg"
      },
      {
        title: "QA Engineer desde 0 hasta avanzado",
        issuer: "Udemy",
        date: "Jun 2025",
        id: "UC-5cfd0673-a8c2-4d33-941e-eccd051f32d6",
        skills: ["JIRA", "Test Cases", "Agile Methodologies", "Testing Automation"],
        logo: "/images/logo-udemy.png"
      },
      {
        title: "Python Essentials 1",
        issuer: "Cisco",
        date: "Mar 2024",
        id: null,
        skills: [],
        logo: "/images/logo-cisco.svg"
      }
    ],

    skills: [
      { name: "SQL", category: "Data & DB" },
      { name: "JIRA", category: "Tools" },
      { name: "Issue Resolution", category: "QA" },
      { name: "Test Cases", category: "QA" },
      { name: "Teamwork", category: "Soft Skills" },
      { name: "Google Sheets", category: "Tools" },
      { name: "Agile/Scrum", category: "Process" },
      { name: "Manual Testing", category: "QA" },
      { name: "Documentation", category: "Process" }
    ],

    projects: [
      {
        name: "Sistema de Facturación ARCA",
        description: "A platform that simplifies electronic invoicing with ARCA in a few simple steps, reducing process complexity for the end client.",
        role: "Full-stack Development",
        stack: ["React", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
        images: [
          "/images/projects/facturacion-arca-1.png",
          "/images/projects/facturacion-arca-2.png",
          "/images/projects/facturacion-arca-3.png"
        ]
      },
      {
        name: "Stock System Obras",
        description: "A comprehensive management system for construction companies: stock control, project tracking, staff administration, payroll and expenses.",
        role: "Full-stack Development",
        stack: ["React", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
        images: [
          "/images/projects/stock-system-obras-1.png",
          "/images/projects/stock-system-obras-2.png",
          "/images/projects/stock-system-obras-3.png",
          "/images/projects/stock-system-obras-4.png"
        ]
      },
      {
        name: "Atenea Eat",
        description: "A comprehensive management system for coffee shops: stock and supplies control, live table map, payment collection, and role-based staff management (owner, employee).",
        role: "Full-stack Development",
        stack: ["React", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
        images: [
          "/images/projects/atenea-eat-1.png",
          "/images/projects/atenea-eat-2.png",
          "/images/projects/atenea-eat-3.png",
          "/images/projects/atenea-eat-4.png",
          "/images/projects/atenea-eat-5.png"
        ]
      },
      {
        name: "Buenos Hábitos",
        description: "An app for tracking daily habits, installable with offline support (PWA).",
        role: "Full-stack Development",
        stack: ["React", "TypeScript", "Firebase"],
        images: [
          "/images/projects/buenos-habitos-1.png",
          "/images/projects/buenos-habitos-2.png",
          "/images/projects/buenos-habitos-3.png"
        ]
      }
    ]
  }
};

// Textos fijos de la interfaz (nav, botones, encabezados, footer, chat, aria-labels).
const UI_STRINGS = {
  es: {
    nav: { about: "Sobre mí", experience: "Experiencia", projects: "Proyectos", skills: "Skills", contact: "Contacto" },
    hero: {
      subtitleHtml: 'Data Analyst especializado en\n                <span class="text-emerald-600 dark:text-emerald-400 font-medium">Data Integrity</span> y\n                <span class="text-emerald-600 dark:text-emerald-400 font-medium">Quality Assurance</span>.',
      downloadCv: "Descargar CV",
      contact: "Contactar"
    },
    sections: {
      about: "Sobre mí",
      projects: "Proyectos Destacados",
      experience: "Experiencia Laboral",
      education: "Formación Académica",
      certifications: "Certificaciones Especializadas",
      skills: "Habilidades Técnicas"
    },
    project: {
      previewSoon: "Vista previa próximamente",
      viewGallery: "Ver galería",
      viewMore: "Ver más"
    },
    cert: { issued: "Exp:", credentialId: "Credential ID:" },
    ai: {
      title: "Asistente Virtual",
      placeholder: "Escribí tu consulta...",
      welcome: "¡Hola! Soy el asistente virtual de Agustín. Preguntame sobre su experiencia, formación, proyectos o habilidades técnicas.",
      you: "Tú",
      assistant: "Asistente",
      thinking: "Escribiendo...",
      connectionError: "No pude conectar con el asistente. Por favor intentá nuevamente en unos segundos."
    },
    footer: {
      description: "Portfolio especializado en ingeniería de datos, aseguramiento de calidad y desarrollo de plataformas SaaS.",
      navHeading: "Navegación",
      locationHeading: "Ubicación",
      location: "Buenos Aires, Argentina",
      timezone: "UTC-3:00",
      copyright: "© 2026 Agustín Elisey Larco. Todos los derechos reservados."
    },
    aria: {
      linkedin: "LinkedIn",
      email: "Email",
      github: "GitHub",
      themeToggle: "Cambiar tema claro/oscuro",
      langToggle: "Cambiar idioma",
      modalClose: "Cerrar",
      modalPrev: "Anterior",
      modalNext: "Siguiente"
    },
    emailCopied: "Email copiado"
  },

  en: {
    nav: { about: "About", experience: "Experience", projects: "Projects", skills: "Skills", contact: "Contact" },
    hero: {
      subtitleHtml: 'Data Analyst specialized in\n                <span class="text-emerald-600 dark:text-emerald-400 font-medium">Data Integrity</span> and\n                <span class="text-emerald-600 dark:text-emerald-400 font-medium">Quality Assurance</span>.',
      downloadCv: "Download CV",
      contact: "Contact"
    },
    sections: {
      about: "About Me",
      projects: "Featured Projects",
      experience: "Work Experience",
      education: "Education",
      certifications: "Specialized Certifications",
      skills: "Technical Skills"
    },
    project: {
      previewSoon: "Preview coming soon",
      viewGallery: "View gallery",
      viewMore: "View more"
    },
    cert: { issued: "Issued:", credentialId: "Credential ID:" },
    ai: {
      title: "Virtual Assistant",
      placeholder: "Type your question...",
      welcome: "Hi! I'm Agustín's virtual assistant. Ask me about his experience, education, projects or technical skills.",
      you: "You",
      assistant: "Assistant",
      thinking: "Typing...",
      connectionError: "I couldn't connect to the assistant. Please try again in a few seconds."
    },
    footer: {
      description: "Portfolio focused on data engineering, quality assurance, and SaaS platform development.",
      navHeading: "Navigation",
      locationHeading: "Location",
      location: "Buenos Aires, Argentina",
      timezone: "UTC-3:00",
      copyright: "© 2026 Agustín Elisey Larco. All rights reserved."
    },
    aria: {
      linkedin: "LinkedIn",
      email: "Email",
      github: "GitHub",
      themeToggle: "Toggle light/dark theme",
      langToggle: "Change language",
      modalClose: "Close",
      modalPrev: "Previous",
      modalNext: "Next"
    },
    emailCopied: "Email copied"
  }
};

// Permite reutilizar el mismo archivo desde Node (server.js) sin afectar al navegador.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PORTFOLIO_DATA, UI_STRINGS };
}
