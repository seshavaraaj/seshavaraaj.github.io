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
        // Add animation classes to sections and projects
        this.addAnimationToElements('.glass-panel', true);
        this.addAnimationToElements('.project', false);
    }

    addAnimationToElements(selector, skipFirstDelay) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            const shouldSkip = skipFirstDelay && index === 0;
            if (!shouldSkip) {
                element.style.transitionDelay = `${index * 0.1}s`;
            }
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
