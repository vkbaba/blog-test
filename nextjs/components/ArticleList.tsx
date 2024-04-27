type Article = {
  id: number;
  title: string;
};

type Props = {
  articles: Article[];
};

const ArticleList = ({ articles } : Props) => {
  return (
    <ul>
      {articles.map(article => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  );
};

export default ArticleList;
