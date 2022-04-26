import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import { Post } from "../utils/models";

import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import MainFeaturedPost from "./MainFeaturedPost";
import Sidebar from "./Sidebar";

const THEMES = ["nature", "animals", "wanderlust", "city"];

const mainFeaturedPost = {
  title: "Title of a longer featured blog posts",
  body: "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this posts's contents.",
  image: "https://source.unsplash.com/random?water",
  imageLabel: "main image description",
};

export default function Blog({ posts }: { posts: Post[] }) {
  const { t } = useTranslation();
  return (
    <>
      <Container maxWidth="lg" sx={{ color: "text.primary" }}>
        <Header title="ThoughtBank" />
        <main>
          <MainFeaturedPost post={posts[0] || mainFeaturedPost} />
          <Grid container spacing={4}>
            {posts.slice(1, 3).map((post: Post, i) => (
              <FeaturedPost
                key={post.title}
                post={{
                  ...post,
                  image:
                    post.image ||
                    `https://source.unsplash.com/random?${THEMES[i]}`,
                }}
              />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title={t("From the firehose")} posts={posts.slice(3)} />
            <Sidebar />
          </Grid>
        </main>
      </Container>
      <Footer />
    </>
  );
}
