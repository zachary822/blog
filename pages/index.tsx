import Container from "@mui/material/Container";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Posts from "../components/Posts";
import { getPosts, getSummary } from "../utils/api";

const Home: NextPage = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Header title="ThoughtBank" />
        <Posts />
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
