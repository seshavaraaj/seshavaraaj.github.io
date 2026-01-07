/**
 * Projects Manager Module
 * Coordinates all project-related functionality
 */

import { ProjectCard } from './projectCard.js';

export class ProjectsManager {
    constructor(imageViewer) {
        this.imageViewer = imageViewer;
        this.projectCards = [];
    }

    initialize() {
        const projectElements = document.querySelectorAll('.project');
        
        projectElements.forEach(element => {
            const card = new ProjectCard(element, this.imageViewer);
            this.projectCards.push(card);
        });
    }

    getProjects() {
        return this.projectCards;
    }
}
