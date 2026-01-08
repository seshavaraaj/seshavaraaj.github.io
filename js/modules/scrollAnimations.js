/**
 * Scroll Animations Module
 * Handles scroll-triggered animations for elements
 */

class ScrollAnimations {
    constructor(options = {}) {
        this.options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
            ...options
        };
        
        this.observer = null;
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        // Check for IntersectionObserver support
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported');
            this.fallbackInit();
            return;
        }

        this.setupObserver();
        this.observeElements();
        this.addEventListeners();
    }

    setupObserver() {
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                threshold: this.options.threshold,
                rootMargin: this.options.rootMargin
            }
        );
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                this.animateElement(entry.target);
                this.animatedElements.add(entry.target);
            }
        });
    }

    animateElement(element) {
        // Add revealed class for scroll-reveal elements
        if (element.classList.contains('scroll-reveal')) {
            element.classList.add('revealed');
        }

        // Trigger custom animation based on data attributes
        const animationType = element.dataset.animation;
        if (animationType) {
            element.style.animation = `${animationType} 0.8s ease forwards`;
        }

        // Handle stagger animation for children
        if (element.classList.contains('stagger-parent')) {
            this.staggerChildren(element);
        }
    }

    staggerChildren(parent) {
        const children = Array.from(parent.children);
        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '0';
                child.style.animation = `fadeInUp 0.6s ease forwards`;
            }, index * 100);
        });
    }

    observeElements() {
        // Observe scroll-reveal elements
        const revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach(el => this.observer.observe(el));

        // Observe elements with data-animation attribute
        const animatedElements = document.querySelectorAll('[data-animation]');
        animatedElements.forEach(el => this.observer.observe(el));

        // Observe stagger parent elements
        const staggerParents = document.querySelectorAll('.stagger-parent');
        staggerParents.forEach(el => this.observer.observe(el));
    }

    fallbackInit() {
        // Simple fallback for browsers without IntersectionObserver
        const elements = document.querySelectorAll('.scroll-reveal, [data-animation]');
        elements.forEach(el => {
            el.classList.add('revealed');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    addEventListeners() {
        // Re-observe elements when new content is added
        document.addEventListener('contentLoaded', () => {
            this.observeElements();
        });
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.animatedElements.clear();
    }

    // Manually trigger animation for an element
    triggerAnimation(element, animationType = 'fadeInUp') {
        if (element) {
            element.style.animation = `${animationType} 0.8s ease forwards`;
            this.animatedElements.add(element);
        }
    }

    // Reset animations (useful for testing)
    reset() {
        this.animatedElements.forEach(el => {
            el.classList.remove('revealed');
            el.style.animation = '';
        });
        this.animatedElements.clear();
    }
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.scrollAnimations = new ScrollAnimations();
    });
} else {
    window.scrollAnimations = new ScrollAnimations();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollAnimations;
}
