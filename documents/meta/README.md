# Knowledge Base System

## Purpose <!-- markmap: fold -->
- A single place to collect ideas and documents while providing
  multiple views for organization and navigation. The system
  separates content storage from organizational structure.

## Core Concept <!-- markmap: fold -->
### Content vs Organization
- Documents live in `documents/` organized by general categories.
  Views live in `views/` as markmap files that provide different
  perspectives. The same document can appear in multiple views,
  allowing flexible navigation without file duplication.

### Directory Structure
```
/
├── index.md              # Table of contents
├── CLAUDE.md             # AI assistant context (unlinked)
├── views/                # Organizational perspectives
│   └── by-topic.md
└── documents/            # Actual content
    └── meta/
```

## How It Works <!-- markmap: fold -->
### Markmap Navigation
- Markdown headings create hierarchical structures, links point
  to documents or other views, and the whole structure visualizes
  as an interactive mind map. Keep hierarchy to 3 levels, then
  use prose or diagrams.

### Multiple Views
- The same information can be organized by topic, project, priority,
  date, or any other perspective. Each view is just a markmap
  file with links to documents.

### Adding Content
- Create your document in the appropriate `documents/` subdirectory,
  then add links to it in relevant views. The same document can be
  referenced from multiple views.

### AI Assistant Context
- `CLAUDE.md` at the root stores preferences and conventions for AI
  assistants working with the knowledge base. It acts like a dotfile,
  containing formatting guidelines, established patterns, and session
  notes. Not linked from views - it's reference material for AI, not
  navigable content for users.

## Benefits <!-- markmap: fold -->
### Key Advantages
- **Flexible**: Add new views without reorganizing files
- **Visual**: Markmap provides intuitive tree visualization
- **Cross-referenced**: Documents belong to multiple categories
- **Simple**: Plain markdown files, no database required
- **Portable**: Git-friendly, no proprietary formats

## Future Expansion <!-- markmap: fold -->
- As the knowledge base grows, you can add new view perspectives,
  create subdirectories in `documents/`, add tags or metadata
  within documents, and link between documents to create a
  knowledge graph.

## Documentation <!-- markmap: fold -->
### Guides
- [Markmap Format Guide](markmap-format-guide.md) - Best practices for writing markmap documents
- [Bootstrap Guide](bootstrap-guide.md) - Setup instructions and prompt for creating your own knowledge base
