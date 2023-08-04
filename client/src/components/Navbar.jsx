import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Outlet, useNavigate, Link } from "react-router-dom";
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

function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/api/users/logout")
      .then((res) => {
        console.log(res.status, res.data);
        logout();
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar color="transparent" position="static" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CheckBoxIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              FORMS
            </Typography>
            {user ? (
              <Button
                type="button"
                onClick={handleLogout}
                variant="contained"
                color="primary"
                disableElevation
                sx={{ borderRadius: "10px", marginLeft: "10px" }}
                href="/"
              >
                Logout
              </Button>
            ) : (
              <div>
                <Button
                  type="button"
                  variant="outlined"
                  disableElevation
                  component={Link}
                  to="/login"
                  sx={{ borderRadius: "10px", marginLeft: "10px" }}
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  disableElevation
                  component={Link}
                  to="/register"
                  sx={{
                    borderRadius: "10px",
                    marginLeft: "10px",
                  }}
                  color="primary"
                >
                  Register
                </Button>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </ThemeProvider>
  );
}

export default Navbar;
