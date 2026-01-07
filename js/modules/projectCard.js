/**
 * Project Card Module
 * Handles project card rendering and interactions
 */

import { config, utils } from '../config.js';

export class ProjectCard {
    constructor(projectElement, imageViewer) {
        this.element = projectElement;
        this.imageViewer = imageViewer;
        this.images = this.parseImages(projectElement.dataset.images);
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

    parseImages(imagesData) {
        try {
            return JSON.parse(imagesData) || [];
        } catch (e) {
            console.error('Failed to parse project images:', e);
            return [];
        }
    }

    setupBackgroundImage() {
        if (!this.images.length) return;

        this.element.classList.add(config.classes.loading);

        utils.loadImage(
            this.images[0],
            () => this.onImageLoad(),
            () => this.onImageError()
        );
    }

    onImageLoad() {
        this.element.style.backgroundImage = `url('${this.images[0]}')`;
        this.element.classList.remove(config.classes.loading);
    }

    onImageError() {
        this.element.classList.remove(config.classes.loading);
        this.element.style.backgroundImage = 'none';
        console.warn('Failed to load project card image:', this.images[0]);
    }

    setupPreloading() {
        this.element.addEventListener('mouseenter', () => {
            utils.preloadImages(this.images);
        }, { once: true });
    }

    setupClickHandler() {
        this.element.addEventListener('click', () => this.openDetails());
    }

    openDetails() {
        utils.dispatchEvent(config.events.openProjectDetails, {
            title: this.title,
            description: this.description,
            link: this.link,
            images: this.images
        });
    }
}
