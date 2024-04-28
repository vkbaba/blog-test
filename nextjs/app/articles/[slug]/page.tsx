import Markdown from "markdown-to-jsx"
// import getArticlesMetadata from "@/utils/getArticlesMetadata"
import {getPostsMetadata, getPostContent} from "@/utils/getPosts"
import React from 'react'
import fs from 'fs'
import matter from "gray-matter"

// function getPostContent(slug: string) {
//     const folder = '../content/2024/'
//     const file = folder + `${slug}.md`
//     const content = fs.readFileSync(file, 'utf8')

//     const matterResult = matter(content)
//     return matterResult
// }

// Set dynamic routes
export const generateStaticParams = async () => {
    const posts = getPostsMetadata('../content/')
    return posts.map((post: { slug: string }) => ({ slug: post.slug }))
}

export default function Page({params} : {params: {slug: string}}) {
    const post = getPostContent('../content/', params.slug)
    return (
        <main>
            <article>
                <Markdown>{post.content}</Markdown>
            </article>
        </main>
    )
}