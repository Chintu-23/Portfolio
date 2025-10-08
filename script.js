// --- 1. Core Functions (Smooth Scroll, Mobile Nav, Scroll Class) ---

const navLinks = document.querySelectorAll('nav ul li a');
const navList = document.getElementById('nav-links');
const burger = document.querySelector('.burger');

// Smooth Scroll & Link Click Logic
for(const link of navLinks){
    link.addEventListener('click', function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({behavior: 'smooth'});

        // Close mobile nav if open
        if (navList.classList.contains('nav-active')) {
            navList.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
}

// Mobile Navbar Toggle
const navSlide = () => {
    const navLinks = document.querySelectorAll('#nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        navList.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}
navSlide();

// Navbar shrink on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});


// --- 2. Active Navigation State (Navigation Highlighting) ---

const sections = document.querySelectorAll('section');
const links = document.querySelectorAll('nav ul li a');

const activateLink = (id) => {
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        }
    });
};

const navObserverOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.5 // 50% of the section must be visible
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateLink(entry.target.id);
        }
    });
}, navObserverOptions);

sections.forEach(section => {
    navObserver.observe(section);
});


// --- 3. Animation Logic (Simplified & Corrected) ---

const homeSection = document.getElementById('home');
const homeContent = document.querySelector('.home-content.slide-in-left');
const homeImage = document.querySelector('.home-img.slide-in-right');

const aboutSection = document.getElementById('about');
const aboutImg = document.querySelector('.about-img');
const aboutText = document.querySelector('.about-text');


const animationObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        
        // --- Home Section Logic (Now using reset-animation class removal) ---
        if (entry.target.id === 'home') {
            if (entry.isIntersecting) {
                // When entering: Remove reset class to trigger CSS transition to visible state
                homeContent.classList.remove('reset-animation');
                homeImage.classList.remove('reset-animation');
            } else {
                // When leaving: Add reset class to trigger CSS transition back to hidden state
                homeContent.classList.add('reset-animation');
                homeImage.classList.add('reset-animation');
            }
        }
        
        // --- About Section Logic ---
        // Note: For about, we still use the 'animated' class for zoom/slide.
        if (entry.target.id === 'about') {
            if (entry.isIntersecting) {
                aboutImg.classList.add('animated');
                aboutText.classList.add('animated');
            } else {
                aboutImg.classList.remove('animated');
                aboutText.classList.remove('animated');
            }
        }
    });
}, animationObserverOptions);


// --- Initial Load Fix (Trigger Home Animation Immediately) ---
// Now we simply remove the 'reset-animation' class immediately on load.
function runHomeAnimationOnLoad() {
    homeContent.classList.remove('reset-animation');
    homeImage.classList.remove('reset-animation');
}

document.addEventListener('DOMContentLoaded', runHomeAnimationOnLoad);


// Start observing both Home and About sections
animationObserver.observe(homeSection);
animationObserver.observe(aboutSection);