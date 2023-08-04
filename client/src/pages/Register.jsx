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

const Register = () => {
  // const navigate = useNavigate();

  const { login } = useAuth();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = inputValue;

  const handleOnChange = (e) => {
    // const { name, value } = e.target;
    const value = e.target.value;
    setInputValue({
      ...inputValue,
      [e.target.name]: value,
    });
  };

  // const handleError = (err) => toast.error(err, { position: "bottom-left" });

  // const handleSuccess = (msg) =>
  //   toast.success(msg, { position: "bottom-right" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const userData = {
    //   name: inputValue.name,
    //   email: inputValue.email,
    //   password: inputValue.password,
    // };

    // axios
    //   .post("http://localhost:5000/api/users/register", userData)
    //   .then((res) => {
    //     console.log(res.status, res.data);
    //     navigate("/dashboard");
    //   });
    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match");
    // } else {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      console.log(data);

      if (data) {
        login(data);
      } else {
        console.log("The user is already registered");
      }
    } catch (err) {
      console.log(err);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });

    //     const data = res.data;

    //     // if (data) {
    //     //   // handleSuccess(message);
    //     //   navigate("/dashboard");
    //     // }
    //     // const res = await register({ name, email, password }).unwrap();
    //     // dispatch(setCredentials({ ...res }));
    //     // navigate("/");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // const [data, setData] = useState({
    //   name: "",
    //   email: "",
    //   password: "",
    // });

    // const handleOnChange = (e) => {
    //   const value = e.target.value;
    //   setData({
    //     ...data,
    //     [e.target.name]: value,
    //   });
    // };

    // const handleSubmit = (e) => {
    //   e.preventDefault();

    //   const userData = {
    //     name: data.name,
    //     email: data.email,
    //     password: data.password,
    //   };

    //   axios
    //     .post("http://localhost:5000/api/users/register", userData)
    //     .then((res) => {
    //       console.log(res.status, res.data.token);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
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
            <b>Register</b> below
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
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
                  type="text"
                  autoFocus
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  type="email"
                  autoComplete="email"
                  onChange={handleOnChange}
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
                  value={password}
                  autoComplete="new-password"
                  onChange={handleOnChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  autoComplete="confirm-password"
                  onChange={handleOnChange}
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
            >
              Sign up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
