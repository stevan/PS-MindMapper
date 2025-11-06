/**
 * Sidebar management - handles section expand/collapse
 */

(function() {
    const SIDEBAR_STATE_KEY = 'markmap-viewer-sidebar-state';

    /**
     * Get saved sidebar state from localStorage
     */
    function getSavedState() {
        const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return {};
            }
        }
        return {};
    }

    /**
     * Save sidebar state to localStorage
     */
    function saveState(state) {
        localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(state));
    }

    /**
     * Toggle a section's collapsed state
     */
    function toggleSection(sectionName) {
        const header = document.querySelector(`.section-header[data-section="${sectionName}"]`);
        const content = document.querySelector(`.section-content[data-section-content="${sectionName}"]`);
        const toggle = header?.querySelector('.section-toggle');

        if (!header || !content || !toggle) return;

        const isCollapsed = content.classList.contains('collapsed');

        if (isCollapsed) {
            content.classList.remove('collapsed');
            toggle.classList.remove('collapsed');
        } else {
            content.classList.add('collapsed');
            toggle.classList.add('collapsed');
        }

        // Save state
        const state = getSavedState();
        state[sectionName] = !isCollapsed; // true = collapsed
        saveState(state);
    }

    /**
     * Restore sidebar state from localStorage
     */
    function restoreState() {
        const state = getSavedState();

        Object.keys(state).forEach(sectionName => {
            const isCollapsed = state[sectionName];
            if (isCollapsed) {
                const content = document.querySelector(`.section-content[data-section-content="${sectionName}"]`);
                const header = document.querySelector(`.section-header[data-section="${sectionName}"]`);
                const toggle = header?.querySelector('.section-toggle');

                if (content && toggle) {
                    content.classList.add('collapsed');
                    toggle.classList.add('collapsed');
                }
            }
        });
    }

    /**
     * Initialize sidebar functionality
     */
    function initSidebar() {
        // Set up click handlers for section headers
        const headers = document.querySelectorAll('.section-header');
        headers.forEach(header => {
            const sectionName = header.getAttribute('data-section');
            if (sectionName) {
                header.addEventListener('click', () => toggleSection(sectionName));
            }
        });

        // Restore saved state
        restoreState();
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }
})();
