import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import map from "lodash/map";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Post from "../../../components/Post";
import Sidebar from "../../../components/Sidebar";
import { getPostsByTag, getSummary } from "../../../utils/api";

export default function Tags() {
  const {
    query: { tag },
  } = useRouter();
  const { t } = useTranslation();
  const { data: posts = [] } = useQuery(["tag", tag], () =>
    getPostsByTag(tag as string),
  );

  return (
    <>
      <Head>
        <title>ThoughtBank</title>
        <meta name="description" content="blog post" />
      </Head>
      <Container maxWidth="lg" sx={{ color: "text.primary" }}>
        <Header title="ThoughtBank" />
        <Grid container spacing={5} pt={3} component="main">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {t("Tag")}:{" "}
              <Typography fontFamily="monospace" variant="h4" component="span">
                {tag}
              </Typography>
            </Typography>
            <Divider />
            {posts.map((post) => (
              <Post post={post} key={post._id} pt={3} />
            ))}
          </Grid>
          <Sidebar />
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const queryClient = new QueryClient();
  const summary = await queryClient.fetchQuery(["summary"], getSummary);

  return {
    paths: map(summary.tags, (tag) => {
      return {
        params: { tag: tag.name },
      };
    }),
    fallback: "blocking",
  };
}

export async function getStaticProps({
  locale = "en",
  params: { tag },
}: GetStaticPropsContext<any>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(["summary"], getSummary),
    queryClient.prefetchQuery(["tag", tag], () => getPostsByTag(tag)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale)),
    },
  };
}
