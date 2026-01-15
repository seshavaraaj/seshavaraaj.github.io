import { config } from '../config.js';

export class TabManager {
    constructor() {
        this.tabContents = null;
        this.tabButtons = null;
        this.cacheElements();
        this.setupGlobalFunction();
    }

    cacheElements() {
        this.tabContents = document.querySelectorAll(".tab-content");
        this.tabButtons = document.querySelectorAll(".tab-btn");
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
        this.tabContents.forEach(tab => { tab.style.display = config.display.none; });
    }

    removeActiveClasses() {
        this.tabButtons.forEach(btn => { btn.classList.remove(config.classes.active); });
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
