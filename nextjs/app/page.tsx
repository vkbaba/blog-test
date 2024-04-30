import  PostList  from "@/components/PostList";
import fs from 'fs';
import path from 'path';
import {getPostsMetadata, getPostContent} from '@/utils/getPosts';

export default async function Page() { 
  const posts = getPostsMetadata("./posts");
  return (
      <PostList posts={posts} />
  );
}