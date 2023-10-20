import Typography from "@mui/material/Typography";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import map from "lodash/map";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import PostBody from "../../../components/Post";
import SidebarLayout from "../../../components/SidebarLayout";
import { getPost, getPosts, getSummary } from "../../../utils/api";

const Post = () => {
  const {
    query: { pid },
  } = useRouter();
  const { data: post, isSuccess } = useQuery({
    queryKey: ["getPost", pid],
    queryFn: () => getPost(pid as string),
  });
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
      <SidebarLayout>
        {isSuccess && post ? (
          <PostBody post={post} />
        ) : (
          <div>
            <Typography gutterBottom variant="h6" component="h1">
              {t("Not Found")}
            </Typography>
          </div>
        )}
      </SidebarLayout>
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const queryClient = new QueryClient();
  const posts = await queryClient.fetchQuery({
    queryKey: ["getPosts"],
    queryFn: () => getPosts(),
  });

  return {
    paths: map(posts, (post) => ({ params: { pid: post._id } })),
    fallback: true,
  };
}

export async function getStaticProps({
  locale = "en",
  params: { pid } = { pid: "" },
}: GetStaticPropsContext<{ pid: string }>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["getPost", pid],
      queryFn: () => getPost(pid),
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
