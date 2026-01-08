/**
 * Project Card Module
 * Handles project card rendering and interactions
 */

import { config, utils } from '../config.js';

export class ProjectCard {
    constructor(projectElement) {
        this.element = projectElement;
        this.images = this.parseImages(projectElement.dataset.images);
        this.thumbnail = projectElement.dataset.thumbnail || null;
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
        console.warn('Failed to load project card image:', imageUrl);
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
        // Direct link opening
        this.element.addEventListener('click', (e) => {
            if (this.link && this.link !== '#') {
                window.open(this.link, '_blank');
            }
        });
        
        // Better touch handling for mobile
        this.element.addEventListener('touchend', (e) => {
            // Let the click event handle it, or simulate click if needed
            // But usually touchend -> click
            // Removing preventDefault to allow natural link behavior if we used <a> tag,
            // but since it's a div, we keep the logic simple.
        }, { passive: true });
    }

    /* openDetails removed */
}
