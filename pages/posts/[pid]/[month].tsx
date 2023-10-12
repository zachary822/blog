import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import map from "lodash/map";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import Post from "../../../components/Post";
import SidebarLayout from "../../../components/SidebarLayout";
import { getPostsByMonth, getSummary } from "../../../utils/api";

const MonthPosts = () => {
  const {
    query: { pid: year, month },
  } = useRouter();
  const { data: posts = [] } = useQuery({
    queryKey: ["month", year, month],
    queryFn: () => getPostsByMonth(year as string, month as string),
  });

  const d = new Date(
    parseInt(year as string),
    parseInt(month as string) - 1,
    1,
  );

  return (
    <>
      <Head>
        <title>
          {"Posts: " +
            d.toLocaleString("default", { month: "long" }) +
            " " +
            d.getFullYear()}
        </title>
        <meta name="description" content="blog post" />
      </Head>
      <SidebarLayout>
        <Typography variant="h4">
          {d.toLocaleString("default", { month: "long" })} {d.getFullYear()}
        </Typography>
        <Divider />
        {posts.map((post) => (
          <Post post={post} key={post._id} pt={3} />
        ))}
      </SidebarLayout>
    </>
  );
};

export default MonthPosts;

export async function getStaticPaths() {
  const queryClient = new QueryClient();
  const summary = await queryClient.fetchQuery(["summary"], getSummary);

  return {
    paths: map(summary.monthly, (s) => {
      return {
        params: { pid: s.year.toString(), month: s.month.toString() },
      };
    }),
    fallback: true,
  };
}

export async function getStaticProps({
  locale = "en",
  params: { pid: year, month } = { pid: "", month: "" },
}: GetStaticPropsContext<{ pid: string; month: string }>) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery(["summary"], getSummary),
    queryClient.prefetchQuery(["month", year, month], () =>
      getPostsByMonth(year, month),
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale)),
    },
  };
}
