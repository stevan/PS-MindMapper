# Markmap Format Guide

## Overview
- This guide describes best practices for creating markmap documents
  in the knowledge base. Markmap converts markdown into interactive
  mind maps, making hierarchical information easy to navigate and
  visualize.

## When to Use Markmap
### Good Use Cases
- **Views**: All organizational views should be markmap format
- **Hierarchical content**: Information naturally organized in trees
- **Reference material**: Quick lookup guides, checklists, taxonomies
- **Overview documents**: High-level summaries with drilldown details

### When to Use Regular Markdown
- **Linear narratives**: Stories, tutorials, step-by-step guides
- **Long-form writing**: Essays, detailed explanations, blog posts
- **Code-heavy content**: When prose and code blocks dominate
- Note: Any document can be converted to markmap if beneficial

## Hierarchy Guidelines
### The 3-Level Rule
- **Ideal depth**: Aim for 3 levels of headings (H1, H2, H3)
- **Level 1**: Document title (`#`)
- **Level 2**: Major sections (`##`)
- **Level 3**: Subsections (`###`)
- **Then prose**: Use bulleted paragraphs for details

### When to Go Deeper
- **4+ levels acceptable**: When content naturally requires it
- **Use fold comments**: Collapse deep sections by default
- **Balance**: More levels = more structure but also more visual noise

### Folding Deep Hierarchies
- Add `<!-- markmap: fold -->` after a heading to collapse it
- Add `<!-- markmap: foldAll -->` to collapse all children
- Helps manage visual complexity in deep trees

## Formatting Prose
### The Bullet Paragraph Technique
- **Problem**: Markmap doesn't render regular paragraphs
- **Solution**: Use single bullet points with manual line breaks
- **Line length**: Wrap at 80 columns for readability
- **Indentation**: Continuation lines align with bullet content

### Example
```markdown
### Section Title
- This is a prose paragraph formatted as a bullet point. It wraps
  at 80 columns with manual line breaks. Continuation lines are
  indented to align properly under the bullet point marker.
```

### Code Blocks and Diagrams
- Code blocks work normally within the hierarchy
- Use for structure diagrams, examples, or technical details
- They provide visual breaks without adding hierarchy depth

## Markdown Features
### Supported Elements
- **Inline formatting**: Bold, italic, code, links all work
- **Lists**: Both bulleted and numbered lists
- **Code blocks**: Syntax highlighted code
- **Links**: To other documents, views, or external resources
- **Images**: Can be embedded (use sparingly)

### Best Practices
- **Keep nodes concise**: Short phrases work better than long sentences
- **Use formatting**: Bold for emphasis, code for technical terms
- **Link liberally**: Connect related documents and views
- **Avoid clutter**: Too many emojis or formatting reduces clarity

## Document Structure Template
```markdown
# Document Title

## Purpose
- Brief description of what this document covers and why it exists.

## Main Section 1
### Subsection A
- Details about subsection A with prose formatted as bullets at
  80 columns for readability in the markmap view.

### Subsection B
- Details about subsection B.

## Main Section 2
### Subsection C
- More content here.

## References
- [Related Document](../path/to/document.md)
- [External Resource](https://example.com)
```

## Tips and Tricks
### Visual Balance
- **Too shallow**: Loses structure, everything feels flat
- **Too deep**: Visual noise, hard to scan
- **Just right**: Clear structure, details accessible but not overwhelming

### Iterative Refinement
- Start with natural structure
- View in markmap to assess visual complexity
- Adjust hierarchy or add fold comments as needed
- Collapse prose into bullet paragraphs for clarity

### Cross-Referencing
- Link to other documents for deep dives
- Keep each markmap focused on one perspective
- Use multiple small markmaps rather than one giant one
