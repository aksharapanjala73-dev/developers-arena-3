// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize all features
    initializeDarkMode();
    initializeNavbar();
    initializeScrollEffects();
    initializeTypingEffect();
    initializeSkillBars();
    initializeBackToTop();
    initializeContactForm();
    initializeCursorTrail();
    initializeScrollPercentage();
    initializeStatCounters();
    initializeMusicToggle();
    initializeProjectCards();
    smoothScrolling();
}

// ==================== DARK MODE TOGGLE ====================
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // Check saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'light') {
        htmlElement.style.colorScheme = 'light';
        document.body.classList.add('light-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('darkMode', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// ==================== NAVBAR FUNCTIONALITY ====================
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const scrollProgress = document.getElementById('scrollProgress');
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Update scroll progress
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });
}

// ==================== SCROLL EFFECTS ====================
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation
    document.querySelectorAll('.skill-card, .project-card, .gallery-item, .feature-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// ==================== TYPING EFFECT ====================
function initializeTypingEffect() {
    const typingElement = document.getElementById('typing');
    const titles = ['Web Developer', 'UI Designer', 'Computer Science Student', 'Frontend Developer'];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const delayBetweenTitles = 2000;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Determine what to do next
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenTitles);
            return;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(type, 500);
            return;
        }
        
        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(type, speed);
    }
    
    // Start typing effect
    type();
}

// ==================== SKILL BARS ANIMATION ====================
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                    bar.classList.add('animated');
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ==================== BACK TO TOP BUTTON ====================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== CONTACT FORM VALIDATION ====================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset error messages
        clearErrors();
        
        // Validate form
        let isValid = true;
        
        if (name === '') {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        }
        
        if (phone === '') {
            showError('phone', 'Phone is required');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        if (subject === '') {
            showError('subject', 'Subject is required');
            isValid = false;
        }
        
        if (message === '') {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                hideSuccessMessage();
            }, 3000);
        }
    });
    
    // Real-time validation
    document.getElementById('name').addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('name', 'Name is required');
        } else {
            clearFieldError('name');
        }
    });
    
    document.getElementById('email').addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('email', 'Email is required');
        } else if (!isValidEmail(this.value.trim())) {
            showError('email', 'Please enter a valid email');
        } else {
            clearFieldError('email');
        }
    });
    
    document.getElementById('phone').addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('phone', 'Phone is required');
        } else if (!isValidPhone(this.value.trim())) {
            showError('phone', 'Please enter a valid phone number');
        } else {
            clearFieldError('phone');
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[^\d]/g, ''));
}

function showError(fieldId, errorMessage) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('show');
}

function clearFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
}

function hideSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('show');
}

// ==================== CURSOR TRAIL EFFECT ====================
function initializeCursorTrail() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursorDot || !cursorTrail) return;
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Update main cursor dot
        cursorDot.style.left = (x - 4) + 'px';
        cursorDot.style.top = (y - 4) + 'px';
        
        // Update trailing cursor
        cursorTrail.style.left = (x - 10) + 'px';
        cursorTrail.style.top = (y - 10) + 'px';
    });
    
    // Hide cursor trail on mouse leave
    document.addEventListener('mouseleave', function() {
        cursorDot.style.display = 'none';
        cursorTrail.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', function() {
        cursorDot.style.display = 'block';
        cursorTrail.style.display = 'block';
    });
}

// ==================== SCROLL PERCENTAGE ====================
function initializeScrollPercentage() {
    const scrollPercentageElement = document.getElementById('scrollPercentage');
    
    window.addEventListener('scroll', function() {
        const scrollPercentage = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        scrollPercentageElement.textContent = scrollPercentage + '%';
        
        if (scrollPercentage > 10) {
            scrollPercentageElement.classList.add('show');
        } else {
            scrollPercentageElement.classList.remove('show');
        }
    });
}

