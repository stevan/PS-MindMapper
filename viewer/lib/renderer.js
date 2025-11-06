import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import { Transformer } from 'markmap-lib';

// Initialize markdown-it with syntax highlighting
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value;
            } catch (err) {
                console.error('Highlight error:', err);
            }
        }
        try {
            return hljs.highlightAuto(str).value;
        } catch (err) {
            return md.utils.escapeHtml(str);
        }
    }
});

// Initialize markmap transformer
const markmapTransformer = new Transformer();

/**
 * Render markdown to HTML
 */
export function renderMarkdown(content) {
    return md.render(content);
}

/**
 * Transform markdown to markmap data
 */
export function transformMarkmap(content) {
    const { root, features } = markmapTransformer.transform(content);
    return { root, features };
}

/**
 * Generate HTML page for markmap
 */
export function generateMarkmapPage(filePath, title, markmapData) {
    const dataJson = JSON.stringify(markmapData.root);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Markmap Viewer</title>
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
    <div class="app-container">
        <aside class="sidebar">
            <!-- Sidebar header populated by server -->
            <nav class="file-tree" id="file-tree">
                <!-- Populated by server -->
            </nav>
        </aside>

        <main class="content">
            <div class="content-header">
                <div class="breadcrumb">${filePath}</div>
                <div class="controls">
                    <button id="view-toggle" class="view-toggle" onclick="window.location.href='?view=markdown'">📝 Markdown View</button>
                    <button id="expand-all">Expand All</button>
                    <button id="collapse-all">Collapse All</button>
                    <button id="fit-view">Fit View</button>
                </div>
            </div>

            <div class="content-body">
                <div class="markmap-container">
                    <svg id="markmap"></svg>
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script src="https://cdn.jsdelivr.net/npm/markmap-view@0.18"></script>
    <script src="/js/theme.js"></script>
    <script src="/js/sidebar.js"></script>
    <script>
        const markmapData = ${dataJson};
        const { Markmap } = window.markmap;
        const svg = document.getElementById('markmap');
        const mm = Markmap.create(svg, {
            duration: 500,
            maxWidth: 300,
            autoFit: true,
            zoom: true,
            pan: true
        });
        mm.setData(markmapData);
        mm.fit();

        // Controls
        document.getElementById('expand-all').addEventListener('click', () => {
            const expandAll = (node) => {
                if (node.payload) node.payload.fold = 0;
                if (node.children) node.children.forEach(expandAll);
            };
            expandAll(markmapData);
            mm.setData(markmapData);
        });

        document.getElementById('collapse-all').addEventListener('click', () => {
            const collapseAll = (node, depth = 0) => {
                if (depth > 0) {
                    node.payload = node.payload || {};
                    node.payload.fold = 1;
                }
                if (node.children) node.children.forEach(child => collapseAll(child, depth + 1));
            };
            collapseAll(markmapData);
            mm.setData(markmapData);
        });

        document.getElementById('fit-view').addEventListener('click', () => {
            mm.fit();
        });
    </script>
</body>
</html>`;
}

/**
 * Generate HTML page for markdown
 */
export function generateMarkdownPage(filePath, title, htmlContent) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Markmap Viewer</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11/styles/github-dark.css">
</head>
<body>
    <div class="app-container">
        <aside class="sidebar">
            <!-- Sidebar header populated by server -->
            <nav class="file-tree" id="file-tree">
                <!-- Populated by server -->
            </nav>
        </aside>

        <main class="content">
            <div class="content-header">
                <div class="breadcrumb">${filePath}</div>
                <div class="controls">
                    <button id="view-toggle" class="view-toggle" onclick="window.location.href='?view=markmap'">🗺️ Markmap View</button>
                </div>
            </div>

            <div class="content-body">
                <div class="markdown-content">
                    ${htmlContent}
                </div>
            </div>
        </main>
    </div>
    <script src="/js/theme.js"></script>
    <script src="/js/sidebar.js"></script>
</body>
</html>`;
}

/**
 * Generate HTML page for mixed content
 */
