import fs from 'fs'
import fsp from 'fs/promises';
import path from 'path'
import matter from 'gray-matter'

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

        allPostsDataObj[id] = {
            metadata: matterResult.data,
            content: matterResult.content
        }

        return({
            id: id,
            metadata: matterResult.data,
            content: matterResult.content
        })
    }))

    return(allPostsDataObj)
}