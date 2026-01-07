/**
 * Project Card Module
 * Handles project card rendering and interactions
 */

export class ProjectCard {
    constructor(projectElement, imageViewer) {
        this.element = projectElement;
        this.imageViewer = imageViewer;
        this.images = JSON.parse(projectElement.dataset.images);
        this.title = projectElement.querySelector('h3').innerText;
        this.description = projectElement.querySelector('p').innerText;
        this.link = projectElement.dataset.link;

        this.setupBackgroundImage();
        this.setupPreloading();
        this.setupClickHandler();
    }

    setupBackgroundImage() {
        if (this.images.length > 0) {
            this.element.classList.add('loading');

            const img = new Image();
            img.onload = () => {
                this.element.style.backgroundImage = `url('${this.images[0]}')`;
                this.element.classList.remove('loading');
            };
            img.onerror = () => {
                this.element.classList.remove('loading');
                this.element.style.backgroundImage = 'none';
            };
            img.src = this.images[0];
        }
    }

    setupPreloading() {
        this.element.addEventListener('mouseenter', () => {
            this.images.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }, { once: true });
    }

    setupClickHandler() {
        this.element.addEventListener('click', () => {
            this.openDetails();
        });
    }

    openDetails() {
        const event = new CustomEvent('openProjectDetails', {
            detail: {
                title: this.title,
                description: this.description,
                link: this.link,
                images: this.images
            }
        });
        document.dispatchEvent(event);
    }
}
