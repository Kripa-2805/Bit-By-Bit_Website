// SCROLL ANIMATIONS
const fadeElements = document.querySelectorAll('.fade-in');

const checkScroll = () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', checkScroll);
checkScroll();

// SMOOTH SCROLL FOR NAVIGATION
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Smooth scroll to section
            const offsetTop = target.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ACTIVE NAVIGATION LINK TRACKING
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const setActiveLink = () => {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink(); // Set initial active state

// PARALLAX EFFECT ON HERO
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.008;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.008;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    // Parallax for floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.003;
        const x = moveX * speed;
        const y = moveY * speed;
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// STATS COUNTER ANIMATION
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const rect = statsSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight - 100 && !statsAnimated) {
        statsAnimated = true;
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            if (finalValue === '∞') return;
            
            const numValue = parseInt(finalValue);
            let current = 0;
            const increment = numValue / 60;
            const duration = 2000;
            const stepTime = duration / 60;
            
            stat.textContent = '0';
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= numValue) {
                    stat.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, stepTime);
        });
    }
};

window.addEventListener('scroll', animateStats);

// FEATURE BOX HOVER EFFECTS
const featureBoxes = document.querySelectorAll('.feature-box');
featureBoxes.forEach((box, index) => {
    box.addEventListener('mouseenter', () => {
        featureBoxes.forEach((otherBox, otherIndex) => {
            if (otherIndex !== index) {
                otherBox.style.opacity = '0.5';
                otherBox.style.transform = 'scale(0.95)';
            }
        });
    });
    
    box.addEventListener('mouseleave', () => {
        featureBoxes.forEach(otherBox => {
            otherBox.style.opacity = '1';
            otherBox.style.transform = 'scale(1)';
        });
    });
});

// GAME CARDS STAGGER ANIMATION
const gameCards = document.querySelectorAll('.game-card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const gameObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            gameObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

gameCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    gameObserver.observe(card);
});

// REGISTRATION STEPS ANIMATION
const stepCards = document.querySelectorAll('.step-card');
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
            stepObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

stepCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-50px)';
    card.style.transition = 'all 0.6s ease';
    stepObserver.observe(card);
});

// LOGO CLICK TO TOP
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// HIDE FLOATING BUTTON IN REGISTRATION SECTION
const floatingBtn = document.querySelector('.floating-register');
const registerSection = document.querySelector('#register');

window.addEventListener('scroll', () => {
    if (registerSection) {
        const rect = registerSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            floatingBtn.style.opacity = '0';
            floatingBtn.style.pointerEvents = 'none';
        } else {
            floatingBtn.style.opacity = '1';
            floatingBtn.style.pointerEvents = 'auto';
        }
    }
});

// SMOOTH REVEAL ON PAGE LOAD
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ADD RIPPLE EFFECT TO BUTTONS
document.querySelectorAll('.cta-button, .float-btn').forEach(button => {
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

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// GAME CARD TILT EFFECT
gameCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// GLIMPSE CAROUSEL
let glimpseCurrentSlide = 0;
const glimpseTrack = document.querySelector('.glimpse-track');
const glimpseSlides = document.querySelectorAll('.glimpse-slide');

function moveGlimpse(direction) {
    const totalSlides = glimpseSlides.length;
    glimpseCurrentSlide += direction;
    
    if (glimpseCurrentSlide < 0) {
        glimpseCurrentSlide = totalSlides - 1;
    } else if (glimpseCurrentSlide >= totalSlides) {
        glimpseCurrentSlide = 0;
    }
    
    if (glimpseTrack) {
        glimpseTrack.style.transform = `translateX(-${glimpseCurrentSlide * 100}%)`;
    }
}

// Auto-advance carousel every 5 seconds
setInterval(() => {
    moveGlimpse(1);
}, 5000);

// GALLERY VIDEO PLAY ON CLICK
document.querySelectorAll('.video-item video').forEach(video => {
    video.addEventListener('click', function() {
        if (this.paused) {
            this.play();
            this.setAttribute('controls', 'controls');
        } else {
            this.pause();
        }
    });
});

// GALLERY ITEMS STAGGER ANIMATION
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 80);
            galleryObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'all 0.6s ease';
    galleryObserver.observe(item);
});
