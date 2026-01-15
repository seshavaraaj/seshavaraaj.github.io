export class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '50px', // Start loading 50px before entering viewport
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
        this.addAnimationToElements('.glass-panel', true);
        this.addAnimationToElements('.project', false);
    }

    addAnimationToElements(selector, skipFirstDelay) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            const shouldSkip = skipFirstDelay && index === 0;
            if (!shouldSkip) { element.style.transitionDelay = `${index * 0.1}s`; }
        });
    }

    setupObserver() {
        // Observe all elements with animate-on-scroll class
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        animatedElements.forEach(el => this.observer.observe(el));
    }

    // Removed unused destroy method
}
