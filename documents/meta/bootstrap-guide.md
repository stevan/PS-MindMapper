# Knowledge Base Bootstrap Guide

## Overview
- This guide helps you create your own markmap-based knowledge base
  system. You can either follow the manual steps below or use the
  setup prompt with any AI assistant to automate the process.

## Quick Start with AI
### Using the Setup Prompt
- Copy the setup prompt section below (everything in the code block)
- Paste it into any AI chatbot (Claude, ChatGPT, etc.)
- The AI will create the complete directory structure and files
- Customize the resulting system to fit your needs

### Setup Prompt
```
I would like to create a personal knowledge base system using markmap
for visualization and organization. Please help me set up the following
structure:

REQUIREMENTS:
1. Create a directory structure with:
   - Root level with index.md (table of contents)
   - views/ directory for organizational perspectives
   - documents/ directory for actual content
   - documents/meta/ for system documentation

2. Create these files in markmap format:
   - index.md: Main entry point linking to views and key documents
   - views/by-topic.md: Topic-based organizational view
   - documents/meta/README.md: System overview and documentation

3. Follow these markmap formatting guidelines:
   - Aim for 3 levels of hierarchy (flexible when needed)
   - Use bullet paragraphs for prose (80 column wrapping)
   - Use <!-- markmap: fold --> for collapsible sections
   - Keep hierarchy clear and avoid excessive nesting

4. The system should separate content from organization:
   - Documents live in documents/ organized by category
   - Views are markmap files that link to documents
   - Same document can appear in multiple views
   - No file duplication, just different perspectives

5. Include in documents/meta/:
   - README.md explaining the system
   - A format guide for writing markmap documents
   - This bootstrap guide for others to replicate the system

6. Create CLAUDE.md at the root level:
   - AI assistant context file (like a dotfile)
   - Contains preferences, conventions, and session notes
   - Not linked from views - for AI reference only
   - Should be updated as patterns emerge

Please create the initial structure with placeholder content that
demonstrates the organizational pattern. I'll customize it from there.
```

## Manual Setup Steps
### Step 1: Create Directory Structure
```bash
mkdir -p views documents/meta
```

### Step 2: Create index.md
- Main entry point for the knowledge base
- Links to all views
- Links to important meta documents
- Example structure:

```markdown
# Knowledge Base

## Views
- [By Topic](views/by-topic.md)

## About
- [System Documentation](documents/meta/README.md)
```

### Step 3: Create First View
- Create views/by-topic.md
- Organize by subject matter
- Use markmap format with clear hierarchy
- Link to documents in the documents/ tree

### Step 4: Create Meta Documentation
- documents/meta/README.md: System overview
- documents/meta/markmap-format-guide.md: Formatting guidelines
- documents/meta/bootstrap-guide.md: This file
- CLAUDE.md: AI assistant context and preferences (at root level)

### Step 5: Verify Structure
- Your directory should look like:
```
/
├── index.md
├── CLAUDE.md
├── views/
│   └── by-topic.md
└── documents/
    └── meta/
        ├── README.md
        ├── markmap-format-guide.md
        └── bootstrap-guide.md
```

## Customization Ideas
### Additional Views
- **By Project**: Group documents by active projects
- **By Priority**: Organize by urgency or importance
- **By Date**: Chronological organization
- **By Status**: Active, archived, draft, etc.
- **By Context**: Work, personal, learning, etc.

### Document Categories
- documents/ideas/ - Brainstorms and concepts
- documents/notes/ - Meeting notes, quick captures
- documents/research/ - Deep dives and investigations
- documents/projects/ - Project-specific documentation
- documents/reference/ - Reference material and guides
- documents/archive/ - Completed or deprecated content

### Workflow Integration
- **Daily notes**: Create documents/daily/ with dated files
- **Templates**: Store in documents/meta/templates/
- **Inbox**: Create documents/inbox/ for unsorted items
- **Version control**: Initialize git repository for history

## Best Practices
### Getting Started
- Start simple with one view and a few documents
- Add complexity as you understand your needs
- Don't over-organize initially - let structure emerge
- Review and refactor organization periodically

### Maintenance
- Regularly review orphaned documents (not in any view)
- Prune outdated content or move to archive
- Keep view files focused - split large views into smaller ones
- Update meta documentation as you evolve the system
- Update CLAUDE.md when establishing new patterns or preferences

### Viewing Markmaps
- **VS Code**: Install markmap extension
- **CLI**: Use `npx markmap-cli index.md`
- **Online**: Visit markmap.js.org and paste markdown
- **Browser**: Generate HTML files for offline viewing

## Troubleshooting
### Markmap Not Rendering
- Check markdown syntax (heading levels, lists)
- Ensure file is valid markdown
- Try viewing in different markmap tools

### Broken Links
- Use relative paths (e.g., `../documents/file.md`)
- Check file paths match actual directory structure
- Test links in markdown preview first

### Visual Clutter
- Reduce hierarchy depth (consolidate levels)
- Use fold comments for deep sections
- Split large documents into smaller focused ones
- Convert excessive bullets to prose paragraphs

## Next Steps
- Customize the initial structure to your needs
- Start adding your own documents
- Create additional views for different perspectives
- Share with others and iterate on the system
