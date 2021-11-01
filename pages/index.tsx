import type { NextPage } from "next";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Blog from "../components/Blog";
import { getPosts, getSummary } from "../utils/api";

const Home: NextPage = () => {
  const { data: posts = [] } = useQuery("posts", () => getPosts());

  return (
    <>
      <Head>
        <title>ThoughtBank</title>
        <meta name="description" content="blog" />
      </Head>
      <Blog posts={posts} />
    </>
  );
};

export default Home;

export async function getStaticProps(context: GetStaticPropsContext<any>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery("posts", () => getPosts()),
    queryClient.prefetchQuery("summary", getSummary),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
