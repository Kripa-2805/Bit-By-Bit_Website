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
    const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// GAME CARD HOVER GLOW EFFECT
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    });
});

// STATS COUNTER ANIMATION
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    const statsSection = document.querySelector('.stats-section');
    const rect = statsSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight - 100 && !statsAnimated) {
        statsAnimated = true;
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            if (finalValue === '∞') return;
            
            const numValue = parseInt(finalValue);
            let current = 0;
            const increment = numValue / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
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
                otherBox.style.opacity = '0.6';
            }
        });
    });
    
    box.addEventListener('mouseleave', () => {
        featureBoxes.forEach(otherBox => {
            otherBox.style.opacity = '1';
        });
    });
});

// REGISTRATION BUTTON ANIMATION
const registerButtons = document.querySelectorAll('.cta-button');
registerButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.animation = 'none';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.animation = 'buttonPulse 2s ease-in-out infinite';
    });
});

// LOGO CLICK TO TOP
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
