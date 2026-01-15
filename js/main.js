import { config } from './config.js';
import { TypewriterEffect } from './modules/typewriter.js';
import { ProjectsManager } from './modules/projectsManager.js';
import { TabManager } from './modules/tabs.js';
import { ScrollAnimations } from './modules/scrollAnimations.js';

class Portfolio {
    constructor() {
        this.modules = {};
    }

    async initialize() {
        this.modules.typewriter = new TypewriterEffect(
            config.typewriter.elementId,
            config.typewriter.titles,
            config.typewriter.typingSpeed,
            config.typewriter.deletingSpeed
        );
        this.modules.typewriter.start();

        this.modules.projectsManager = new ProjectsManager();
        await this.modules.projectsManager.initialize();

        this.modules.tabManager = new TabManager();

        this.modules.scrollAnimations = new ScrollAnimations();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    portfolio.initialize();
});
