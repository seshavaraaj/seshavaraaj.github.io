/**
 * Image Viewer Module
 * Handles full-screen image viewing with navigation
 */

export class ImageViewer {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.modalImage = document.getElementById('modal-image');
        this.closeBtn = this.modal.querySelector('.close-btn');
        this.prevBtn = this.modal.querySelector('.prev-btn');
        this.nextBtn = this.modal.querySelector('.next-btn');
        
        this.currentImages = [];
        this.currentIndex = 0;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.nextBtn.addEventListener('click', () => this.showNext());
        this.prevBtn.addEventListener('click', () => this.showPrevious());

        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open(images, index = 0) {
        this.currentImages = images;
        this.currentIndex = index;
        this.updateImage();
        this.modal.style.display = 'flex';
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
    }

    close() {
        this.modal.style.display = 'none';
        document.removeEventListener('keydown', this.handleKeyboard.bind(this));
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
        if (this.modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') this.showNext();
            else if (e.key === 'ArrowLeft') this.showPrevious();
            else if (e.key === 'Escape') this.close();
        }
    }
}
