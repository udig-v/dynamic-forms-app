import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormCard from "../components/FormCard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AddIcon from "@mui/icons-material/Add";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
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

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/forms", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setForms(res.data.forms);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formsList =
    forms.length === 0 ? (
      <Typography variant="body1">
        Create your first form to see it here
      </Typography>
    ) : (
      forms.map((form, k) => (
        <Grid item xs={12}>
          <FormCard form={form} key={k} />
        </Grid>
      ))
    );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <AppBar color="transparent" position="static" elevation={0}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h4"
                  noWrap
                  component="a"
                  sx={{
                    flexGrow: 1,
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Typography>

                <Button
                  type="button"
                  variant="contained"
                  component={Link}
                  to="/dashboard/create"
                  sx={{ borderRadius: "10px" }}
                >
                  <AddIcon />
                  Create New Form
                </Button>
              </Toolbar>
            </Container>
          </AppBar>

          <Grid container spacing={0}>
            {formsList}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
