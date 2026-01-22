export const config = {
    // Path configuration
    paths: {
        baseURL: '/',  // Base URL for all assets
        imagesDir: 'data/Images/',
        dataDir: 'data/'
    },

    // Typewriter settings
    typewriter: {
        elementId: 'dynamic-title',
        titles: ["Unity Developer", "Game Programmer"],
        typingSpeed: 150,
        deletingSpeed: 75,
        pauseAfterTyping: 2000,
        pauseBeforeNextWord: 500
    },

    classes: {
        loading: 'loading',
        active: 'active'
    },

    display: {
        none: 'none',
        block: 'block'
    }
};

// Utility function to resolve paths to absolute URLs
export function resolveAssetPath(relativePath) {
    if (!relativePath) return '';
    
    // If path is already absolute (starts with http/https or /), return as-is
    if (relativePath.startsWith('http://') || 
        relativePath.startsWith('https://') || 
        relativePath.startsWith('/')) {
        return relativePath;
    }
    
    // Convert relative path to absolute by prepending base URL
    return config.paths.baseURL + relativePath;
}
