document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // --- 2. Typed.js Initialization (Typing Effect) ---
    if (typeof Typed !== 'undefined') {
        new Typed('.type-text', {
            strings: ['Digital.', 'Modern.', 'Inovatif.', 'Global.'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });
    }

    // --- 3. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150; // trigger point

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // --- 4. Animated Counter for Visitors ---
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Speed of counting

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/,/g, '');
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc).toLocaleString();
            setTimeout(() => startCounter(counter), 20);
        } else {
            counter.innerText = target.toLocaleString() + "+";
        }
    };

    // Trigger counter when it's visible
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- 5. Scroll Progress Bar ---
    const progressBar = document.querySelector('.scroll-progress');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + '%';
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

});
