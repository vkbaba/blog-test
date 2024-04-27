import  ArticleList  from "@/components/ArticleList";

const articles = [
  { id: 1, title: "Title 1" },
  { id: 2, title: "Title 2" },
  { id: 3, title: "Title 3" },
];

export default async function Page() {

  return (
    <>
      <ArticleList articles={articles} />
    </>
  );
}