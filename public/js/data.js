// Datos del portafolio — fuente única, consumida por el frontend (script clásico)
// y por server.js (vía require) para mantener al asistente IA sincronizado.
// Contenido basado en el CV (public/documents/CV_Agustin_Elisey.pdf).
//
// PORTFOLIO_DATA tiene una versión por idioma (es/en) con la misma forma.
// Los nombres propios (empresas, instituciones, nombres de proyectos, stack
// tecnológico, títulos oficiales de certificación) se mantienen iguales en
// ambos idiomas a propósito.

const PORTFOLIO_DATA = {
  es: {
    name: "Agustín Elisey",
    title: "Data Analyst & QA Engineer | SQL, Snowflake & Automatización",
    location: "Buenos Aires, Argentina",
    email: "agustinelisey22@gmail.com",
    about: `Data Analyst y QA Engineer con más de 2 años de experiencia en SQL, Snowflake, automatización de procesos y aseguramiento de calidad en entornos de e-commerce. Especializado en el diseño de consultas SQL/Snowflake, automatización de flujos de trabajo con Python y validación de integridad de datos.

Resultados comprobados: 60% de mejora en eficiencia operativa al automatizar la detección de duplicados sobre +6.000 registros mensuales (de 2 días a 12 horas), y 70% menos errores de datos gracias a controles de calidad sistemáticos. Formación en Tecnologías Web e Informática (Universidad Nacional del Oeste), certificaciones en Ciberseguridad (Google) y QA Testing (Selenium, Cypress), y experiencia aplicando Inteligencia Artificial (Claude, Anthropic) para optimizar flujos de trabajo técnicos. Además, desarrollador FullStack en proyectos propios.`,

    stats: [
      { value: 60, suffix: "%", label: "más de eficiencia operativa al automatizar la detección de duplicados" },
      { value: 70, suffix: "%", label: "menos errores de datos con controles de calidad sistemáticos" },
      { value: 6000, prefix: "+", label: "registros mensuales: de 2 días a 12 horas de procesamiento" },
      { value: 11, suffix: "", label: "personas en el equipo internacional con el que trabajé" }
    ],

    experience: [
      {
        company: "Atenea Tech",
        role: "Cofundador & Desarrollador FullStack",
        type: "Jornada completa",
        period: "Mar. 2026 - Presente",
        location: "Remoto",
        bullets: [
          "Cofundé Atenea Tech y lideré el desarrollo frontend (React, Tailwind CSS) y backend (Node.js, Express, PostgreSQL) de una suite de productos SaaS: gestión de stock para obras, facturación electrónica con ARCA, gestión de cafeterías y una academia online.",
          "Definí procesos de control de calidad y validación de datos entre los distintos módulos del ecosistema, y usé Git/GitHub y Docker para versionado y despliegue."
        ],
        skills: ["React", "Node.js", "PostgreSQL", "Docker", "Git"]
      },
      {
        company: "Shalion",
        role: "Data Analyst",
        type: "Jornada parcial",
        period: "May. 2024 - Feb. 2026",
        location: "Buenos Aires · Híbrido",
        bullets: [
          "Automaticé la detección y eliminación de productos y registros duplicados sobre ~6.000 registros mensuales, reduciendo el tiempo de procesamiento de 2 días a 12 horas (aprovechando el ciclo de refresco de 1 hora del sistema) e incrementando la eficiencia operativa en un 60%.",
          "Diseñé y optimicé consultas SQL y Snowflake para corregir errores de codificación y eliminar datos redundantes, reduciendo el margen de error en un 70% y elevando la integridad de la información.",
          "Implementé controles de validación y calidad de datos (data quality checks) sobre flujos de e-commerce, garantizando información confiable para la toma de decisiones y la experiencia del cliente.",
          "Gestioné y prioricé tareas en ClickUp bajo metodologías ágiles, colaborando con un equipo internacional multidisciplinario de 11 personas para asegurar el cumplimiento de plazos y estándares de calidad."
        ],
        skills: ["SQL", "Snowflake", "Python", "Data Quality", "ClickUp"]
      }
    ],

    education: [
      {
        institution: "Universidad Nacional del Oeste",
        degree: "Licenciatura en Informática",
        date: "Mar. 2020 - Presente",
        logo: "/images/logo-uno.png"
      },
      {
        institution: "Universidad Nacional del Oeste",
        degree: "Tecnicatura Universitaria en Tecnologías Web",
        date: "Mar. 2024 - Presente",
        logo: "/images/logo-uno.png"
      }
    ],

    certifications: [
      { title: "Connect and Protect: Networks and Network Security", issuer: "Google", date: "Sep. 2026", logo: "/images/logo-google.svg" },
      { title: "Play It Safe: Manage Security Risks", issuer: "Google", date: "Ago. 2026", logo: "/images/logo-google.svg" },
      { title: "Foundations of Cybersecurity", issuer: "Google", date: "Ago. 2026", logo: "/images/logo-google.svg" },
      { title: "QA Engineer desde 0 hasta Avanzado", issuer: "Udemy", date: "Jun. 2025", logo: "/images/logo-udemy.png" },
      { title: "Python Essentials 1", issuer: "Cisco", date: "Mar. 2024", logo: "/images/logo-cisco.svg" }
    ],

    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Intermedio, lectura técnica avanzada" }
    ],

    softSkills: ["Atención al detalle", "Pensamiento analítico", "Comunicación", "Trabajo en equipo", "Resolución de problemas", "Adaptabilidad"],

    skills: [
      { category: "Análisis de Datos", name: "SQL" },
      { category: "Análisis de Datos", name: "Snowflake" },
      { category: "Análisis de Datos", name: "Python" },
      { category: "Análisis de Datos", name: "Validación e integridad de datos" },
      { category: "Análisis de Datos", name: "Limpieza y deduplicación" },
      { category: "Análisis de Datos", name: "Reportes y dashboards" },
      { category: "QA y Automatización", name: "Diseño de casos de prueba" },
      { category: "QA y Automatización", name: "Testing manual y automatizado" },
      { category: "QA y Automatización", name: "Selenium" },
      { category: "QA y Automatización", name: "Cypress" },
      { category: "QA y Automatización", name: "Postman" },
      { category: "QA y Automatización", name: "JIRA" },
      { category: "Ciberseguridad", name: "Gestión de riesgos de seguridad" },
      { category: "Ciberseguridad", name: "Seguridad de la información" },
      { category: "Ciberseguridad", name: "Protección de datos" },
      { category: "Automatización de procesos", name: "Scripts en Python" },
      { category: "Automatización de procesos", name: "Automatización de flujos de trabajo" },
      { category: "Automatización de procesos", name: "Optimización de procesos" },
      { category: "Desarrollo Web", name: "React" },
      { category: "Desarrollo Web", name: "Node.js" },
      { category: "Desarrollo Web", name: "PostgreSQL" },
      { category: "Desarrollo Web", name: "TypeScript" },
      { category: "Herramientas", name: "Excel" },
      { category: "Herramientas", name: "ClickUp" },
      { category: "Herramientas", name: "Git y GitHub" },
      { category: "Herramientas", name: "Jenkins" },
      { category: "Herramientas", name: "Docker" },
      { category: "Herramientas", name: "Google Workspace" },
      { category: "IA aplicada", name: "Claude (Anthropic)" }
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
    name: "Agustín Elisey",
    title: "Data Analyst & QA Engineer | SQL, Snowflake & Automation",
    location: "Buenos Aires, Argentina",
    email: "agustinelisey22@gmail.com",
    about: `Data Analyst and QA Engineer with 2+ years of experience in SQL, Snowflake, process automation and quality assurance in e-commerce environments. Specialized in designing SQL/Snowflake queries, automating workflows with Python and validating data integrity.

Proven results: 60% improvement in operational efficiency by automating duplicate detection over 6,000+ monthly records (from 2 days down to 12 hours), and 70% fewer data errors thanks to systematic quality controls. Background in Web Technologies and Computer Science (Universidad Nacional del Oeste), certifications in Cybersecurity (Google) and QA Testing (Selenium, Cypress), and experience applying Artificial Intelligence (Claude, Anthropic) to optimize technical workflows. Also a FullStack developer on personal projects.`,

    stats: [
      { value: 60, suffix: "%", label: "more operational efficiency by automating duplicate detection" },
      { value: 70, suffix: "%", label: "fewer data errors through systematic quality controls" },
      { value: 6000, prefix: "+", label: "monthly records: from 2 days to 12 hours of processing" },
      { value: 11, suffix: "", label: "people in the international team I worked with" }
    ],

    experience: [
      {
        company: "Atenea Tech",
        role: "Co-founder & FullStack Developer",
        type: "Full-time",
        period: "Mar 2026 - Present",
        location: "Remote",
        bullets: [
          "Co-founded Atenea Tech and led the frontend (React, Tailwind CSS) and backend (Node.js, Express, PostgreSQL) development of a SaaS product suite: construction stock management, electronic invoicing with ARCA, coffee shop management and an online academy.",
          "Defined quality control and data validation processes across the modules of the ecosystem, and used Git/GitHub and Docker for versioning and deployment."
        ],
        skills: ["React", "Node.js", "PostgreSQL", "Docker", "Git"]
      },
      {
        company: "Shalion",
        role: "Data Analyst",
        type: "Part-time",
        period: "May 2024 - Feb 2026",
        location: "Buenos Aires · Hybrid",
        bullets: [
          "Automated the detection and removal of duplicate products and records over ~6,000 monthly records, cutting processing time from 2 days to 12 hours (leveraging the system's 1-hour refresh cycle) and raising operational efficiency by 60%.",
          "Designed and optimized SQL and Snowflake queries to fix encoding errors and remove redundant data, reducing the error margin by 70% and raising information integrity.",
          "Implemented data validation and quality checks on e-commerce flows, ensuring reliable information for decision-making and customer experience.",
          "Managed and prioritized tasks in ClickUp under agile methodologies, collaborating with an international multidisciplinary team of 11 people to meet deadlines and quality standards."
        ],
        skills: ["SQL", "Snowflake", "Python", "Data Quality", "ClickUp"]
      }
    ],

    education: [
      {
        institution: "Universidad Nacional del Oeste",
        degree: "Bachelor's Degree in Computer Science",
        date: "Mar 2020 - Present",
        logo: "/images/logo-uno.png"
      },
      {
        institution: "Universidad Nacional del Oeste",
        degree: "University Technical Degree in Web Technologies",
        date: "Mar 2024 - Present",
        logo: "/images/logo-uno.png"
      }
    ],

    certifications: [
      { title: "Connect and Protect: Networks and Network Security", issuer: "Google", date: "Sep 2026", logo: "/images/logo-google.svg" },
      { title: "Play It Safe: Manage Security Risks", issuer: "Google", date: "Aug 2026", logo: "/images/logo-google.svg" },
      { title: "Foundations of Cybersecurity", issuer: "Google", date: "Aug 2026", logo: "/images/logo-google.svg" },
      { title: "QA Engineer desde 0 hasta Avanzado", issuer: "Udemy", date: "Jun 2025", logo: "/images/logo-udemy.png" },
      { title: "Python Essentials 1", issuer: "Cisco", date: "Mar 2024", logo: "/images/logo-cisco.svg" }
    ],

    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Intermediate, advanced technical reading" }
    ],

    softSkills: ["Attention to detail", "Analytical thinking", "Communication", "Teamwork", "Problem solving", "Adaptability"],

    skills: [
      { category: "Data Analysis", name: "SQL" },
      { category: "Data Analysis", name: "Snowflake" },
      { category: "Data Analysis", name: "Python" },
      { category: "Data Analysis", name: "Data validation and integrity" },
      { category: "Data Analysis", name: "Data cleaning and deduplication" },
      { category: "Data Analysis", name: "Reports and dashboards" },
      { category: "QA & Automation", name: "Test case design" },
      { category: "QA & Automation", name: "Manual and automated testing" },
      { category: "QA & Automation", name: "Selenium" },
      { category: "QA & Automation", name: "Cypress" },
      { category: "QA & Automation", name: "Postman" },
      { category: "QA & Automation", name: "JIRA" },
      { category: "Cybersecurity", name: "Security risk management" },
      { category: "Cybersecurity", name: "Information security" },
      { category: "Cybersecurity", name: "Data protection" },
      { category: "Process Automation", name: "Python scripts" },
      { category: "Process Automation", name: "Workflow automation" },
      { category: "Process Automation", name: "Process optimization" },
      { category: "Web Development", name: "React" },
      { category: "Web Development", name: "Node.js" },
      { category: "Web Development", name: "PostgreSQL" },
      { category: "Web Development", name: "TypeScript" },
      { category: "Tools", name: "Excel" },
      { category: "Tools", name: "ClickUp" },
      { category: "Tools", name: "Git & GitHub" },
      { category: "Tools", name: "Jenkins" },
      { category: "Tools", name: "Docker" },
      { category: "Tools", name: "Google Workspace" },
      { category: "Applied AI", name: "Claude (Anthropic)" }
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

// Textos fijos de la interfaz (nav, botones, encabezados, footer, chat, demo, aria-labels).
const UI_STRINGS = {
  es: {
    nav: { about: "Sobre mí", experience: "Experiencia", projects: "Proyectos", skills: "Skills", contact: "Contacto" },
    hero: {
      line1: "Agustín",
      line2: "Elisey",
      sub: "Data Analyst & QA Engineer. Con SQL, Snowflake y Python hago que los datos sean confiables y que el software no falle.",
      downloadCv: "Descargar CV",
      contact: "Hablemos"
    },
    sections: {
      stats: "Resultados que se miden",
      demo: "Así limpio 6.000 registros",
      about: "Sobre mí",
      projects: "Proyectos",
      experience: "Experiencia",
      education: "Formación",
      certifications: "Certificaciones",
      skills: "Habilidades",
      softSkills: "Habilidades blandas",
      languages: "Idiomas",
      assistant: "Preguntale a mi asistente",
      contact: "Si tus datos importan, hablemos."
    },
    demo: {
      intro: "Una tabla con duplicados, tal como llegan. Ejecutá la consulta y mirá qué queda.",
      run: "Ejecutar consulta",
      reset: "Volver a empezar",
      running: "Ejecutando...",
      before: "registros",
      after: "únicos",
      removed: "duplicados eliminados",
      colSku: "sku",
      colName: "producto",
      colStatus: "estado",
      dup: "duplicado",
      ok: "ok",
      done: "Listo. Lo mismo, pero sobre ~6.000 registros por mes: de 2 días a 12 horas."
    },
    project: {
      previewSoon: "Vista previa próximamente",
      viewGallery: "Ver galería",
      viewMore: "Ver más"
    },
    ai: {
      title: "Asistente Virtual",
      sub: "Respondo sobre su experiencia, formación, proyectos y skills.",
      placeholder: "Escribí tu consulta...",
      welcome: "¡Hola! Soy el asistente virtual de Agustín. Preguntame sobre su experiencia, formación, proyectos o habilidades técnicas.",
      you: "Tú",
      assistant: "Asistente",
      thinking: "Escribiendo...",
      send: "Enviar",
      connectionError: "No pude conectar con el asistente. Por favor intentá nuevamente en unos segundos."
    },
    footer: {
      location: "Buenos Aires, Argentina",
      copyright: "© 2026 Agustín Elisey. Todos los derechos reservados."
    },
    aria: {
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
      line1: "Agustín",
      line2: "Elisey",
      sub: "Data Analyst & QA Engineer. With SQL, Snowflake and Python I make data reliable and keep software from breaking.",
      downloadCv: "Download CV",
      contact: "Let's talk"
    },
    sections: {
      stats: "Results you can measure",
      demo: "How I clean 6,000 records",
      about: "About me",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
      skills: "Skills",
      softSkills: "Soft skills",
      languages: "Languages",
      assistant: "Ask my assistant",
      contact: "If your data matters, let's talk."
    },
    demo: {
      intro: "A table with duplicates, as it arrives. Run the query and see what's left.",
      run: "Run query",
      reset: "Start over",
      running: "Running...",
      before: "records",
      after: "unique",
      removed: "duplicates removed",
      colSku: "sku",
      colName: "product",
      colStatus: "status",
      dup: "duplicate",
      ok: "ok",
      done: "Done. The same thing over ~6,000 records a month: from 2 days to 12 hours."
    },
    project: {
      previewSoon: "Preview coming soon",
      viewGallery: "View gallery",
      viewMore: "View more"
    },
    ai: {
      title: "Virtual Assistant",
      sub: "I answer about his experience, education, projects and skills.",
      placeholder: "Type your question...",
      welcome: "Hi! I'm Agustín's virtual assistant. Ask me about his experience, education, projects or technical skills.",
      you: "You",
      assistant: "Assistant",
      thinking: "Typing...",
      send: "Send",
      connectionError: "I couldn't connect to the assistant. Please try again in a few seconds."
    },
    footer: {
      location: "Buenos Aires, Argentina",
      copyright: "© 2026 Agustín Elisey. All rights reserved."
    },
    aria: {
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
