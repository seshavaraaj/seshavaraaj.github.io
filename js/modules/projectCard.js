import { config } from '../config.js';
import { getModalInstance } from './projectModal.js';

export class ProjectCard {
    constructor(projectElement, projectData) {
        this.element = projectElement;
        this.projectData = projectData || {};
        this.images = this.projectData.images || [];
        this.thumbnail = this.projectData.thumbnail || null;
        
        const titleEl = projectElement.querySelector('h3');
        const descEl = projectElement.querySelector('p');
        this.title = titleEl?.innerText || '';
        this.description = descEl?.innerText || '';
        this.link = projectElement.dataset.link || '#';

        this.initialize();
    }

    initialize() {
        this.setupBackgroundImage();
        this.setupClickHandler();
    }

    setupBackgroundImage() {
        const imageUrl = this.thumbnail || (this.images.length > 0 ? this.images[0] : null);
        if (!imageUrl) return;

        this.element.style.backgroundImage = `url('${imageUrl}')`;
    }

    setupClickHandler() {
        this.element.addEventListener('click', (e) => {
            e.preventDefault();
            this.openProject();
        });
    }

    isMobileDevice() {
        const isMobileWidth = window.innerWidth <= 768;
        const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        return isMobileWidth && hasTouchScreen;
    }

    openProject() {
        const projectData = {
            title: this.title,
            description: this.description,
            link: this.link,
            thumbnail: this.thumbnail,
            images: this.images,
            ...this.projectData
        };

        if (this.isMobileDevice()) {
            localStorage.setItem('currentProject', JSON.stringify(projectData));
            
            const projectId = this.projectData.id || '';
            window.location.href = `project-details.html${projectId ? '?id=' + projectId : ''}`;
        } else {
            this.openModal(projectData);
        }
    }

    openModal(projectData) {
        const modal = getModalInstance();
        modal.open(projectData);
    }
}
