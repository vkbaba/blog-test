import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

type PostMetadata = {
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    coverImage: string;
    slug: string;
};

type Props = {
    posts: PostMetadata[];
};

const Post = ({ post }: { post: PostMetadata }) => {
    post.coverImage = `/${post.slug}/images/${post.coverImage}`;

    const imgProps = process.env.NODE_ENV === 'development' ?
    {
        src: post.coverImage,
        alt: "Cover",
        width: 500,
        height: 500,
        className: "object-cover w-full border border-blog-border h-full rounded-md"
    } :
    {
        src: post.coverImage,
        alt: "Cover",
        className: "object-cover w-full border border-blog-border h-full rounded-md",
        basePath: '/blog-test'
    };

    return (
        <div className="flex rounded-md overflow-hidden my-8 h-48">
            <div className="flex-none w-1/3 mr-6">
                <Link href={`/posts/${post.slug}`}>
                    <ExportedImage {...imgProps} />
                </Link>
            </div>
            <div className="flex-grow p-4 flex flex-col justify-between"> {/* ここに flex-col と justify-between を追加 */}
                <Link href={`/posts/${post.slug}`}>
                    <h2 className="text-2xl my-2">{post.title}</h2>
                </Link>
                <div>
                    <p className="mb-2">{post.date}</p>
                    <div className="flex flex-wrap">
                        {post.tags.map((tag, index) => (
                            <span key={index} className="mr-2 mt-1 px-3 py-1 bg-blog-accent-secondary rounded-md text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;