document.addEventListener('DOMContentLoaded', () => {

    // ─── 1. Active Nav Link on Scroll ───────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                const id = section.getAttribute('id');
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // ─── 2. Smooth Scroll on Anchor Click ───────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                // Close mobile menu if open
                navLinksEl.classList.remove('open');
                menuToggleBtn.classList.remove('open');

                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, null, targetId);
            }
        });
    });

    // ─── 3. Scroll Reveal Animation ─────────────────────────────
    const revealEls = document.querySelectorAll('.fade-up, .service-card, .project-item, .team-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger animation for grid items
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 60}ms`;
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // ─── 4. Back to Top Button ───────────────────────────────────
    const backBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        backBtn.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });

    backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── 5. Mobile Hamburger Menu ────────────────────────────────
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const navLinksEl = document.getElementById('navLinks');

    if (menuToggleBtn && navLinksEl) {
        menuToggleBtn.addEventListener('click', () => {
            navLinksEl.classList.toggle('open');
            menuToggleBtn.classList.toggle('open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggleBtn.contains(e.target) && !navLinksEl.contains(e.target)) {
                navLinksEl.classList.remove('open');
                menuToggleBtn.classList.remove('open');
            }
        });
    }

    // ─── 6. Service Card 3D Tilt Effect ─────────────────────────
    if (window.innerWidth > 768) {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
                const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
                card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ─── 7. Scroll Indicator Click ───────────────────────────────
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const projects = document.getElementById('projects');
            if (projects) projects.scrollIntoView({ behavior: 'smooth' });
        });
    }

});
