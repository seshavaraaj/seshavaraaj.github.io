/**
 * Project Modal Module
 * Handles the project detail modal with Steam-style gallery
 */

import { config, utils } from '../config.js';

export class ProjectModal {
    constructor(modalId, imageViewer) {
        this.modal = document.getElementById(modalId);
        this.imageViewer = imageViewer;
        this.titleElement = document.getElementById('project-modal-title');
        this.descriptionElement = document.getElementById('project-modal-description');
        this.linkElement = document.getElementById('project-modal-link');
        this.galleryElement = document.getElementById('project-modal-gallery');
        this.currentIndex = 0;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const closeBtn = this.modal.querySelector(config.selectors.closeBtn);
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        document.addEventListener(config.events.openProjectDetails, (e) => {
            this.open(e.detail);
        });
    }

    open(projectData) {
        const { title, description, link, images } = projectData;

        this.updateModalContent(title, description, link);
        this.galleryElement.innerHTML = '';

        if (images?.length) {
            this.buildSteamGallery(images);
        }

        this.showModal();
    }

    close() {
        this.modal.style.display = config.display.none;
    }

    showModal() {
        this.modal.style.display = config.display.flex;
    }

    updateModalContent(title, description, link) {
        this.titleElement.textContent = title;
        this.descriptionElement.textContent = description;
        this.linkElement.href = link;
    }

    buildSteamGallery(images) {
        this.currentIndex = 0;
        const steamGallery = utils.createElement('div', config.classes.steamGallery);
        const featuredWrapper = this.createFeaturedImage(images[0]);
        
        featuredWrapper.onclick = () => {
            this.imageViewer.open(images, this.currentIndex);
        };

        steamGallery.appendChild(featuredWrapper);

        if (images.length > 1) {
            const thumbsContainer = this.createThumbnails(images, featuredWrapper);
            steamGallery.appendChild(thumbsContainer);
        }

        this.galleryElement.appendChild(steamGallery);
    }

    createFeaturedImage(imageSrc) {
        const wrapper = utils.createElement('div', `${config.classes.steamFeatured} ${config.classes.loading}`);
        const bgImage = utils.createElement('img', config.selectors.steamFeaturedBg.slice(1), { src: imageSrc });
        const fgImage = utils.createElement('img', config.selectors.steamFeaturedFg.slice(1), { src: imageSrc });

        fgImage.onload = () => wrapper.classList.remove(config.classes.loading);

        wrapper.append(bgImage, fgImage);
        return wrapper;
    }

    createThumbnails(images, featuredWrapper) {
        const thumbsContainer = utils.createElement('div', config.classes.steamThumbsScroll);
        const featuredBg = featuredWrapper.querySelector(config.selectors.steamFeaturedBg);
        const featuredFg = featuredWrapper.querySelector(config.selectors.steamFeaturedFg);

        // Enable horizontal scroll with mouse wheel
        this.enableHorizontalScroll(thumbsContainer);

        images.forEach((imgSrc, index) => {
            const thumb = this.createThumbnail(imgSrc, index === 0);
            thumb.onclick = (e) => this.handleThumbnailClick(e, index, imgSrc, featuredBg, featuredFg, thumbsContainer);
            thumbsContainer.appendChild(thumb);
        });

        return thumbsContainer;
    }

    enableHorizontalScroll(container) {
        // Mouse wheel scrolling for desktop
        container.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        }, { passive: false });
        
        // Touch scrolling for mobile is handled natively
        // Add momentum scrolling for iOS
        container.style.webkitOverflowScrolling = 'touch';
    }

    createThumbnail(imgSrc, isActive) {
        const thumb = utils.createElement('div', config.classes.steamThumb);
        if (isActive) thumb.classList.add(config.classes.active);
        
        const thumbImg = utils.createElement('img', '', { src: imgSrc });
        thumb.appendChild(thumbImg);
        
        return thumb;
    }

    handleThumbnailClick(event, index, imgSrc, featuredBg, featuredFg, thumbsContainer) {
        event.stopPropagation();
        this.currentIndex = index;

        this.updateFeaturedImage(featuredBg, featuredFg, imgSrc);
        this.updateActiveThumbnail(thumbsContainer, event.currentTarget);
    }

    updateFeaturedImage(bgElement, fgElement, newSrc) {
        utils.setOpacity(bgElement, config.animations.fadeOpacity);
        utils.setOpacity(fgElement, config.animations.fadeOpacity);
        
        setTimeout(() => {
            bgElement.src = newSrc;
            fgElement.src = newSrc;
            utils.setOpacity(bgElement, config.animations.fullOpacity);
            utils.setOpacity(fgElement, config.animations.fullOpacity);
        }, config.animations.imageTransitionMs);
    }

    updateActiveThumbnail(container, activeThumb) {
        const allThumbs = container.querySelectorAll(config.selectors.steamThumb);
        utils.toggleActiveClass(allThumbs, activeThumb, config.classes.active);
    }
}
