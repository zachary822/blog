import GitHubIcon from "@mui/icons-material/GitHub";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useQuery } from "react-query";
import { getPosts, getSummary } from "../utils/api";
import { Post } from "../utils/models";

import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import MainFeaturedPost from "./MainFeaturedPost";
import Sidebar from "./Sidebar";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  body: "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random?water",
  imageLabel: "main image description",
};

const sidebar = {
  title: "About",
  description: "Test blog that uses MongoDB document with markdown content.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon, url: "https://github.com/zachary822" },
  ],
};

export default function Blog() {
  const { data: posts = [] } = useQuery("posts", getPosts);
  const { data: archives = [] } = useQuery("summary", getSummary);

  return (
    <>
      <Container maxWidth="lg">
        <Header title="ThoughtBank" />
        <main>
          <MainFeaturedPost post={posts[0] || mainFeaturedPost} />
          <Grid container spacing={4}>
            {posts.slice(1, 3).map((post: Post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={posts.slice(3)} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer />
    </>
  );
}
