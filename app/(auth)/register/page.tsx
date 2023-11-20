"use client";
import { FormEvent, useEffect } from "react";
import { signIn } from "next-auth/react";
import useRegister from "@/hooks/useRegister";
import { IRegister } from "@/interfaces/model/IRegister";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Copyright from "@/components/dashboard/Copyright";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";

const RegisterPage = () => {
  const { loadingRegister, handleRegister, statusRegister } = useRegister();

  useEffect(() => {
    if (statusRegister) {
      if (statusRegister === "ok") {
        signIn(undefined, { callbackUrl: "/" });
      }
    }
  }, [statusRegister]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleRegister({
      name: `${data.get("name")} ${data.get("lastName")}`,
      email: data.get("email"),
      password: data.get("password"),
    } as IRegister);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro de Usuario
        </Typography>
        {statusRegister && statusRegister !== "ok" && (
          <Alert severity="error">{statusRegister}!</Alert>
        )}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="firstName"
                label="Nombres"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Apellidos"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="e-Mail"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          {loadingRegister ? (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<LoginIcon />}
              variant="outlined"
            >
              Cargando
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          )}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={"/login"}>Ya tengo cuenta!</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
    </Container>
  );
};

export default RegisterPage;
