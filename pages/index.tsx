import type { NextPage } from "next";
import Head from "next/head";
import Blog from "../components/Blog";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="blog" />
      </Head>
      <Blog />
    </>
  );
};

export default Home;
