import { ProjectCard } from './projectCard.js';

export class ProjectsManager {
    constructor() {
        this.projectCards = [];
        this.projectsData = null;
        this.projectMap = new Map();
        
        // Category configuration
        this.categories = {
            display: ['Games', 'Systems', 'Mechanics'],
            data: ['games', 'systems', 'mechanics']
        };
    }

    async initialize() {
        try {
            const response = await fetch('data/projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.projectsData = await response.json();
            
            this.buildProjectMap();
            
            this.categories.display.forEach((displayName, index) => {
                const dataKey = this.categories.data[index];
                this.renderProjects(displayName, this.projectsData.projects[dataKey]);
            });
            
            this.initializeProjectCards();
        } catch (error) {
            this.handleLoadError();
        }
    }

    handleLoadError() {
        this.categories.display.forEach(category => {
            const container = document.getElementById(category);
            if (container) {
                container.innerHTML = '<p>Unable to load projects. Please try again later.</p>';
            }
        });
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
        this.categories.data.forEach(category => {
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
