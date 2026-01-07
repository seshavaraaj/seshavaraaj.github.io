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
        deletingSpeed: 75
    },

    // Modal IDs
    modals: {
        imageViewer: 'image-viewer-modal',
        projectDetail: 'project-detail-modal'
    },

    // Animation settings
    animations: {
        fadeInDelay: 0.2,
        transitionSpeed: 0.3
    },

    // Gallery settings
    gallery: {
        preloadOnHover: true,
        fadeTransitionSpeed: 150
    }
};
