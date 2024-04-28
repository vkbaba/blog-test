import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface ArticleMetadata {
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    coverImage: string;
    slug: string;
}

export default function getArticlesMetadata(basePath: string): ArticleMetadata[] {
    const getAllFiles = (dir: string): string[] => {
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

