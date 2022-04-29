import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import map from "lodash/map";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Markdown from "../../../components/Markdown";
import Sidebar from "../../../components/Sidebar";
import { getPost, getPosts, getSummary } from "../../../utils/api";

const Post = () => {
  const {
    query: { pid },
  } = useRouter();
  const { data: post, isSuccess } = useQuery(["getPost", pid], () =>
    getPost(pid as string)
  );
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>ThoughtBank</title>
        <meta name="description" content="blog post" />
      </Head>
      <Container maxWidth="lg" sx={{ color: "text.primary" }}>
        <Header title="ThoughtBank" />
        <main>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                "& .markdown": {
                  py: 3,
                },
              }}
            >
              {isSuccess && post ? (
                <div className="markdown">
                  <Typography gutterBottom variant="h4" component="h1">
                    {post.title}
                  </Typography>
                  <Typography gutterBottom variant="caption" paragraph>
                    {new Date(post.created).toLocaleString()}
                  </Typography>
                  <Markdown>{post.body}</Markdown>
                </div>
              ) : (
                <div>
                  <Typography gutterBottom variant="h4" component="h1">
                    {t("Not Found")}
                  </Typography>
                </div>
              )}
            </Grid>
            <Sidebar />
          </Grid>
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default Post;

export async function getServerSideProps({
  locale = "en",
  params: { pid },
}: GetStaticPropsContext<any>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(["getPost", pid], () => getPost(pid)),
    queryClient.prefetchQuery("summary", getSummary),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale)),
    },
  };
}