export function generateMixedPage(filePath, title, blocks) {
    // Collect markmap data for all markmap blocks
    const markmapBlocks = [];

    const blocksHtml = blocks.map((block, index) => {
        if (block.type === 'markdown') {
            return `<div class="markdown-block">${renderMarkdown(block.content)}</div>`;
        } else {
            const markmapData = transformMarkmap(block.content);
            markmapBlocks.push({ index, data: markmapData.root });
            return `
                <div class="embedded-markmap" id="markmap-container-${index}">
                    <div class="markmap-controls">
                        <button class="expand-btn" data-markmap="${index}">Expand All</button>
                        <button class="collapse-btn" data-markmap="${index}">Collapse All</button>
                        <button class="fit-btn" data-markmap="${index}">Fit View</button>
                    </div>
                    <svg id="markmap-${index}"></svg>
                </div>
            `;
        }
    }).join('\n');

    // Generate initialization script that runs after libraries load
    const initScript = `
        // Store markmap data and instances
        window.markmapData = ${JSON.stringify(markmapBlocks)};
        window.markmapInstances = {};

        // Initialize all markmaps after libraries load
        function initMarkmaps() {
            if (!window.markmap || !window.markmap.Markmap) {
                setTimeout(initMarkmaps, 100);
                return;
            }

            const { Markmap } = window.markmap;
            window.markmapData.forEach(({ index, data }) => {
                const svg = document.getElementById('markmap-' + index);
                if (svg) {
                    const mm = Markmap.create(svg, {
                        duration: 500,
                        maxWidth: 300,
                        autoFit: true,
                        zoom: true,
                        pan: true
                    });
                    mm.setData(data);

                    // Store instance and data reference
                    window.markmapInstances[index] = { mm, data };

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => mm.fit());
                    });
                }
            });

            // Setup control buttons
            setupControls();
        }

        // Setup control buttons for all markmaps
        function setupControls() {
            // Expand buttons
            document.querySelectorAll('.expand-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = btn.dataset.markmap;
                    const { mm, data } = window.markmapInstances[index];
                    const expandAll = (node) => {
                        if (node.payload) node.payload.fold = 0;
                        if (node.children) node.children.forEach(expandAll);
                    };
                    expandAll(data);
                    mm.setData(data);
                });
            });

            // Collapse buttons
            document.querySelectorAll('.collapse-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = btn.dataset.markmap;
                    const { mm, data } = window.markmapInstances[index];
                    const collapseAll = (node, depth = 0) => {
                        if (depth > 0) {
                            node.payload = node.payload || {};
                            node.payload.fold = 1;
                        }
                        if (node.children) node.children.forEach(child => collapseAll(child, depth + 1));
                    };
                    collapseAll(data);
                    mm.setData(data);
                });
            });

            // Fit buttons
            document.querySelectorAll('.fit-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = btn.dataset.markmap;
                    const { mm } = window.markmapInstances[index];
                    mm.fit();
                });
            });
        }

        // Start initialization
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMarkmaps);
        } else {
            initMarkmaps();
        }
    `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Markmap Viewer</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11/styles/github-dark.css">
</head>
<body>
    <div class="app-container">
        <aside class="sidebar">
            <!-- Sidebar header populated by server -->
            <nav class="file-tree" id="file-tree">
                <!-- Populated by server -->
            </nav>
        </aside>

        <main class="content">
            <div class="content-header">
                <div class="breadcrumb">${filePath}</div>
                <div class="controls">
                    <button id="view-toggle-markdown" class="view-toggle" onclick="window.location.href='?view=markdown'">📝 Markdown Only</button>
                    <button id="view-toggle-markmap" class="view-toggle" onclick="window.location.href='?view=markmap'">🗺️ Markmap Only</button>
                </div>
            </div>

            <div class="content-body">
                <div class="markdown-content mixed-content">
                    ${blocksHtml}
                </div>
            </div>
        </main>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script src="https://cdn.jsdelivr.net/npm/markmap-view@0.18"></script>
    <script src="/js/theme.js"></script>
    <script src="/js/sidebar.js"></script>
    <script>
        ${initScript}
    </script>
</body>
</html>`;
}

/**
 * Generate sidebar header HTML with theme toggle
 */
export function generateSidebarHeader() {
    return `
        <div class="sidebar-header">
            <h1><a href="/">Markmap Viewer</a></h1>
            <div class="theme-toggle" id="theme-toggle">
                <span>Theme</span>
                <span class="theme-toggle-icon" id="theme-icon">🌙</span>
            </div>
        </div>
    `;
}

/**
 * Generate sidebar HTML with sections
 */
export function generateSidebarHtml(fileTree, currentPath = '') {
    let html = '';

    // Helper to render a single node
    const renderNode = (node, depth = 0) => {
        const isActive = node.path === currentPath ? ' active' : '';

        if (node.type === 'directory') {
            html += `<div class="file-item directory${isActive}">${node.name}</div>`;
            if (node.children) {
                html += '<div class="file-children">';
                Object.values(node.children)
                    .sort((a, b) => {
                        if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
                        return a.name.localeCompare(b.name);
                    })
                    .forEach(child => renderNode(child, depth + 1));
                html += '</div>';
            }
        } else {
            html += `<a href="/view/${node.path}" class="file-item file${isActive}">
                <span class="icon">📄</span>
                ${node.name}
            </a>`;
        }
    };

    // Separate views and projects from other files
    const views = [];
    const projects = [];
    const other = [];

    Object.values(fileTree).forEach(node => {
        if (node.name === 'views' && node.type === 'directory') {
            views.push(node);
        } else if (node.path && node.path.startsWith('documents/projects')) {
            projects.push(node);
        } else if (node.name === 'documents' && node.type === 'directory' && node.children) {
            // Extract projects from documents directory
            Object.values(node.children).forEach(child => {
                if (child.name === 'projects' && child.type === 'directory') {
                    projects.push(child);
                } else {
                    other.push(child);
                }
            });
        } else {
            other.push(node);
        }
    });

    // Render Views section
    if (views.length > 0) {
        html += `
            <div class="sidebar-section">
                <div class="section-header" data-section="views">
                    <span class="section-toggle">▼</span>
                    <span>📑 Views</span>
                </div>
                <div class="section-content" data-section-content="views">
        `;
        views.forEach(node => {
            if (node.children) {
                Object.values(node.children)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .forEach(child => renderNode(child));
            }
        });
        html += `
                </div>
            </div>
        `;
    }

    // Render Projects section
    if (projects.length > 0) {
        html += `
            <div class="sidebar-section">
                <div class="section-header" data-section="projects">
                    <span class="section-toggle">▼</span>
                    <span>📂 Projects</span>
                </div>
                <div class="section-content" data-section-content="projects">
        `;
        projects.forEach(node => {
            if (node.children) {
                Object.values(node.children)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .forEach(child => renderNode(child));
            }
        });
        html += `
                </div>
            </div>
        `;
    }

    // Render other files/directories
    if (other.length > 0) {
        other.sort((a, b) => {
            if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
            return a.name.localeCompare(b.name);
        }).forEach(node => renderNode(node));
    }

    return html;
}
