/**
 * Project Details Page Module
 * Handles loading and displaying project details on a separate page
 */

class ProjectDetailsPage {
    constructor() {
        this.projectData = null;
        this.currentImageIndex = 0;
        this.images = [];
        
        this.init();
    }

    init() {
        // Get project data from URL parameters or localStorage
        this.loadProjectData();
        
        if (this.projectData) {
            this.renderProjectDetails();
        } else {
            this.showError();
        }
    }

    loadProjectData() {
        // Try to get from localStorage first (most reliable for mobile)
        const storedData = localStorage.getItem('currentProject');
        if (storedData) {
            try {
                this.projectData = JSON.parse(storedData);
                return;
            } catch (e) {
                console.error('Error parsing stored project data:', e);
            }
        }

        // Fallback: Try to get from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        
        if (projectId) {
            // Load from projects.json
            this.loadFromProjectsJson(projectId);
        }
    }

    async loadFromProjectsJson(projectId) {
        try {
            const response = await fetch('data/projects.json');
            const data = await response.json();
            
            // Search through all categories
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
            console.error('Error loading projects:', error);
            this.showError();
        }
    }

    renderProjectDetails() {
        if (!this.projectData) return;

        // Set title
        document.title = `${this.projectData.title} - Seshavaraaj Y`;
        document.getElementById('project-title').textContent = this.projectData.title;
        
        // Set description
        document.getElementById('project-description').textContent = this.projectData.description;
        
        // Setup gallery
        this.images = this.projectData.images || [];
        if (this.projectData.thumbnail) {
            this.images = [this.projectData.thumbnail, ...this.images];
        }
        
        if (this.images.length > 0) {
            this.setupGallery();
        } else {
            document.getElementById('gallery-section').style.display = 'none';
        }
        
        // Setup visit button
        const visitButton = document.getElementById('visit-button');
        if (this.projectData.link) {
            visitButton.addEventListener('click', () => {
                window.open(this.projectData.link, '_blank');
            });
        } else {
            visitButton.style.display = 'none';
        }
    }

    setupGallery() {
        const mainImage = document.getElementById('main-image');
        const thumbnailsContainer = document.getElementById('thumbnails-container');
        
        // Set initial image
        if (this.images.length > 0) {
            mainImage.src = this.images[0];
            mainImage.alt = `${this.projectData.title} screenshot 1`;
        }
        
        // Create thumbnails
        if (this.images.length > 1) {
            this.images.forEach((imageUrl, index) => {
                const thumbnail = document.createElement('button');
                thumbnail.className = 'gallery-thumbnail';
                if (index === 0) thumbnail.classList.add('active');
                
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `${this.projectData.title} thumbnail ${index + 1}`;
                img.loading = 'lazy';
                
                thumbnail.appendChild(img);
                thumbnail.addEventListener('click', () => this.changeImage(index));
                
                thumbnailsContainer.appendChild(thumbnail);
            });
        } else {
            thumbnailsContainer.style.display = 'none';
        }
        
        // Add swipe support for main image
        this.setupSwipeGestures(mainImage);
    }

    changeImage(index) {
        if (index < 0 || index >= this.images.length) return;
        
        this.currentImageIndex = index;
        const mainImage = document.getElementById('main-image');
        mainImage.src = this.images[index];
        mainImage.alt = `${this.projectData.title} screenshot ${index + 1}`;
        
        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    setupSwipeGestures(element) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        element.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        element.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            
            // Handle swipe
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    const nextIndex = (this.currentImageIndex + 1) % this.images.length;
                    this.changeImage(nextIndex);
                } else {
                    // Swipe right - previous image
                    const prevIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
                    this.changeImage(prevIndex);
                }
            }
        }, { passive: true });
    }

    showError() {
        document.getElementById('project-title').textContent = 'Project Not Found';
        document.getElementById('project-description').textContent = 'The requested project could not be found. Please return to the main page.';
        document.getElementById('gallery-section').style.display = 'none';
        document.getElementById('visit-button').style.display = 'none';
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProjectDetailsPage();
    });
} else {
    new ProjectDetailsPage();
}
