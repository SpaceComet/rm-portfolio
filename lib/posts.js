import fsp from 'fs/promises';
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import { serialize } from 'next-mdx-remote/serialize'

export default async function getAllPosts() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fileNames = await fsp.readdir(postsDirectory);

    let allPostsDataObj = {};

    const allPostsData = await Promise.all(fileNames.map( async (fileName) => {
        // Remove the extension 
        const id = fileName.replace(/\.md$/, '');

        // Read the file
        const fileFullPath = path.join(postsDirectory, fileName);
        const fileContent = await fsp.readFile(fileFullPath, 'utf8');
        const matterResult = matter(fileContent);

        // Use remark to convert markdown into HTML string
        const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
        const contentHtml = processedContent.toString();

        // Use mdx to to convert markdown into source
        const mdxSource = await serialize(matterResult.content);

        allPostsDataObj[id] = {
            metadata: matterResult.data,
            content: contentHtml,
            source: mdxSource
        }

        return({
            id: id,
            metadata: matterResult.data,
            content: contentHtml
        })
    }))

    return(allPostsDataObj)
}