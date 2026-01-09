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
            this.openModal();
        });
        
        // Better touch handling for mobile
        this.element.addEventListener('touchend', (e) => {
            // Touch events will trigger click event
        }, { passive: true });
    }

    openModal() {
        const modal = getModalInstance();
        modal.open({
            title: this.title,
            description: this.description,
            link: this.link,
            thumbnail: this.thumbnail,
            images: this.images,
            ...this.projectData
        });
    }
}
