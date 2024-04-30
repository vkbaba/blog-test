import Link from "next/link";
import Post from "./Post";

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

const PostList = ({ posts }: Props) => {
    const sortedPosts = posts.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
      <ul >
        {posts.map(post => (
          <li key={post.slug} >
            <div className ="border border-blog-border"></div>
            <Post post={post} />
          </li>
        ))}
      </ul>
    );
  };

export default PostList;
