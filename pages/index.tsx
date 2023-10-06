import Container from "@mui/material/Container";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getPosts, getSummary } from "../utils/api";

const DynamicPosts = dynamic(() => import("../components/Posts"), {
  suspense: true,
});

const Home: NextPage = () => {
  const { data: posts = [], isLoading } = useQuery(["posts"], () => getPosts());

  return (
    <>
      <Container maxWidth="lg">
        <Header title="ThoughtBank" />
        {!isLoading ? (
          <Suspense>
            <DynamicPosts posts={posts} />
          </Suspense>
        ) : (
          <main />
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Home;

export async function getStaticProps({
  locale = "en",
}: GetStaticPropsContext<any>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(["posts"], () => getPosts()),
    queryClient.prefetchQuery(["summary"], getSummary),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale)),
    },
  };
}
