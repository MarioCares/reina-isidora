"use client";
import { FormEvent, ReactElement, useState } from "react";
import { signIn } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useRouter, useSearchParams } from "next/navigation";
import { getErrorMessage } from "@/utils/Errors";
import { Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import Copyright from "@/components/dashboard/Copyright";
import Link from "next/link";

const LoginPage = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: data.get("email"),
        password: data.get("password"),
        callbackUrl,
      });
      setLoading(false);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Email o contraseña inválida");
      }
    } catch (error) {
      setLoading(false);
      setError(`Error al iniciar sesión: ${getErrorMessage(error)}`);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Acceso Sistema
          </Typography>
          {error && <Alert severity="error">{error}!</Alert>}
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="e-Mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {loading ? (
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
                Ingresar
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#">Olvidé mi contraseña</Link>
              </Grid>
              <Grid item>
                <Link href="/register">Crear cuenta</Link>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
