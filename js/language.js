const translations = {
    en: {
        subtitle: "Computer Science | Web Technologies | QA Manual",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        aboutMe: "About Me",
        aboutText1: "I'm a passionate student with a Bachelor's in Computer Science and a University Degree in Web Technologies. Currently, I'm pursuing a career in QA Manual testing to ensure top-notch software quality. With a keen eye for detail and a love for problem-solving, I strive to contribute to the development of robust and user-friendly applications.",
        aboutText2: "My academic background has equipped me with a strong foundation in various programming languages and web technologies. I'm constantly learning and adapting to new technologies to stay at the forefront of the ever-evolving tech landscape.",
        downloadCV: "Download CV",
        project1Title: "E-commerce Platform",
        project1Desc: "A full-stack web application built with React and Node.js, featuring user authentication, product catalog, and payment integration.",
        project2Title: "Bug Tracking System",
        project2Desc: "A QA tool developed using Python and Django, allowing teams to efficiently manage and track software bugs throughout the development lifecycle.",
        project3Title: "Portfolio Website",
        project3Desc: "This responsive portfolio showcasing my skills and projects, built with HTML, CSS, and JavaScript to demonstrate my web development abilities.",
        viewProject: "View Project",
        contactMe: "Contact Me",
        email: "Email",
        phone: "Phone",
        location: "Location",
        allRightsReserved: "All rights reserved."
    },
    es: {
        subtitle: "Ciencias de la Computación | Tecnologías Web | QA Manual",
        about: "Sobre mí",
        skills: "Habilidades",
        projects: "Proyectos",
        contact: "Contacto",
        aboutMe: "Sobre mí",
        aboutText1: "Soy un estudiante apasionado con una Licenciatura en Ciencias de la Computación y un Título Universitario en Tecnologías Web. Actualmente, estoy desarrollando una carrera en pruebas manuales de QA para garantizar una calidad de software de primer nivel. Con un ojo agudo para los detalles y un amor por la resolución de problemas, me esfuerzo por contribuir al desarrollo de aplicaciones robustas y fáciles de usar.",
        aboutText2: "Mi formación académica me ha proporcionado una base sólida en varios lenguajes de programación y tecnologías web. Estoy constantemente aprendiendo y adaptándome a nuevas tecnologías para mantenerme a la vanguardia del panorama tecnológico en constante evolución.",
        downloadCV: "Descargar CV",
        project1Title: "Plataforma de Comercio Electrónico",
        project1Desc: "Una aplicación web full-stack construida con React y Node.js, con autenticación de usuarios, catálogo de productos e integración de pagos.",
        project2Title: "Sistema de Seguimiento de Errores",
        project2Desc: "Una herramienta de QA desarrollada con Python y Django, que permite a los equipos gestionar y rastrear eficientemente los errores de software durante todo el ciclo de desarrollo.",
        project3Title: "Sitio Web de Portafolio",
        project3Desc: "Este portafolio responsivo que muestra mis habilidades y proyectos, construido con HTML, CSS y JavaScript para demostrar mis habilidades de desarrollo web.",
        viewProject: "Ver Proyecto",
        contactMe: "Contáctame",
        email: "Correo electrónico",
        phone: "Teléfono",
        location: "Ubicación",
        allRightsReserved: "Todos los derechos reservados."
    }
};

function changeLanguage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('languageSwitcher');
    let currentLang = 'en';

    languageSwitcher.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        changeLanguage(currentLang);
    });
});

