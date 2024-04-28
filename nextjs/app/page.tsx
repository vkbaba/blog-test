import  ArticleList  from "@/components/ArticleList";
import fs from 'fs';
import path from 'path';
import getArticlesMetadata from '@/utils/getArticlesMetadata';

export default async function Page() { 
  const articles = getArticlesMetadata("../content/");
  return (
    <>
      <ArticleList articles={articles} />
    </>
  );
}