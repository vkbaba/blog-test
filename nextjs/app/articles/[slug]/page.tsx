
import { getPostsMetadata, getPostContent } from "@/utils/getPosts"
import Markdown from "markdown-to-jsx"
import React from 'react'
import ExportedImage from "next-image-export-optimizer";
import Code from "@/components/Code"
// Set dynamic routes
export const generateStaticParams = async () => {
    const posts = getPostsMetadata('./posts/')
    return posts.map((post: { slug: string }) => ({ slug: post.slug }))
}

// export async function generateMetadata({ params, searchParams }) {
//     const id = params?.slug ? ' ⋅ ' + params?.slug : ''
//     return {
//         title: `The Bubbly Baker ${id.replaceAll('_', ' ')}`
//     }
// }

export default function Page({ params }: { params: { slug: string } }) {
    const post = getPostContent('./posts/', params.slug)

    // (images/*.png) -> (/slug/images/*.png)
    post.content = post.content.replace(/\(images\/(.*?.(png|jpg|jpeg|gif|svg))\)/g, `(/${params.slug}/images/$1)`);
    
    // Need to set width and height for images in development environment to avoid build errors.
    // It means images may look different in development and production environments.
    // This is a current limitation when using both next-image-export-optimizer and markdown-to-jsx.
    const imgProps = process.env.NODE_ENV === 'development' ?
        // dev 
        {
            className: 'm-6 rounded-md	border border-gray-500 mx-auto',
            width: 500,
            height: 500
        } :
        // prod
        {
            className: 'm-6 rounded-md	border border-gray-500 mx-auto',
            basePath : '/blog-test'
        };
        
    return (
            <div className="max-w-4xl mx-auto">
        <main>
            <article>
                <Markdown
                    options={{
                        overrides: {
                            h1: {
                                props: {
                                    className: 'text-4xl font-bold my-6 border-b-2 border-gray-200 pb-2',
                                },
                            },
                            h2: {
                                props: {
                                    className: 'text-2xl font-bold my-4',
                                },
                            },
                            h3: {
                                props: {
                                    className: 'text-xl font-bold my-4',
                                },
                            },
                            p: {
                                props: {
                                    className: 'text-lg	my-4',
                                },
                            },
                            ul: {
                                props: {
                                    className: 'list-disc ',
                                },
                            },
                            ol: {
                                props: {
                                    className: 'list-decimal ',
                                },
                            },
                            li: {
                                props: {
                                    className: 'list-inside ml-6 text-lg',
                                },
                            },
                            a: {
                                props: {
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                    className: 'text-blue-600 underline visited:text-indigo-800',
                                },
                            },
                            img: {
                                component: ExportedImage,
                                props: imgProps,
                            },
                            code: {
                                component: Code,
                            },
                        }
                    }}
                >
                    {post.content}

                </Markdown>
            </article>
        </main>
    </div>
    )
}