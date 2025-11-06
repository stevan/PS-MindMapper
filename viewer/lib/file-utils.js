import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

/**
 * Recursively find all markdown files in a directory
 */
export async function findMarkdownFiles(dir, baseDir = dir) {
    const files = [];

    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                const subFiles = await findMarkdownFiles(fullPath, baseDir);
                files.push(...subFiles);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                const relativePath = path.relative(baseDir, fullPath);
                files.push(relativePath);
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
    }

    return files.sort();
}

/**
 * Read and parse a markdown file with frontmatter
 */
export async function readMarkdownFile(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const { data, content: markdown } = matter(content);

        return {
            frontmatter: data,
            content: markdown,
            type: data.type || 'markdown'
        };
    } catch (error) {
        throw new Error(`Failed to read file: ${error.message}`);
    }
}

/**
 * Build a hierarchical file tree from flat file list
 */
export function buildFileTree(files) {
    const tree = {};

    for (const file of files) {
        const parts = file.split(path.sep);
        let current = tree;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isFile = i === parts.length - 1;

            if (!current[part]) {
                current[part] = {
                    name: part,
                    path: parts.slice(0, i + 1).join('/'),
                    type: isFile ? 'file' : 'directory',
                    children: isFile ? null : {}
                };
            }

            if (!isFile) {
                current = current[part].children;
            }
        }
    }

    return tree;
}

/**
 * Check if content has embedded markmap blocks
 */
export function hasMarkmapBlocks(content) {
    return /```markmap\n[\s\S]*?```/.test(content);
}

/**
 * Extract markmap blocks from markdown content
 */
export function extractMarkmapBlocks(content) {
    const blocks = [];
    const markmapRegex = /```markmap\n([\s\S]*?)```/g;
    let match;
    let lastIndex = 0;

    while ((match = markmapRegex.exec(content)) !== null) {
        // Add markdown content before this block
        if (match.index > lastIndex) {
            const mdContent = content.substring(lastIndex, match.index);
            if (mdContent.trim()) {
                blocks.push({
                    type: 'markdown',
                    content: mdContent
                });
            }
        }

        // Add markmap block
        blocks.push({
            type: 'markmap',
            content: match[1]
        });

        lastIndex = match.index + match[0].length;
    }

    // Add remaining markdown content
    if (lastIndex < content.length) {
        const mdContent = content.substring(lastIndex);
        if (mdContent.trim()) {
            blocks.push({
                type: 'markdown',
                content: mdContent
            });
        }
    }

    return blocks;
}
