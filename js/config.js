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

    // Modal IDs removed; selectors removed

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

    // Keyboard keys removed (unused)

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
    // createElement removed (unused)

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

    // dispatchEvent removed (unused)

    // setOpacity removed (unused)

    // toggleActiveClass removed (unused)
};
