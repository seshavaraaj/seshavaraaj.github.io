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

    // CSS Classes
    classes: {
        loading: 'loading',
        active: 'active'
    },

    // Gallery settings
    gallery: {
        preloadOnHover: true
    },

    // Display values
    display: {
        none: 'none',
        block: 'block'
    }
};

/**
 * Utility functions
 */
export const utils = {
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
    }
};
