/**
 * Project Card Module
 * Handles project card rendering and interactions
 */

import { config, utils } from '../config.js';
import { getModalInstance } from './projectModal.js';

export class ProjectCard {
    constructor(projectElement, projectData) {
        this.element = projectElement;
        this.projectData = projectData || {};
        this.images = this.projectData.images || [];
        this.thumbnail = this.projectData.thumbnail || null;
        this.title = projectElement.querySelector('h3')?.innerText || '';
        this.description = projectElement.querySelector('p')?.innerText || '';
        this.link = projectElement.dataset.link || '#';

        this.initialize();
    }

    initialize() {
        this.setupBackgroundImage();
        if (config.gallery.preloadOnHover) {
            this.setupPreloading();
        }
        this.setupClickHandler();
    }

    setupBackgroundImage() {
        const imageUrl = this.thumbnail || (this.images.length > 0 ? this.images[0] : null);
        if (!imageUrl) return;

        this.element.classList.add(config.classes.loading);

        utils.loadImage(
            imageUrl,
            () => this.onImageLoad(imageUrl),
            () => this.onImageError(imageUrl)
        );
    }

    onImageLoad(imageUrl) {
        this.element.style.backgroundImage = `url('${imageUrl}')`;
        this.element.classList.remove(config.classes.loading);
    }

    onImageError(imageUrl) {
        this.element.classList.remove(config.classes.loading);
        this.element.style.backgroundImage = 'none';
    }

    setupPreloading() {
        // Preload on hover (desktop) or touchstart (mobile)
        const preloadHandler = () => {
            utils.preloadImages(this.images);
        };
        
        this.element.addEventListener('mouseenter', preloadHandler, { once: true });
        this.element.addEventListener('touchstart', preloadHandler, { once: true, passive: true });
    }

    setupClickHandler() {
        // Open modal instead of direct link
        this.element.addEventListener('click', (e) => {
            e.preventDefault();
            this.openProject();
        });
        
        // Better touch handling for mobile
        this.element.addEventListener('touchend', (e) => {
            // Touch events will trigger click event
        }, { passive: true });
    }

    isMobileDevice() {
        // Check if device is mobile based on screen width and touch capability
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

        // For mobile devices, navigate to separate page
        if (this.isMobileDevice()) {
            // Store project data in localStorage for the details page
            localStorage.setItem('currentProject', JSON.stringify(projectData));
            
            // Navigate to details page
            const projectId = this.projectData.id || '';
            window.location.href = `project-details.html${projectId ? '?id=' + projectId : ''}`;
        } else {
            // For desktop, open modal as usual
            this.openModal(projectData);
        }
    }

    openModal(projectData) {
        const modal = getModalInstance();
        modal.open(projectData);
    }
}