// ==================== STAT COUNTERS ====================
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const duration = 2000;
    let hasAnimated = false;
    
    const startCounters = () => {
        if (hasAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
        
        hasAnimated = true;
    };
    
    // Start counters when hero section is visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.unobserve(entries[0].target);
        }
    });
    
    const heroSection = document.querySelector('.hero');
    observer.observe(heroSection);
}

// ==================== MUSIC TOGGLE ====================
function initializeMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    let isMusicPlaying = false;
    
    // Create audio element
    const audio = new Audio();
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
    audio.loop = true;
    audio.volume = 0.3;
    
    musicToggle.addEventListener('click', function() {
        if (!isMusicPlaying) {
            audio.play();
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            isMusicPlaying = true;
        } else {
            audio.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            isMusicPlaying = false;
        }
    });
}

// ==================== PROJECT CARDS 3D EFFECT ====================
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ==================== GALLERY MODAL ====================
function openModal(img) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    
    modal.classList.add('active');
    modalImg.src = img.src;
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

// Close modal when clicking outside the image
document.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ==================== SMOOTH SCROLLING ====================
function smoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== RIPPLE EFFECT ON BUTTONS ====================
document.querySelectorAll('.clover-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== MAGNETIC HOVER EFFECT ====================
document.querySelectorAll('.clover-button').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const x = e.clientX - this.getBoundingClientRect().left;
        const y = e.clientY - this.getBoundingClientRect().top;
        
        this.style.backgroundPosition = x + 'px ' + y + 'px';
    });
});

// ==================== PAGE TRANSITION EFFECT ====================
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';
        }, 2000);
    }
});

// ==================== PARALLAX EFFECT ====================
document.addEventListener('mousemove', function(e) {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const x = (e.clientX / window.innerWidth) * 20;
        const y = (e.clientY / window.innerHeight) * 20;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==================== ACCESSIBILITY IMPROVEMENTS ====================
// Focus visible styles
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for mousemove events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== BUTTON LINK NAVIGATION ====================
document.querySelectorAll('.clover-button').forEach(button => {
    button.addEventListener('click', function() {
        const link = this.getAttribute('data-link');
        if (link === 'download') {
            // Trigger download resume
            const link = document.createElement('a');
            link.href = 'https://via.placeholder.com/100x100?text=Resume';
            link.download = 'Akshara_Panjala_Resume.pdf';
            link.click();
        } else if (link === 'contact') {
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== LOCAL STORAGE MANAGER ====================
const StorageManager = {
    save: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    },
    
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage:', e);
        }
    }
};

// ==================== UTILITY FUNCTIONS ====================

// Get random color
function getRandomColor() {
    const colors = ['#00d4ff', '#b300ff', '#00fff5', '#ff006e'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Get random number between min and max
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Create particle effect
function createParticles(x, y) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = getRandomColor();
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        document.body.appendChild(particle);
        
        const vx = getRandomNumber(-5, 5);
        const vy = getRandomNumber(-5, 5);
        let opacity = 1;
        
        const animate = setInterval(() => {
            x += vx;
            y += vy;
            opacity -= 0.05;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(animate);
                particle.remove();
            }
        }, 30);
    }
}

// ==================== EVENT LISTENER FOR CLICK PARTICLES ====================
document.addEventListener('click', function(e) {
    // Only create particles on button clicks or interactive elements
    if (e.target.closest('.clover-button, .gallery-btn, .project-btn')) {
        createParticles(e.clientX, e.clientY);
    }
});

// ==================== MOBILE MENU CLOSE ON SCROLL ====================
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navMenu = document.getElementById('navMenu');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navMenu.classList.remove('active');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== INTERSECTION OBSERVER FOR IMAGES ====================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('img').forEach(img => {
    img.style.opacity = '0.5';
    imageObserver.observe(img);
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🎨 Welcome to Akshara\'s Premium Portfolio!', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%cDesigned with ❤️ using HTML, CSS & JavaScript', 'font-size: 14px; color: #b300ff;');
console.log('%cFor inquiries: aksharapanjala73@gmail.com', 'font-size: 12px; color: #00fff5;');
