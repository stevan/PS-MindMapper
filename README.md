# Knowledge Base Organizer

A markmap-based knowledge base system that separates content from organization, allowing you to view the same documents from multiple perspectives.

## Quick Start

### 1. Setup

```bash
# Clone or fork this repository
git clone <your-repo-url>
cd knowledge-base-organizer

# Install dependencies for the viewer
npm install
```

### 2. View Your Knowledge Base

```bash
# Start the viewer
npm run view

# Open http://localhost:3000 in your browser
```

### 3. Start Adding Content

1. Create markdown files in `documents/` subdirectories
2. Add links to them in `views/` (same document can appear in multiple views)
3. Use markmap format for hierarchical content, regular markdown for linear content
4. Refresh the viewer to see your changes

## System Overview

**Core Concept:** Content lives in `documents/`, organization lives in `views/`.

```
/
├── index.md              # Table of contents (start here!)
├── CLAUDE.md            # AI assistant context and conventions
├── package.json         # Dependencies for viewer
├── viewer/              # Built-in markmap viewer
├── views/               # Organizational perspectives
│   ├── by-topic.md
│   └── by-project.md
└── documents/           # Actual content
    ├── meta/            # System documentation
    └── ...              # Your content here
```

**Key principle:** Same content, multiple organizational perspectives.

## Built-in Viewer

This knowledge base includes a server-side viewer for visualizing your documents:

### Features
- **Markmap visualization**: Interactive mind maps from your markdown
- **File tree navigation**: Browse all documents in sidebar
- **Syntax highlighting**: Code blocks with 191 languages
- **Mixed content**: Embed markmap blocks in regular markdown
- **Auto-detection**: Automatically chooses markmap vs markdown rendering

### Usage

```bash
# Install dependencies (one-time)
npm install

# Start the viewer on port 3000
npm run view

# Or use a different port
PORT=8080 npm run view
```

See [viewer/README.md](viewer/README.md) for details.

## Documentation

**Getting Started:**
- [System Overview](documents/meta/README.md) - How the system works
- [Markmap Format Guide](documents/meta/markmap-format-guide.md) - Best practices for writing markmap
- [Bootstrap Guide](documents/meta/bootstrap-guide.md) - Detailed setup instructions

**AI Assistant Integration:**
- [CLAUDE.md](CLAUDE.md) - Conventions and preferences for AI assistants

## Markmap Format Quick Reference

### Hierarchy Guidelines
- **Ideal depth:** 3 levels of headings (H1, H2, H3), then use prose or diagrams
- **Deep sections:** Use `<!-- markmap: fold -->` to collapse
- **Prose:** Use bullet points (paragraphs don't render in markmap)

### Example

```markdown
---
type: markmap
---

# Project Name

## Overview
- This is a prose paragraph formatted as bullets
- It wraps at 80 columns for readability
- Markmap displays this correctly

## Features <!-- markmap: fold -->
### Feature 1
- Description of feature 1

### Feature 2
- Description of feature 2
```

## Workflow

### Adding a New Document

1. **Create the document:**
   ```bash
   # Choose appropriate location
   documents/projects/my-project/README.md
   # or
   documents/notes/my-note.md
   ```

2. **Use markmap format** (optional but recommended for hierarchical content):
   ```markdown
   ---
   type: markmap
   ---

   # Document Title
   ## Section 1
   ## Section 2
   ```

3. **Link from views:**
   - Add to `views/by-topic.md` under appropriate category
   - Add to `views/by-project.md` if it's a project
   - Same document can appear in multiple views

4. **Refresh viewer** to see your new document

### Creating a New View

Views are just markdown files with links to documents:

```markdown
---
type: markmap
---

# By Priority

## High Priority
- [Important Project](../documents/projects/important/README.md)
- [Urgent Task](../documents/tasks/urgent.md)

## Medium Priority
- [Nice to Have](../documents/ideas/nice-to-have.md)
```

## Benefits

- **Flexible**: Add new views without reorganizing files
- **Visual**: Markmap provides intuitive tree visualization
- **Cross-referenced**: Documents can belong to multiple categories
- **Simple**: Plain markdown files, no database required
- **Portable**: Git-friendly, no proprietary formats
- **AI-friendly**: CLAUDE.md preserves conventions across sessions

## Customization

### For Your Own Projects

1. **Update CLAUDE.md** with your preferences and conventions
2. **Create your own views** (by-date.md, by-priority.md, etc.)
3. **Organize documents** in subdirectories that make sense for you
4. **Customize viewer** styling in `viewer/public/styles.css`

### Viewer Customization

See [viewer/README.md](viewer/README.md) for:
- Port configuration
- Styling customization
- Rendering mode control
- Mixed content usage

## Tips

- **Keep views focused**: Split large views rather than creating deep hierarchies
- **Use fold comments**: `<!-- markmap: fold -->` for deep sections
- **Liberally cross-reference**: Same document in multiple views is encouraged
- **Update CLAUDE.md**: Capture conventions as they emerge
- **Use kebab-case**: For file names (my-document.md)

## License

MIT
