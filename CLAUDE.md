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
│   └── by-topic.md
└── documents/           # Actual content
    └── meta/            # System documentation
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

---

## Session Notes

### 2025-11-05: Initial Setup
- Created base structure with index.md, views/by-topic.md
- Established documents/meta/ with README.md, markmap-format-guide.md, bootstrap-guide.md
- Defined markmap formatting conventions (3-level hierarchy, 80-column prose bullets)
- Created this CLAUDE.md file for AI session context

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
