/**
 * Configuration Module
 * Central configuration for the portfolio application
 */

export const config = {
    // Typewriter settings
    typewriter: {
        elementId: 'dynamic-title',
        titles: ["Unity Developer", "Game Programmer"],
        typingSpeed: 150,
        deletingSpeed: 75,
        pauseAfterTyping: 2000,
        pauseBeforeNextWord: 500
    },

    // Modal IDs
    modals: {
        imageViewer: 'image-viewer-modal'
    },

    // Element selectors
    selectors: {
        closeBtn: '.close-btn',
        prevBtn: '.prev-btn',
        nextBtn: '.next-btn',
        projectCard: '.project',
        steamFeaturedBg: '.steam-featured-bg',
        steamFeaturedFg: '.steam-featured-fg',
        steamThumb: '.steam-thumb'
    },

    // CSS Classes
    classes: {
        loading: 'loading',
        active: 'active'
    },

    // Animation settings
    animations: {
        fadeInDelay: 0.2,
        transitionSpeed: 0.3,
        imageTransitionMs: 150,
        fadeOpacity: '0.5',
        fullOpacity: '1'
    },

    // Gallery settings
    gallery: {
        preloadOnHover: true,
        fadeTransitionSpeed: 150
    },

    // Event names
    events: {
        // events removed
    },

    // Keyboard keys
    keys: {
        arrowRight: 'ArrowRight',
        arrowLeft: 'ArrowLeft',
        escape: 'Escape'
    },

    // Display values
    display: {
        flex: 'flex',
        none: 'none',
        block: 'block'
    }
};

/**
 * Utility functions
 */
export const utils = {
    /**
     * Create an element with className
     */
    createElement(tag, className = '', attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    },

    /**
     * Preload images
     */
    preloadImages(imageSources) {
        imageSources.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    },

    /**
     * Load single image with callbacks
     */
    loadImage(src, onLoad, onError) {
        const img = new Image();
        if (onLoad) img.onload = onLoad;
        if (onError) img.onerror = onError;
        img.src = src;
        return img;
    },

    /**
     * Dispatch custom event
     */
    dispatchEvent(eventName, detail) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    },

    /**
     * Set element opacity with optional transition
     */
    setOpacity(element, opacity) {
        if (element) element.style.opacity = opacity;
    },

    /**
     * Toggle class on elements
     */
    toggleActiveClass(elements, activeElement, className) {
        elements.forEach(el => el.classList.remove(className));
        if (activeElement) activeElement.classList.add(className);
    }
};
