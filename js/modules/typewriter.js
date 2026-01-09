/**
 * Typewriter Effect Module
 * Handles animated text typing effect in the header
 * Optimized with requestAnimationFrame and visibility detection
 */

import { config } from '../config.js';

export class TypewriterEffect {
    constructor(elementId, titles, typingSpeed = 150, deletingSpeed = 75) {
        this.element = document.getElementById(elementId);
        if (!this.element) {
            return;
        }
        
        this.titles = titles;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseAfterTyping = config.typewriter.pauseAfterTyping;
        this.pauseBeforeNextWord = config.typewriter.pauseBeforeNextWord;
        
        this.titleIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.timeoutId = null;
        this.isVisible = true;
        
        // Pause animation when tab is not visible
        this.setupVisibilityListener();
    }
    
    setupVisibilityListener() {
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
            if (this.isVisible && this.timeoutId === null) {
                this.type();
            }
        });
    }

    start() {
        if (!this.element) return;
        this.type();
    }
    
    stop() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    type() {
        if (!this.isVisible) {
            this.stop();
            return;
        }
        
        const currentTitle = this.titles[this.titleIndex];
        let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        this.updateText(currentTitle);

        if (this.shouldPauseAfterTyping(currentTitle)) {
            speed = this.pauseAfterTyping;
            this.isDeleting = true;
        } else if (this.shouldStartNextTitle()) {
            this.isDeleting = false;
            this.titleIndex = (this.titleIndex + 1) % this.titles.length;
            speed = this.pauseBeforeNextWord;
        }

        this.timeoutId = setTimeout(() => {
            this.timeoutId = null;
            this.type();
        }, speed);
    }

    updateText(currentTitle) {
        if (this.isDeleting) {
            this.charIndex--;
            this.element.textContent = currentTitle.substring(0, this.charIndex);
        } else {
            this.charIndex++;
            this.element.textContent = currentTitle.substring(0, this.charIndex);
        }
    }

    shouldPauseAfterTyping(currentTitle) {
        return !this.isDeleting && this.charIndex === currentTitle.length;
    }

    shouldStartNextTitle() {
        return this.isDeleting && this.charIndex === 0;
    }
}
