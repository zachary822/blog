import Container from "@mui/material/Container";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Container maxWidth="lg">
        <Header title="ThoughtBank" />
        {children}
      </Container>
      <Footer />
    </>
  );
}
