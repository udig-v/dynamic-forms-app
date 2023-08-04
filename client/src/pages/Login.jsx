import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#262626",
      hover: "#555555",
    },
  },
});

const Login = () => {
  const { login } = useAuth();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          ...inputValue,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        login(response.data);
      } else {
        console.log("Invalid email or password");
      }
    } catch (err) {
      // toast.error(err?.data?.message || err.error);
      console.log(err);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Grid container spacing={2}>
            <Button
              type="button"
              component={Link}
              to="/"
              startIcon={<KeyboardBackspaceIcon />}
            >
              Back to home
            </Button>
          </Grid>
          <Typography component="h1" variant="h4">
            <b>Login</b> below
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  autoFocus
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/register" variant="body2">
                  Don't have an account? Register
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
