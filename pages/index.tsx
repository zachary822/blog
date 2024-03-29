import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/Layout";
import Posts from "../components/Posts";
import { getPosts, getSummary } from "../utils/api";

const Home: NextPage = () => {
  return (
    <Layout>
      <Posts />
    </Layout>
  );
};

export default Home;

export async function getStaticProps({
  locale = "en",
}: GetStaticPropsContext<Record<string, never>>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["posts"],
      queryFn: () => getPosts(),
    }),
    queryClient.prefetchQuery({ queryKey: ["summary"], queryFn: getSummary }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale)),
    },
  };
}
