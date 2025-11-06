/**
 * Theme management - handles dark/light mode toggle with auto-detection
 */

(function() {
    const THEME_KEY = 'markmap-viewer-theme';
    const html = document.documentElement;

    /**
     * Get the current theme from localStorage or system preference
     */
    function getCurrentTheme() {
        const stored = localStorage.getItem(THEME_KEY);
        if (stored) {
            return stored;
        }

        // Auto-detect system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    /**
     * Apply theme to the document
     */
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }

    /**
     * Update the theme toggle icon
     */
    function updateThemeIcon(theme) {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    /**
     * Toggle between dark and light themes
     */
    function toggleTheme() {
        const current = getCurrentTheme();
        const newTheme = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, newTheme);
        applyTheme(newTheme);
    }

    /**
     * Initialize theme on page load
     */
    function initTheme() {
        const theme = getCurrentTheme();
        applyTheme(theme);

        // Set up toggle button
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Only auto-update if user hasn't manually set a preference
                if (!localStorage.getItem(THEME_KEY)) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    applyTheme(newTheme);
                }
            });
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
})();
