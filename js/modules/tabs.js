/**
 * Tabs Module
 * Handles tab switching functionality
 */

export class TabManager {
    constructor() {
        this.setupGlobalFunction();
    }

    setupGlobalFunction() {
        // Make openTab available globally for inline onclick handlers
        window.openTab = (evt, tabName) => {
            this.openTab(evt, tabName);
        };
    }

    openTab(evt, tabName) {
        // Hide all tab contents
        const tabContents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].style.display = "none";
        }

        // Remove active class from all tabs
        const tabButtons = document.getElementsByClassName("tab-btn");
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].className = tabButtons[i].className.replace(" active", "");
        }

        // Show current tab and add active class
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
}
