/**
 * Project Modal Module
 * Handles the project detail modal with Steam-style gallery
 */

export class ProjectModal {
    constructor(modalId, imageViewer) {
        this.modal = document.getElementById(modalId);
        this.imageViewer = imageViewer;
        this.titleElement = document.getElementById('project-modal-title');
        this.descriptionElement = document.getElementById('project-modal-description');
        this.linkElement = document.getElementById('project-modal-link');
        this.galleryElement = document.getElementById('project-modal-gallery');

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close button
        const closeBtn = this.modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Close on background click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Listen for project detail open events
        document.addEventListener('openProjectDetails', (e) => {
            this.open(e.detail);
        });
    }

    open(projectData) {
        const { title, description, link, images } = projectData;

        this.titleElement.textContent = title;
        this.descriptionElement.textContent = description;
        this.linkElement.href = link;

        this.galleryElement.innerHTML = '';

        if (images.length === 0) {
            this.modal.style.display = 'flex';
            return;
        }

        this.buildSteamGallery(images);
        this.modal.style.display = 'flex';
    }

    close() {
        this.modal.style.display = 'none';
    }

    buildSteamGallery(images) {
        const steamGallery = document.createElement('div');
        steamGallery.className = 'steam-gallery';

        let localCurrentIndex = 0;

        // Featured Image Container
        const featuredWrapper = this.createFeaturedImage(images[0]);
        
        // Click to zoom
        featuredWrapper.onclick = () => {
            this.imageViewer.open(images, localCurrentIndex);
        };

        steamGallery.appendChild(featuredWrapper);

        // Thumbnails
        if (images.length > 1) {
            const thumbsContainer = this.createThumbnails(
                images,
                featuredWrapper,
                (index) => { localCurrentIndex = index; }
            );
            steamGallery.appendChild(thumbsContainer);
        }

        this.galleryElement.appendChild(steamGallery);
    }

    createFeaturedImage(imageSrc) {
        const wrapper = document.createElement('div');
        wrapper.className = 'steam-featured loading';

        const bgImage = document.createElement('img');
        bgImage.className = 'steam-featured-bg';
        bgImage.src = imageSrc;

        const fgImage = document.createElement('img');
        fgImage.className = 'steam-featured-fg';
        fgImage.src = imageSrc;

        fgImage.onload = () => wrapper.classList.remove('loading');

        wrapper.appendChild(bgImage);
        wrapper.appendChild(fgImage);

        return wrapper;
    }

    createThumbnails(images, featuredWrapper, onIndexChange) {
        const thumbsContainer = document.createElement('div');
        thumbsContainer.className = 'steam-thumbs-scroll';

        const featuredBg = featuredWrapper.querySelector('.steam-featured-bg');
        const featuredFg = featuredWrapper.querySelector('.steam-featured-fg');

        images.forEach((imgSrc, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'steam-thumb';
            if (index === 0) thumb.classList.add('active');

            const thumbImg = document.createElement('img');
            thumbImg.src = imgSrc;

            thumb.onclick = (e) => {
                e.stopPropagation();

                if (onIndexChange) {
                    onIndexChange(index);
                }

                // Update featured image with fade
                featuredFg.style.opacity = '0.5';
                featuredBg.style.opacity = '0.5';
                
                setTimeout(() => {
                    featuredFg.src = imgSrc;
                    featuredBg.src = imgSrc;
                    featuredFg.style.opacity = '1';
                    featuredBg.style.opacity = '1';
                }, 150);

                // Update active state
                thumbsContainer.querySelectorAll('.steam-thumb').forEach(t => {
                    t.classList.remove('active');
                });
                thumb.classList.add('active');
            };

            thumb.appendChild(thumbImg);
            thumbsContainer.appendChild(thumb);
        });

        return thumbsContainer;
    }
}
