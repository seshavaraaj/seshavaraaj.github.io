/**
 * Tabs Module
 * Handles tab switching functionality
 */

import { config } from '../config.js';

export class TabManager {
    constructor() {
        this.setupGlobalFunction();
    }

    setupGlobalFunction() {
        window.openTab = (evt, tabName) => this.openTab(evt, tabName);
    }

    openTab(evt, tabName) {
        this.hideAllTabs();
        this.removeActiveClasses();
        this.showTab(tabName);
        this.setActiveTab(evt.currentTarget);
    }

    hideAllTabs() {
        const tabContents = document.querySelectorAll(".tab-content");
        tabContents.forEach(tab => {
            tab.style.display = config.display.none;
        });
    }

    removeActiveClasses() {
        const tabButtons = document.querySelectorAll(".tab-btn");
        tabButtons.forEach(btn => {
            btn.classList.remove(config.classes.active);
        });
    }

    showTab(tabName) {
        const tab = document.getElementById(tabName);
        if (tab) {
            tab.style.display = config.display.block;
        }
    }

    setActiveTab(button) {
        if (button) {
            button.classList.add(config.classes.active);
        }
    }
}
