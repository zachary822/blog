import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Post from "../../components/Post";
import SidebarLayout from "../../components/SidebarLayout";
import { getPosts, getSummary } from "../../utils/api";

const Posts = () => {
  const {
    query: { q = "" },
  } = useRouter();
  const { t } = useTranslation();
  const {
    data: posts = [],
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["getPosts", q],
    queryFn: () => getPosts({ query: q as string }),
    retry: false,
  });

  return (
    <SidebarLayout>
      <Typography variant="h4" gutterBottom>
        {t("Search Results")}
      </Typography>
      <Divider />
      {isSuccess &&
        posts.map((post) => <Post post={post} key={post._id} pt={3} />)}
      {isError && (
        <Typography variant="h6" component="h1" sx={{ mt: 1 }}>
          {t("Not Found")}
        </Typography>
      )}
    </SidebarLayout>
  );
};

export async function getStaticProps({
  locale = "en",
}: GetStaticPropsContext<Record<string, never>>) {
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
