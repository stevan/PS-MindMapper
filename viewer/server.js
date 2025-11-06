import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, statSync } from 'fs';
import {
    findMarkdownFiles,
    readMarkdownFile,
    buildFileTree,
    hasMarkmapBlocks,
    extractMarkmapBlocks
} from './lib/file-utils.js';
import {
    renderMarkdown,
    transformMarkmap,
    generateMarkmapPage,
    generateMarkdownPage,
    generateMixedPage,
    generateSidebarHtml,
    generateSidebarHeader
} from './lib/renderer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Get docs directory from command line argument or default to ./docs
const docsArg = process.argv[2] || './docs';
const DOCS_DIR = path.isAbsolute(docsArg)
    ? docsArg
    : path.join(process.cwd(), docsArg);

// Validate docs directory exists
if (!existsSync(DOCS_DIR)) {
    console.error(`\n❌ Error: Directory not found: ${DOCS_DIR}\n`);
    console.error('Usage: node server.js [directory]');
    console.error('Example: node server.js ./my-notes\n');
    process.exit(1);
}

if (!statSync(DOCS_DIR).isDirectory()) {
    console.error(`\n❌ Error: Not a directory: ${DOCS_DIR}\n`);
    process.exit(1);
}

// Serve static files from viewer/public directory
app.use(express.static(path.join(__dirname, 'public')));

// Cache for file list
let fileCache = {
    files: [],
    tree: {},
    lastUpdate: 0
};

/**
 * Update file cache
 */
async function updateFileCache() {
    const now = Date.now();
    const isInitialLoad = fileCache.files.length === 0;

    // Cache for 60 seconds (files don't change frequently)
    if (now - fileCache.lastUpdate < 60000 && fileCache.files.length > 0) {
        return;
    }

    try {
        fileCache.files = await findMarkdownFiles(DOCS_DIR);
        fileCache.tree = buildFileTree(fileCache.files);
        fileCache.lastUpdate = now;

        // Only log on initial load or when explicitly refreshed
        if (isInitialLoad) {
            console.log(`Found ${fileCache.files.length} markdown files`);
        }
    } catch (error) {
        console.error('Error updating file cache:', error);
    }
}

/**
 * Home page - list all files
 */
app.get('/', async (req, res) => {
    try {
        await updateFileCache();

        const sidebarHeaderHtml = generateSidebarHeader();
        const sidebarHtml = generateSidebarHtml(fileCache.tree);

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markmap Viewer</title>
    <link rel="stylesheet" href="/css/main.css">
</head>
<body>
    <div class="app-container">
        <aside class="sidebar">
            ${sidebarHeaderHtml}
            <nav class="file-tree">
                ${sidebarHtml}
            </nav>
        </aside>

        <main class="content">
            <div class="content-body">
                <div class="welcome">
                    <h2>Welcome to Markmap Viewer</h2>
                    <p>Select a file from the sidebar to get started.</p>
                    <p>Found ${fileCache.files.length} markdown files in the <code>docs/</code> directory.</p>
                    <h3>File Types</h3>
                    <ul>
                        <li><strong>Markmap:</strong> Add <code>type: markmap</code> to frontmatter</li>
                        <li><strong>Markdown:</strong> Add <code>type: markdown</code> to frontmatter (default)</li>
                        <li><strong>Mixed:</strong> Embed markmap with <code>\`\`\`markmap</code> blocks</li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
    <script src="/js/theme.js"></script>
    <script src="/js/sidebar.js"></script>
</body>
</html>`;

        res.send(html);
    } catch (error) {
        console.error('Error on home page:', error);
        res.status(500).send('Internal server error');
    }
});

/**
 * View a specific file
 */
app.get('/view/:path(*)', async (req, res) => {
    try {
        await updateFileCache();

        const filePath = req.params.path;
        const fullPath = path.join(DOCS_DIR, filePath);

        // Read and parse the file
        const fileData = await readMarkdownFile(fullPath);
        const title = fileData.frontmatter.title || path.basename(filePath, '.md');

        // Check for view query parameter to override frontmatter
        const viewOverride = req.query.view;
        let renderType = fileData.type;

        if (viewOverride === 'markmap' || viewOverride === 'markdown') {
            renderType = viewOverride;
        }

        let html;

        // Determine how to render (with override support)
        if (renderType === 'markmap') {
            // Pure markmap
            const markmapData = transformMarkmap(fileData.content);
            html = generateMarkmapPage(filePath, title, markmapData);
        } else if (renderType === 'markdown' || !hasMarkmapBlocks(fileData.content)) {
            // Pure markdown (forced or no markmap blocks)
            const htmlContent = renderMarkdown(fileData.content);
            html = generateMarkdownPage(filePath, title, htmlContent);
        } else if (hasMarkmapBlocks(fileData.content)) {
            // Mixed content (only if not overridden)
            const blocks = extractMarkmapBlocks(fileData.content);
            html = generateMixedPage(filePath, title, blocks);
        } else {
            // Default to markdown
            const htmlContent = renderMarkdown(fileData.content);
            html = generateMarkdownPage(filePath, title, htmlContent);
        }

        // Inject sidebar header and content
        const sidebarHeaderHtml = generateSidebarHeader();
        const sidebarHtml = generateSidebarHtml(fileCache.tree, filePath);
        html = html.replace('<!-- Sidebar header populated by server -->', sidebarHeaderHtml);
        html = html.replace('<!-- Populated by server -->', sidebarHtml);

        res.send(html);
    } catch (error) {
        console.error('Error viewing file:', error);
        res.status(404).send(`
            <!DOCTYPE html>
            <html>
            <head><title>Error</title></head>
            <body>
                <h1>File Not Found</h1>
                <p>${error.message}</p>
                <a href="/">Back to Home</a>
            </body>
            </html>
        `);
    }
});

/**
 * API endpoint to get file list
 */
app.get('/api/files', async (req, res) => {
    try {
        await updateFileCache();
        res.json({
            files: fileCache.files,
            tree: fileCache.tree
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║     Markmap Viewer Server Started     ║
╠════════════════════════════════════════╣
║  URL: http://localhost:${PORT}           ║
║  Docs: ${DOCS_DIR}
╚════════════════════════════════════════╝
    `);
});
