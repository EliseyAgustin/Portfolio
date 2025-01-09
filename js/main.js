document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // GSAP animations
    gsap.from("header", { opacity: 0, y: -50, duration: 1, ease: "power3.out" });
    gsap.from("nav", { opacity: 0, y: -20, duration: 1, delay: 0.5, ease: "power3.out" });

    gsap.from(".social-links a", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        delay: 1
    });

    gsap.from(".project-card", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#projects",
            start: "top 80%"
        }
    });


    // Typing effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(typeWriter, 1000);

    // Form submission (you would need to implement the actual form submission logic)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! (This is a demo, no actual submission occurred)');
    });
});
