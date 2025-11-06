# Markmap Viewer

A built-in server-side viewer for visualizing your knowledge base as interactive mind maps.

## Overview

This viewer renders markdown files from your knowledge base in two modes:
- **Markmap mode**: Interactive mind maps from hierarchical markdown
- **Markdown mode**: Traditional rendered markdown with syntax highlighting

The viewer includes:
- **File tree navigation**: Sidebar showing all documents
- **View toggle button**: Switch between markdown and markmap views on any document
- **Mixed content support**: Embed markmap blocks in regular markdown
- **Syntax highlighting**: 191 languages supported via highlight.js
- **Server-side rendering**: Simple Express server, no SPA complexity

## Usage

From the root of your knowledge base:

```bash
# Install dependencies (one-time)
npm install

# Start the viewer on port 3000
npm run view

# Or specify a different port
npm run view:dev  # Uses port 8080
```

Open http://localhost:3000 in your browser.

## How It Works

**Architecture:**
- `server.js` - Express server that serves markdown files
- `lib/renderer.js` - Core rendering logic (markmap vs markdown)
- `public/` - Static assets (CSS, client-side JS)

**Rendering modes:**

The viewer automatically detects the rendering mode:
1. **Frontmatter `type: markmap`** - Forces markmap rendering
2. **Frontmatter `type: markdown`** - Forces markdown rendering
3. **No frontmatter** - Auto-detects based on structure

**View toggle:**

Every document page includes a toggle button to override the default view:
- In **markmap view**: Click "📝 Markdown View" to see traditional markdown
- In **markdown view**: Click "🗺️ Markmap View" to see interactive mind map
- The toggle adds a query parameter: `?view=markdown` or `?view=markmap`
- This overrides the frontmatter `type:` setting
- Useful for seeing the same content in different formats

**Mixed content:**

You can embed markmap blocks in markdown:

````markdown
# Regular Markdown

This is a paragraph.

```markmap
# Mind Map
## Branch 1
## Branch 2
```

More markdown content...
````

## Customization

**Port:**
```bash
PORT=8080 npm run view
```

**Base directory:**
The viewer defaults to serving from the directory you run it in. To serve a different directory:
```bash
node viewer/server.js /path/to/docs
```

**Styling:**
Edit `public/styles.css` to customize appearance.

## Files

```
viewer/
├── server.js          # Express server (routing, static files)
├── lib/
│   └── renderer.js    # Markdown → HTML/Markmap conversion
└── public/
    ├── styles.css     # Viewer styling
    └── client.js      # Client-side markmap initialization
```

## See Also

- [Markmap Format Guide](../documents/meta/markmap-format-guide.md) - Best practices for writing markmap
- Main [README.md](../README.md) - Knowledge base setup and usage
