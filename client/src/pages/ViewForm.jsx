import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Container,
  Box,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Snackbar,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import ViewQuestions from "../components/ViewQuestions";
import ViewResponses from "../components/ViewResponses";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#262626",
      hover: "#555555",
    },
  },
});

const ViewForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    fields: [],
  });
  const id = useParams().formId;

  const [showPopup, setShowPopup] = useState(false);
  const [shareableLink, setShareableLink] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/forms/${id}`)
      .then((res) => {
        setForm(res.data.form);
      })
      .catch((err) => {
        console.log("Error from ViewForm.jsx:", err);
      });
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleShareClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/forms/share",
        {
          formId: id,
        }
      );

      setShareableLink(response.data.shareableLink);
      setShowPopup(true);
    } catch (err) {
      console.log("Error generating shareable link:", err);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setShareableLink("");
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/shared-form/${shareableLink}`
    );
    handleSnackbarOpen();
  };

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
          <Grid container spacing={2}>
            <Button
              type="button"
              component={Link}
              to="/dashboard"
              startIcon={<KeyboardBackspaceIcon />}
            >
              Back to dashboard
            </Button>
          </Grid>
          <AppBar color="transparent" position="static" elevation={0}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h4"
                  noWrap
                  component="a"
                  sx={{
                    marginLeft: -3,
                    flexGrow: 1,
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  {form.title}
                </Typography>

                <Button
                  type="button"
                  variant="contained"
                  onClick={handleShareClick}
                  sx={{ marginRight: "10px", borderRadius: "10px" }}
                >
                  Share
                </Button>
                <Dialog open={showPopup} onClose={handlePopupClose}>
                  <DialogTitle>Share form</DialogTitle>
                  <DialogContent>
                    <Typography gutterBottom>
                      Share this link with others to gather their opinions!
                    </Typography>

                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        p: 3,
                        mt: 3,
                      }}
                    >
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={10}>
                          <Typography gutterBottom>
                            http://localhost:3000/shared-form/{shareableLink}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Tooltip title="Copy link">
                            <Button onClick={handleCopyLink} color="primary">
                              <ContentCopyIcon />
                            </Button>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handlePopupClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button
                  type="button"
                  variant="outlined"
                  component={Link}
                  to={`/dashboard/${form._id}/edit`}
                  sx={{ marginRight: "10px", borderRadius: "10px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  type="button"
                  component={Link}
                  to={`/dashboard/${form._id}/delete`}
                  sx={{ borderRadius: "10px" }}
                >
                  Delete
                </Button>
              </Toolbar>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  {form.description}
                </Typography>
              </Grid>
            </Container>
          </AppBar>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Questions" />
            <Tab label="Responses" />
          </Tabs>
          {activeTab === 0 && <ViewQuestions />}
          {activeTab === 1 && <ViewResponses />}
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Link copied to clipboard!"
        />
      </Container>
    </ThemeProvider>
  );
};

export default ViewForm;
