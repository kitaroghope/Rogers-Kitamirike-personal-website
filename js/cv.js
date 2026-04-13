/**
 * CV Showcase - Vertical Scroll JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initYearDisplay();
    initVerticalScroll();
    initTypedText();
    initSkillBars();
    initCounterAnimation();
    initNavigationDots();
    initMouseParallax();
});

/**
 * Dynamic Year Display
 */
function initYearDisplay() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Vertical Scroll with Section Tracking
 */
function initVerticalScroll() {
    const container = document.querySelector('.horizontal-scroll');
    const sections = document.querySelectorAll('.section');
    const progressFill = document.querySelector('.progress-fill');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentSection = 0;
    const totalSections = sections.length;

    // Update progress bar and nav dots on scroll
    container.addEventListener('scroll', function() {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight - container.clientHeight;

        // Calculate current section based on scroll position
        const scrollProgress = scrollTop / scrollHeight;
        currentSection = Math.min(Math.floor(scrollProgress * totalSections), totalSections - 1);

        // Update progress bar
        if (progressFill) {
            const progress = ((currentSection + 1) / totalSections) * 100;
            progressFill.style.width = `${progress}%`;
        }

        // Update nav dots
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSection);
        });
    });

    // Intersection Observer for section tracking
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                if (index !== -1) {
                    currentSection = index;
                    updateProgressBar(index);
                    updateNavDots(index);
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));

    function updateProgressBar(index) {
        if (progressFill) {
            const progress = ((index + 1) / totalSections) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    function updateNavDots(index) {
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
}

/**
 * Typed Text Animation
 */
function initTypedText() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;

    const strings = [
        'Full Stack Developer',
        'Problem Solver',
        'Flutter Developer',
        'Backend Engineer',
        'UI/UX Enthusiast'
    ];

    // Create typed instance
    const typed = new Typed(typedElement, {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        fadeOut: false,
        smartBackspace: true
    });
}

/**
 * Skill Progress Bars Animation
 */
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.style.getPropertyValue('--progress');
                    bar.style.width = progress;
                });
            }
        });
    }, { threshold: 0.3 });

    skillCards.forEach(card => observer.observe(card));
}

/**
 * Counter Animation for Stats
 */
function initCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

/**
 * Navigation Dots Click Handler
 */
function initNavigationDots() {
    const dots = document.querySelectorAll('.nav-dot');
    const container = document.querySelector('.horizontal-scroll');

    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection && container) {
                container.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Mouse Parallax Effect
 */
function initMouseParallax() {
    const shapes = document.querySelectorAll('.floating-shape');
    const badges = document.querySelectorAll('.floating-badge');
    const orbitRings = document.querySelectorAll('.orbit-ring');

    if (!shapes.length && !badges.length) return;

    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Parallax for floating shapes
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Parallax for floating badges
        badges.forEach((badge, index) => {
            const speed = (index + 1) * 15;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            badge.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Parallax for orbit rings
        orbitRings.forEach((ring, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            ring.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    });
}

/**
 * Smooth scroll for anchor links - scroll container instead of window
 */
const container = document.querySelector('.horizontal-scroll');
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection && container) {
            container.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * AOS Animation Initialization
 */
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

/**
 * Add loaded class after page loads
 */
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Trigger skill bar animation for visible sections
    const visibleCards = document.querySelectorAll('.skill-card');
    visibleCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            const progressBars = card.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.style.getPropertyValue('--progress');
                bar.style.width = progress;
            });
        }
    });
});

/**
 * Resize handler
 */
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reinitialize any resize-dependent features
        AOS.refresh();
    }, 250);
});
