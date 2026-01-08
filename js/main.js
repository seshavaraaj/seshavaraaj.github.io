/**
 * Main Application Entry Point
 * Initializes and coordinates all modules
 */

import { config } from './config.js';
import { TypewriterEffect } from './modules/typewriter.js';
import { ImageViewer } from './modules/imageViewer.js';
import { ProjectModal } from './modules/projectModal.js';
import { ProjectsManager } from './modules/projectsManager.js';
import { TabManager } from './modules/tabs.js';
import { ScrollAnimations } from './modules/scrollAnimations.js';

class Portfolio {
    constructor() {
        this.modules = {};
    }

    initialize() {
        // Initialize Typewriter Effect
        this.modules.typewriter = new TypewriterEffect(
            config.typewriter.elementId,
            config.typewriter.titles,
            config.typewriter.typingSpeed,
            config.typewriter.deletingSpeed
        );
        this.modules.typewriter.start();

        // Initialize Image Viewer Modal
        this.modules.imageViewer = new ImageViewer(config.modals.imageViewer);

        // Initialize Project Modal
        this.modules.projectModal = new ProjectModal(
            config.modals.projectDetail,
            this.modules.imageViewer
        );

        // Initialize Projects Manager
        this.modules.projectsManager = new ProjectsManager(this.modules.imageViewer);
        this.modules.projectsManager.initialize();

        // Initialize Tab Manager
        this.modules.tabManager = new TabManager();

        // Initialize Scroll Animations
        this.modules.scrollAnimations = new ScrollAnimations();

        console.log('Portfolio initialized successfully');
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    portfolio.initialize();
});
