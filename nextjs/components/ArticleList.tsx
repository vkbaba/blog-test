import Link from "next/link";

type ArticleMetadata = {
    title: string;
    date: string;
    categories: string[];
    tags: string[];
    coverImage: string;
    slug: string;
};

type Props = {
  articles: ArticleMetadata[];
};

const ArticleList = ({ articles }: Props) => {
    return (
      <ul>
        {articles.map(article => (
          <li key={article.slug}>
            {/* Link コンポーネントを使用して動的ルートへのリンクを設定 */}
            <Link href={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

export default ArticleList;
