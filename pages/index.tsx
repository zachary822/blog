import type { NextPage } from "next";
import { GetStaticPropsContext } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Blog from "../components/Blog";
import { getPosts, getSummary } from "../utils/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  const { data: posts = [] } = useQuery("posts", () => getPosts());

  return <Blog posts={posts} />;
};

export default Home;

export async function getStaticProps({
  locale = "en",
}: GetStaticPropsContext<any>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery("posts", () => getPosts()),
    queryClient.prefetchQuery("summary", getSummary),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale)),
    },
  };
}
