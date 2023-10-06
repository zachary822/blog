import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import map from "lodash/map";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Layout from "../../../components/Layout";
import PostBody from "../../../components/Post";
import Sidebar from "../../../components/Sidebar";
import { getPost, getPosts, getSummary } from "../../../utils/api";

const Post = () => {
  const {
    query: { pid },
  } = useRouter();
  const { data: post, isSuccess } = useQuery(["getPost", pid], () =>
    getPost(pid as string),
  );
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{"ThoughtBank" + (post ? " | " + post.title : "")}</title>
        <meta name="description" content={post?.summary || ""} />

        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.summary || ""} />
        {post?.image ? <meta property="og:url" content={post.image} /> : null}
      </Head>
      <Layout>
        <Grid container spacing={5} pt={3} component="main">
          <Grid item xs={12} md={8}>
            {isSuccess && post ? (
              <PostBody post={post} />
            ) : (
              <div>
                <Typography gutterBottom variant="h6" component="h1">
                  {t("Not Found")}
                </Typography>
              </div>
            )}
          </Grid>
          <Sidebar />
        </Grid>
      </Layout>
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const queryClient = new QueryClient();
  const posts = await queryClient.fetchQuery(["getPosts"], () => getPosts());

  return {
    paths: map(posts, (post) => ({ params: { pid: post._id } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({
  locale = "en",
  params: { pid },
}: GetStaticPropsContext<any>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(["getPost", pid], () => getPost(pid)),
    queryClient.prefetchQuery(["summary"], getSummary),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale)),
    },
  };
}
