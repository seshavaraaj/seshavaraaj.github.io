/**
 * Image Viewer Module
 * Handles full-screen image viewing with navigation
 */

import { config, utils } from '../config.js';

export class ImageViewer {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.modalImage = document.getElementById('modal-image');
        this.closeBtn = this.modal.querySelector(config.selectors.closeBtn);
        this.prevBtn = this.modal.querySelector(config.selectors.prevBtn);
        this.nextBtn = this.modal.querySelector(config.selectors.nextBtn);
        
        this.currentImages = [];
        this.currentIndex = 0;
        this.boundKeyboardHandler = this.handleKeyboard.bind(this);
        
        // Touch support
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.setupEventListeners();
        this.setupTouchSupport();
    }

    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.nextBtn.addEventListener('click', () => this.showNext());
        this.prevBtn.addEventListener('click', () => this.showPrevious());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }

    open(images, index = 0) {
        this.currentImages = images;
        this.currentIndex = index;
        this.updateImage();
        this.showModal();
        document.addEventListener('keydown', this.boundKeyboardHandler);
    }

    close() {
        this.hideModal();
        document.removeEventListener('keydown', this.boundKeyboardHandler);
    }

    showModal() {
        this.modal.style.display = config.display.flex;
    }

    hideModal() {
        this.modal.style.display = config.display.none;
    }

    updateImage() {
        this.modalImage.src = this.currentImages[this.currentIndex];
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.currentImages.length;
        this.updateImage();
    }

    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length;
        this.updateImage();
    }

    handleKeyboard(e) {
        if (this.modal.style.display !== config.display.flex) return;

        const keyActions = {
            [config.keys.arrowRight]: () => this.showNext(),
            [config.keys.arrowLeft]: () => this.showPrevious(),
            [config.keys.escape]: () => this.close()
        };

        keyActions[e.key]?.();
    }
    
    setupTouchSupport() {
        // Swipe gestures for mobile
        this.modalImage.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.modalImage.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }
    
    handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) < swipeThreshold) return;
        
        if (diff > 0) {
            // Swiped left - show next
            this.showNext();
        } else {
            // Swiped right - show previous
            this.showPrevious();
        }
    }
}
