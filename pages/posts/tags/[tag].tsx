import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import map from "lodash/map";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Post from "../../../components/Post";
import SidebarLayout from "../../../components/SidebarLayout";
import { getPostsByTag, getSummary } from "../../../utils/api";

export default function Tags() {
  const {
    query: { tag },
  } = useRouter();
  const { t } = useTranslation();
  const { data: posts = [] } = useQuery({
    queryKey: ["tag", tag],
    queryFn: () => getPostsByTag(tag as string),
  });

  return (
    <SidebarLayout>
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
    </SidebarLayout>
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
    fallback: true,
  };
}

export async function getStaticProps({
  locale = "en",
  params: { tag } = { tag: "" },
}: GetStaticPropsContext<{ tag: string }>) {
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
