"use client";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import AppBarDrawer from "@/components/dashboard/AppBarDrawer";
import { Backdrop, CircularProgress } from "@mui/material";
import Copyright from "@/components/dashboard/Copyright";

export default function Dashboard() {
  const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);

  const handleBackdrop = () => setIsBackdropOpen(!isBackdropOpen);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarDrawer showBackdrop={handleBackdrop} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            <Copyright />
          </Container>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff" }}
        open={isBackdropOpen}
        onClick={handleBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
