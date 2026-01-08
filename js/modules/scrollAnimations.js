/**
 * Scroll Animations Module
 * Handles element animations on scroll
 */

export class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.observer = null;
        this.initialize();
    }

    initialize() {
        // Add animate-on-scroll class to sections
        this.addAnimationClasses();
        
        // Setup Intersection Observer for scroll animations
        this.setupObserver();
    }

    addAnimationClasses() {
        // Add animation classes to sections that should animate
        const sections = document.querySelectorAll('.glass-panel');
        sections.forEach((section, index) => {
            // Add delay based on index for staggered effect
            section.classList.add('animate-on-scroll');
            if (index > 0) {
                section.style.transitionDelay = `${index * 0.1}s`;
            }
        });

        // Add animation to project cards
        const projects = document.querySelectorAll('.project');
        projects.forEach((project, index) => {
            project.classList.add('animate-on-scroll');
            project.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    setupObserver() {
        // Observe all elements with animate-on-scroll class
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Unobserve after animation to improve performance
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        animatedElements.forEach(el => this.observer.observe(el));
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
