import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import map from "lodash/map";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Markdown from "../../../components/Markdown";
import Sidebar from "../../../components/Sidebar";
import { getPostsByMonth, getSummary } from "../../../utils/api";

const MonthPosts = () => {
  const {
    query: { pid: year, month },
  } = useRouter();
  const { data: posts = [] } = useQuery(["month", year, month], () =>
    getPostsByMonth(year as string, month as string)
  );

  const d = new Date(
    parseInt(year as string),
    parseInt(month as string) - 1,
    1
  );

  return (
    <>
      <Head>
        <title>
          Posts: {d.toLocaleString("default", { month: "long" })}{" "}
          {d.getFullYear()}
        </title>
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
              <Typography variant="h6" gutterBottom>
                {d.toLocaleString("default", { month: "long" })}{" "}
                {d.getFullYear()}
              </Typography>
              <Divider />
              {posts.map((post) => (
                <div key={post._id} className="markdown">
                  <Typography gutterBottom variant="h4" component="h1">
                    {post.title}
                  </Typography>
                  <Typography gutterBottom variant="caption" paragraph>
                    {post.created}
                  </Typography>
                  <Markdown>{post.body}</Markdown>
                </div>
              ))}
            </Grid>
            <Sidebar />
          </Grid>
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default MonthPosts;

export async function getServerSideProps({
  locale = "en",
  params: { pid: year, month },
}: GetStaticPropsContext<any>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery("summary", getSummary),
    queryClient.prefetchQuery(["month", year, month], () =>
      getPostsByMonth(year, month)
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale)),
    },
  };
}
