"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarDrawer from "@/components/dashboard/AppBarDrawer";
import Toolbar from "@mui/material/Toolbar";
import { Backdrop, CircularProgress } from "@mui/material";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
          {children}
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
};

export default Layout;
