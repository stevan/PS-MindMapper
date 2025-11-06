# AI Assistant Context & Preferences

**Last Updated:** 2025-11-05

This file contains context, preferences, and conventions for AI assistants working with this knowledge base. Update this file as patterns emerge or preferences change.

---

## System Overview

This is a markmap-based knowledge base system that separates content (documents) from organization (views). Documents live in `documents/` and can be referenced from multiple view perspectives in `views/`.

**Key principle:** Same content, multiple organizational perspectives.

---

## Markmap Formatting Preferences

### Hierarchy Guidelines
- **Ideal depth:** 3 levels of headings (H1, H2, H3), then use prose or diagrams
- **Flexible:** Can go deeper when content requires it, but prefer shallower hierarchies
- **Visual noise:** Deeper hierarchies create visual clutter in markmap view
- **Fold comments:** Use `<!-- markmap: fold -->` or `<!-- markmap: foldAll -->` to collapse deep sections

**Why:** Keep mind maps scannable and avoid overwhelming users with too many nodes.

### Prose Formatting
- **Use bullet paragraphs:** Regular paragraphs don't render in markmap, so format prose as bullet points
- **Line wrapping:** Wrap at 80 columns with manual line breaks
- **Indentation:** Continuation lines align with bullet content (two spaces after dash)

**Example:**
```markdown
### Section
- This is a prose paragraph formatted as a bullet point. It wraps
  at 80 columns with manual line breaks for readability in both
  markmap view and raw markdown.
```

**Why:** Markmap limitation - paragraphs don't display, but bulleted prose does.

### When to Use Markmap Format
- **Always:** All files in `views/` directory
- **Preferred:** Documents that are hierarchical, reference material, overviews
- **Optional:** Regular markdown is fine for linear narratives, tutorials, long-form content
- **Flexible:** Convert documents to markmap when it adds value

---

## File Organization

### Directory Structure
```
/
├── index.md              # Main entry point
├── CLAUDE.md            # This file (AI context)
├── views/               # Organizational perspectives
│   ├── by-topic.md
│   └── by-project.md
└── documents/           # Actual content
    ├── meta/            # System documentation
    └── projects/        # Project documentation
```

### Creating New Documents
1. Place in appropriate `documents/` subdirectory
2. Add links in relevant views (same doc can appear in multiple views)
3. Use markmap format when beneficial, regular markdown otherwise
4. Update this CLAUDE.md if you establish new patterns or conventions

### Naming Conventions
- Use kebab-case for filenames: `my-document.md`
- README.md for directory entry points
- Descriptive names that indicate content

---

## User Preferences

### Communication Style
- (To be filled in as preferences emerge)

### Workflow Preferences
- (To be filled in as patterns are established)

---

## Conventions & Patterns

### Views
- Each view provides a different organizational perspective
- Views link to documents, they don't contain content themselves
- Keep views focused - split large views rather than creating deep hierarchies

### Cross-Referencing
- Liberally link between related documents
- Use relative paths: `../documents/category/file.md`
- Same document can appear in multiple views

### Meta Documentation
- System documentation lives in `documents/meta/`
- Keep meta docs up to date as system evolves
- Bootstrap guide should always be usable by others to recreate the system

### Project Documentation
- Project READMEs live in `documents/projects/<project-name>/README.md`
- Use markmap format with fold comments on all `##` level headings
- **Required metadata section** after Overview:
  ```markdown
  ## Project Metadata <!-- markmap: fold -->
  - **Created**: YYYY-MM-DD (from first git commit)
  - **Last Updated**: YYYY-MM-DD (from last git commit)
  - **Total Commits**: N (from git rev-list --count HEAD)
  - **Active Development**: duration or period
  ```
- Git commands for metadata:
  - First commit: `git log --reverse --format="%ai" | head -1`
  - Last commit: `git log -1 --format="%ai"`
  - Commit count: `git rev-list --count HEAD`

---

## Session Notes

### 2025-11-05: Initial Setup
- Created base structure with index.md, views/by-topic.md
- Established documents/meta/ with README.md, markmap-format-guide.md, bootstrap-guide.md
- Defined markmap formatting conventions (3-level hierarchy, 80-column prose bullets)
- Created this CLAUDE.md file for AI session context

### 2025-11-05: By Project View & Voice Notes
- Created views/by-project.md as second organizational perspective
- Created documents/projects/ directory structure
- Documented first project: Voice Notes Integration
  - Audio recording with sox + local transcription with whisper.cpp
  - Token-efficient approach: transcribe locally, AI reads only text
  - Stores both WAV audio and text transcript
- Updated both by-topic and by-project views with cross-references
- Project documentation serves as template for future projects

### 2025-11-05: Fold Comments Best Practice
- Established convention: add `<!-- markmap: fold -->` to all ## level headings in large documents
- Syntax: fold comment must be on same line as heading
- Applied to all existing documents: voice-notes README, meta docs (README, format guide, bootstrap guide)
- Updated markmap-format-guide.md to document this best practice
- Rationale: reduces visual clutter, keeps initial markmap view scannable

### 2025-11-06: Viewer Integration & Skeleton Improvements
- **Integrated markmap-viewer** into skeleton as built-in visualization tool
  - Copied viewer code into `viewer/` directory (server.js, lib/, public/)
  - Created package.json with dependencies and npm scripts (`npm run view`)
  - Added .gitignore rules for node_modules
  - Created viewer/README.md documenting usage and architecture
  - Created main README.md with comprehensive Quick Start guide
- **Enhanced CLAUDE.md conventions**
  - Added Project Documentation template section
  - Git commands for extracting project metadata
  - Required metadata format for project READMEs
- **Improved view templates**
  - Updated by-topic.md and by-project.md to be template-like
  - Added placeholder examples showing organizational patterns
  - Removed doc-specific content (voice-notes project)
- **Fixed viewer issues**
  - Fixed static file serving: Changed to absolute path (path.join(__dirname, 'public'))
  - Fixed CSS MIME type error: Now serves with correct text/css type
  - Fixed file discovery: Added exclusion list for node_modules, .git, .claude, viewer, build dirs
  - Improved file cache: 60-second cache timeout, only log on initial load
  - Result: Viewer now indexes only knowledge base content (9 files vs 287)
- **Added view toggle button**
  - Toggle button in header to switch between markdown and markmap views
  - Overrides YAML frontmatter via `?view=markdown` or `?view=markmap` query parameter
  - Styled with primary color to stand out
  - Works on all view types (pure markmap, pure markdown, mixed content)
- **Added example project**
  - Voice-notes project from doc branch as working example
  - Shows how to structure project documentation
  - Demonstrates markmap format in practice
  - Provides immediate content for users to view
  - Marked as "(example project)" so users know it's deletable
- **Tested integration**: Viewer starts successfully on port 3000, finds correct files
- **Result**: Skeleton is now a complete, self-contained knowledge base template with working example

---

## Future Ideas & Experiments

(This section for ideas to explore or experimental patterns to try)

---

## Known Issues & Limitations

- Markmap doesn't render regular paragraphs (use bullet technique)
- Deep hierarchies create visual clutter (use fold comments)

---

## Instructions for AI Assistants

1. **Read this file** at the start of each session to understand context and preferences
2. **Follow conventions** documented here unless user requests otherwise
3. **Update this file** when:
   - New patterns or conventions are established
   - User expresses preferences that should be remembered
   - Significant changes are made to the system
   - Useful session notes should be preserved
4. **Keep it current** - remove outdated information, update dates
5. **Be concise** - This file will be read by future AI sessions, keep it scannable
