import Grid from "@mui/material/Grid";
import { ReactNode } from "react";
import Layout from "./Layout";
import Sidebar from "./Sidebar";

type SidebarLayoutProps = {
  children: ReactNode;
};

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <Layout>
      <Grid container spacing={5} pt={3} component="main">
        <Grid item xs={12} md={8}>
          {children}
        </Grid>
        <Sidebar />
      </Grid>
    </Layout>
  );
}
