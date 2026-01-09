/**
 * Gallery Manager Module
 * Shared gallery functionality for both modal and details page
 */

export class GalleryManager {
    constructor(config) {
        this.mainImageElement = config.mainImageElement;
        this.thumbnailsContainer = config.thumbnailsContainer;
        this.images = config.images || [];
        this.projectTitle = config.projectTitle || 'Project';
        this.currentImageIndex = 0;
        this.onImageChange = config.onImageChange || null;
        
        this.thumbnails = [];
    }

    /**
     * Initialize gallery with images
     */
    initialize() {
        if (this.images.length === 0) return;
        
        // Set initial image
        this.setMainImage(0);
        
        // Create thumbnails if container exists and multiple images
        if (this.thumbnailsContainer && this.images.length > 1) {
            this.createThumbnails();
        }
        
        // Setup swipe gestures if main image element exists
        if (this.mainImageElement) {
            this.setupSwipeGestures();
        }
    }

    /**
     * Create thumbnail elements
     */
    createThumbnails() {
        this.thumbnailsContainer.innerHTML = '';
        this.thumbnails = [];
        
        this.images.forEach((imageUrl, index) => {
            const thumbnail = document.createElement('button');
            thumbnail.className = 'gallery-thumbnail';
            if (index === 0) thumbnail.classList.add('active');
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `${this.projectTitle} thumbnail ${index + 1}`;
            img.loading = 'lazy';
            
            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => this.changeImage(index));
            
            this.thumbnailsContainer.appendChild(thumbnail);
            this.thumbnails.push(thumbnail);
        });
    }

    /**
     * Set main image
     */
    setMainImage(index) {
        if (!this.mainImageElement || index < 0 || index >= this.images.length) return;
        
        this.mainImageElement.src = this.images[index];
        this.mainImageElement.alt = `${this.projectTitle} screenshot ${index + 1}`;
    }

    /**
     * Change to specific image
     */
    changeImage(index) {
        if (index < 0 || index >= this.images.length) return;
        
        this.currentImageIndex = index;
        this.setMainImage(index);
        
        // Update active thumbnail
        this.thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
        
        // Callback for custom behavior
        if (this.onImageChange) {
            this.onImageChange(index);
        }
    }

    /**
     * Navigate to next image
     */
    nextImage() {
        const nextIndex = (this.currentImageIndex + 1) % this.images.length;
        this.changeImage(nextIndex);
    }

    /**
     * Navigate to previous image
     */
    previousImage() {
        const prevIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.changeImage(prevIndex);
    }

    /**
     * Setup swipe gestures for touch devices
     */
    setupSwipeGestures() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.mainImageElement.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.mainImageElement.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextImage();
                } else {
                    this.previousImage();
                }
            }
        }, { passive: true });
    }

    /**
     * Update images array and reinitialize
     */
    updateImages(images, projectTitle) {
        this.images = images || [];
        this.projectTitle = projectTitle || this.projectTitle;
        this.currentImageIndex = 0;
        this.initialize();
    }

    /**
     * Get current image index
     */
    getCurrentIndex() {
        return this.currentImageIndex;
    }
}
