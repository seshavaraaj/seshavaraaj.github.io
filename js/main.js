/**
 * Main Application Entry Point
 * Initializes and coordinates all modules
 */

import { config } from './config.js';
import { TypewriterEffect } from './modules/typewriter.js';
// ImageViewer removed
import { ProjectsManager } from './modules/projectsManager.js';
import { TabManager } from './modules/tabs.js';
import { ScrollAnimations } from './modules/scrollAnimations.js';

class Portfolio {
    constructor() {
        this.modules = {};
    }

    async initialize() {
        // Initialize Typewriter Effect
        this.modules.typewriter = new TypewriterEffect(
            config.typewriter.elementId,
            config.typewriter.titles,
            config.typewriter.typingSpeed,
            config.typewriter.deletingSpeed
        );
        this.modules.typewriter.start();

        // Initialize Projects Manager (loads and renders projects from JSON)
        this.modules.projectsManager = new ProjectsManager();
        await this.modules.projectsManager.initialize();

        // Initialize Tab Manager
        this.modules.tabManager = new TabManager();

        // Initialize Scroll Animations
        this.modules.scrollAnimations = new ScrollAnimations();
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    portfolio.initialize();
});
