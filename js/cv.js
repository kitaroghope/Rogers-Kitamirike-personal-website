/**
 * CV Showcase - Horizontal Scroll JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initYearDisplay();
    initHorizontalScroll();
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
 * Horizontal Scroll with Mouse Wheel
 */
function initHorizontalScroll() {
    const container = document.querySelector('.horizontal-scroll');
    const sections = document.querySelectorAll('.section');
    const scrollHint = document.querySelector('.scroll-hint');
    let isScrolling = false;
    let currentSection = 0;
    const totalSections = sections.length;

    // Hide scroll hint after first scroll
    if (scrollHint) {
        container.addEventListener('scroll', function() {
            scrollHint.style.opacity = '0';
            scrollHint.style.transition = 'opacity 0.3s';
        }, { once: true });
    }

    // Mouse wheel horizontal scroll
    container.addEventListener('wheel', function(e) {
        e.preventDefault();

        if (isScrolling) return;

        isScrolling = true;

        if (e.deltaY > 0 || e.deltaX > 0) {
            // Scroll right
            if (currentSection < totalSections - 1) {
                currentSection++;
                scrollToSection(currentSection);
            }
        } else {
            // Scroll left
            if (currentSection > 0) {
                currentSection--;
                scrollToSection(currentSection);
            }
        }

        setTimeout(() => {
            isScrolling = false;
        }, 800);
    }, { passive: false });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', function(e) {
        if (isScrolling) return;

        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            isScrolling = true;

            if (diff > 0 && currentSection < totalSections - 1) {
                // Swipe left - next section
                currentSection++;
                scrollToSection(currentSection);
            } else if (diff < 0 && currentSection > 0) {
                // Swipe right - previous section
                currentSection--;
                scrollToSection(currentSection);
            }

            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (isScrolling) return;

        isScrolling = true;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (currentSection < totalSections - 1) {
                currentSection++;
                scrollToSection(currentSection);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (currentSection > 0) {
                currentSection--;
                scrollToSection(currentSection);
            }
        }

        setTimeout(() => {
            isScrolling = false;
        }, 800);
    });

    // Scroll to section function
    function scrollToSection(index) {
        const targetSection = sections[index];
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            updateProgressBar(index);
            updateNavDots(index);
        }
    }

    // Update progress bar
    function updateProgressBar(index) {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            const progress = ((index + 1) / totalSections) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }

    // Update navigation dots
    function updateNavDots(index) {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

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
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
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

    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
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
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
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
