/**
 * Projects Manager Module
 * Coordinates all project-related functionality
 */

import { ProjectCard } from './projectCard.js';

export class ProjectsManager {
    constructor() {
        this.projectCards = [];
        this.projectsData = null;
        this.projectMap = new Map();
    }

    async initialize() {
        try {
            // Fetch projects data
            const response = await fetch('data/projects.json');
            this.projectsData = await response.json();
            
            // Build project map for O(1) lookups
            this.buildProjectMap();
            
            // Render projects for each category
            this.renderProjects('Games', this.projectsData.projects.games);
            this.renderProjects('Systems', this.projectsData.projects.systems);
            this.renderProjects('Mechanics', this.projectsData.projects.mechanics);
            
            // Initialize project cards
            this.initializeProjectCards();
        } catch (error) {
            // Silently handle error
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
        projectDiv.dataset.projectId = project.id || '';
        if (project.thumbnail) {
            projectDiv.dataset.thumbnail = project.thumbnail;
        }

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

    buildProjectMap() {
        // Build Map for O(1) project lookups
        const categories = ['games', 'systems', 'mechanics'];
        categories.forEach(category => {
            const projects = this.projectsData.projects[category];
            if (projects) {
                projects.forEach(project => {
                    if (project.id) {
                        this.projectMap.set(project.id, project);
                    }
                });
            }
        });
    }

    initializeProjectCards() {
        const projectElements = document.querySelectorAll('.project');
        
        projectElements.forEach(element => {
            // Get project data using O(1) Map lookup
            const projectId = element.dataset.projectId;
            const projectData = projectId ? this.projectMap.get(projectId) : null;
            
            const card = new ProjectCard(element, projectData);
            this.projectCards.push(card);
        });
    }

    getProjects() {
        return this.projectCards;
    }
}
