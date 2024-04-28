import  ArticleList  from "@/components/ArticleList";
import fs from 'fs';
import path from 'path';
import {getPostsMetadata, getPostContent} from '@/utils/getPosts';

export default async function Page() { 
  const articles = getPostsMetadata("../content/");
  return (
    <>
      <ArticleList articles={articles} />
    </>
  );
}