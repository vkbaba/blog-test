import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface PostMetadata {
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    coverImage: string;
    slug: string;
}

function getAllFiles(dir: string): string[] {
    const files = fs.readdirSync(dir);
    const allFiles: string[] = [];
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            const subdirectoryFiles = getAllFiles(filePath);
            allFiles.push(...subdirectoryFiles);
        } else {
            allFiles.push(filePath);
        }
    });
    return allFiles;
};

export function getPostsMetadata(basePath: string): PostMetadata[] {

    const markdownFiles = getAllFiles(basePath).filter(file => file.endsWith('.md'));

    const posts = markdownFiles.map((filePath) => {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const matterResult = matter(fileContents);
        const filename = path.basename(filePath);
        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            categories: matterResult.data.categories,
            tags: matterResult.data.tags,
            coverImage: matterResult.data.coverImage,
            slug: filename.replace('.md', ''),
        };
    });

    return posts;
}

export function getPostContent(basePath: string, slug: string): matter.GrayMatterFile<string> {
    const markdownFiles = getAllFiles(basePath).filter(file => file.endsWith('.md'));
    const file = markdownFiles.find(file => file.endsWith(slug + '.md'));

    if (!file) {        
        throw new Error(`File not found: ${slug}`);
    }

    const content = fs.readFileSync(file, 'utf8');

    const matterResult = matter(content)
    return matterResult
}

