// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let slideInterval;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    resetInterval();
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
}

function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

startInterval();

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounters, 20);
        } else {
            counter.innerText = target + '+';
        }
    });
};

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.stats-section');
let counted = false;

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
            animateCounters();
            counted = true;
        }
    });
}, observerOptions);

observer.observe(statsSection);

// ===== PROJECTS FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMATION ON SCROLL =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .feature-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

document.querySelectorAll('.service-card, .project-card, .testimonial-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

console.log('Brahmaputra Construction - Forest Green & Amber Theme Loaded! 🌿');