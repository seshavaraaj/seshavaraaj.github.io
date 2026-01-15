import { GalleryManager } from './modules/galleryManager.js';

class ProjectDetailsPage {
    constructor() {
        this.projectData = null;
        this.galleryManager = null;
        
        this.init();
    }

    init() {
        this.loadProjectData();
        
        if (this.projectData) {
            this.renderProjectDetails();
        } else {
            this.showError();
        }
    }

    loadProjectData() {
        const storedData = localStorage.getItem('currentProject');
        if (storedData) {
            try {
                this.projectData = JSON.parse(storedData);
                return;
            } catch (e) {
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        
        if (projectId) {
            this.loadFromProjectsJson(projectId);
        }
    }

    async loadFromProjectsJson(projectId) {
        try {
            const response = await fetch('data/projects.json');
            const data = await response.json();
            
            for (const category in data.projects) {
                const project = data.projects[category].find(p => p.id === projectId);
                if (project) {
                    this.projectData = project;
                    this.renderProjectDetails();
                    return;
                }
            }
            
            this.showError();
        } catch (error) {
            this.showError();
        }
    }

    renderProjectDetails() {
        if (!this.projectData) return;

        document.title = `${this.projectData.title} - Seshavaraaj Y`;
        document.getElementById('project-title').textContent = this.projectData.title;
        
        document.getElementById('project-description').textContent = this.projectData.description;
        
        const images = this.projectData.images || [];
        if (this.projectData.thumbnail) {
            images.unshift(this.projectData.thumbnail);
        }
        
        if (images.length > 0) {
            this.setupGallery(images);
        } else {
            document.getElementById('gallery-section').style.display = 'none';
        }
        
        const visitButton = document.getElementById('visit-button');
        if (this.projectData.link) {
            visitButton.addEventListener('click', () => {
                window.open(this.projectData.link, '_blank');
            });
        } else {
            visitButton.style.display = 'none';
        }
    }

    setupGallery(images) {
        const mainImage = document.getElementById('main-image');
        const thumbnailsContainer = document.getElementById('thumbnails-container');
        
        this.galleryManager = new GalleryManager({
            mainImageElement: mainImage,
            thumbnailsContainer: images.length > 1 ? thumbnailsContainer : null,
            images: images,
            projectTitle: this.projectData.title
        });
        
        this.galleryManager.initialize();
        
        if (images.length <= 1) {
            thumbnailsContainer.style.display = 'none';
        }
    }

    showError() {
        document.getElementById('project-title').textContent = 'Project Not Found';
        document.getElementById('project-description').textContent = 'The requested project could not be found. Please return to the main page.';
        document.getElementById('gallery-section').style.display = 'none';
        document.getElementById('visit-button').style.display = 'none';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProjectDetailsPage();
    });
} else {
    new ProjectDetailsPage();
}
