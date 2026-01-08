/**
 * Projects Manager Module
 * Coordinates all project-related functionality
 */

import { ProjectCard } from './projectCard.js';

export class ProjectsManager {
    constructor() {
        this.projectCards = [];
        this.projectsData = null;
    }

    async initialize() {
        try {
            // Fetch projects data
            const response = await fetch('data/projects.json');
            this.projectsData = await response.json();
            
            // Render projects for each category
            this.renderProjects('Games', this.projectsData.projects.games);
            this.renderProjects('Systems', this.projectsData.projects.systems);
            this.renderProjects('Mechanics', this.projectsData.projects.mechanics);
            
            // Initialize project cards
            this.initializeProjectCards();
        } catch (error) {
            console.error('Failed to load projects:', error);
        }
    }

    renderProjects(category, projects) {
        const container = document.getElementById(category);
        if (!container) return;

        // Clear loading comment
        container.innerHTML = '';

        if (!projects || projects.length === 0) {
            container.innerHTML = '<p>Coming soon...</p>';
            return;
        }

        projects.forEach(project => {
            const projectElement = this.createProjectElement(project);
            container.appendChild(projectElement);
        });
    }

    createProjectElement(project) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';
        projectDiv.dataset.link = project.link || '#';
        projectDiv.dataset.images = JSON.stringify(project.images || []);

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'project-details';

        const title = document.createElement('h3');
        title.textContent = project.title;

        const description = document.createElement('p');
        description.textContent = project.description;

        detailsDiv.appendChild(title);
        detailsDiv.appendChild(description);
        projectDiv.appendChild(detailsDiv);

        return projectDiv;
    }

    initializeProjectCards() {
        const projectElements = document.querySelectorAll('.project');
        
        projectElements.forEach(element => {
            const card = new ProjectCard(element);
            this.projectCards.push(card);
        });
    }

    getProjects() {
        return this.projectCards;
    }
}
