import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Layout from "../../components/Layout";
import Post from "../../components/Post";
import Sidebar from "../../components/Sidebar";
import { getPosts, getSummary } from "../../utils/api";

const Posts = () => {
  const {
    query: { q = "" },
  } = useRouter();
  const { t } = useTranslation();
  const { data: posts = [], isSuccess } = useQuery(
    ["getPosts", q],
    () => getPosts({ query: q as string }),
    { retry: false },
  );

  return (
    <Layout>
      <Grid container spacing={5} pt={3} component="main">
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {t("Search Results")}
          </Typography>
          <Divider />
          {isSuccess ? (
            posts.map((post) => <Post post={post} key={post._id} pt={3} />)
          ) : (
            <Typography variant="h6" component="h1" sx={{ mt: 1 }}>
              {t("Not Found")}
            </Typography>
          )}
        </Grid>
        <Sidebar />
      </Grid>
    </Layout>
  );
};

export async function getStaticProps({
  locale = "en",
}: GetStaticPropsContext<any>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["summary"], getSummary);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Posts;
