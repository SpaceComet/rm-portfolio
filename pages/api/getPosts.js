import fs from 'fs'
import fsp from 'fs/promises';
import path from 'path'
import matter from 'gray-matter'
import getConfig from 'next/config'

export default async function handler(req, res) {
    if (req.method === 'GET' && req.query.postName) {
        const { serverRuntimeConfig } = getConfig()
        const postName = `${req.query.postName}.md`;
        const postsDirectory = path.join(__dirname, 'posts');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, postName)
        console.log(fullPath);


        try {
            await fsp.access(fullPath, fs.constants.F_OK);
            const fileContents = await fsp.readFile(fullPath, 'utf8');
    
            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents)
            return( res.status(200).json({ metadata: matterResult.data, content: matterResult.content }) );
        } catch (error) {
            console.log(error);
            return( res.status(404).json({ error: error}) );
        }

    }
    return( res.status(400).json({ error: "Error: Wrong request."}) );
}