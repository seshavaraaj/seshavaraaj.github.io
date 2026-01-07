/**
 * Typewriter Effect Module
 * Handles animated text typing effect in the header
 */

export class TypewriterEffect {
    constructor(elementId, titles, typingSpeed = 150, deletingSpeed = 75) {
        this.element = document.getElementById(elementId);
        this.titles = titles;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.titleIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
    }

    start() {
        this.type();
    }

    type() {
        const currentTitle = this.titles[this.titleIndex];
        let speed = this.typingSpeed;

        if (this.isDeleting) {
            speed = this.deletingSpeed;
            this.element.textContent = currentTitle.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentTitle.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        // Check if word is complete
        if (!this.isDeleting && this.charIndex === currentTitle.length) {
            speed = 2000; // Pause after typing
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.titleIndex = (this.titleIndex + 1) % this.titles.length;
            speed = 500; // Pause before typing next word
        }

        setTimeout(() => this.type(), speed);
    }
}
