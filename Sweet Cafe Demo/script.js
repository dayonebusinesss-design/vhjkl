document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect + Hamburger color fix
    const navbar = document.getElementById('navbar');
    const hamburgerBars = document.querySelectorAll('.hamburger .bar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle body scroll
            if(hamburger.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Menu Tab Switching
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Re-trigger reveal animation for newly visible items
            const newActiveElements = document.getElementById(targetId).querySelectorAll('.reveal');
            newActiveElements.forEach(el => {
                el.classList.remove('active');
                // Small timeout to allow CSS to reset
                setTimeout(() => {
                    el.classList.add('active');
                }, 50);
            });
        });
    });

    // Smooth scrolling
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

    // Intersection Observer for Scroll Animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of element is in view
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    });

    revealElements.forEach(el => {
        // Only observe elements that are currently displayed (not in hidden tabs)
        revealObserver.observe(el);
    });
});
