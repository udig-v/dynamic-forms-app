import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#262626",
      hover: "#555555",
    },
  },
});

const SharedForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    fields: [],
  });
  const { shareableLink } = useParams();
  const [responses, setResponses] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false);

  console.log(shareableLink);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/forms/share/${shareableLink}`)
      .then((res) => {
        console.log(res.data);
        setForm(res.data.form);
      })
      .catch((err) => {
        console.error("Error fetching shared form:", err);
      });
  }, [shareableLink]);

  const handleSelectChange = (event, fieldIndex) => {
    const { name, value } = event.target;
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[fieldIndex] = value;
      return updatedResponses;
    });
  };

  const handleClosePopup = () => {
    setSuccessPopup(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const responsesData = form.fields.map((field, fieldIndex) => {
      const question = field.question;
      let response;

      switch (field.type) {
        case "multipleChoice":
        case "dropdown":
        case "text":
          response = e.target[`response-${fieldIndex}`].value;
          break;
        case "checkbox":
          const selectedCheckboxes = [];
          field.answerOptions.forEach((option, optionIndex) => {
            if (e.target[`response-${fieldIndex}-${optionIndex}`]?.checked) {
              selectedCheckboxes.push(option);
            }
          });
          response = selectedCheckboxes;
          break;
        default:
          response = "";
      }

      return {
        question,
        response,
      };
    });

    try {
      await axios.post(
        `http://localhost:5000/api/forms/${form._id}/responses`,
        {
          responses: responsesData,
        }
      );

      console.log("Response submitted successfully");
      setResponses(responsesData);
      setSuccessPopup(true);
    } catch (err) {
      console.error("Error submitting response: ", err);
    }
  };

  const renderAnswerOptions = (field, fieldIndex) => {
    switch (field.type) {
      case "multipleChoice":
        return (
          <FormControl component="fieldset">
            <RadioGroup>
              {field.answerOptions.map((option, optionIndex) => (
                <FormControlLabel
                  key={optionIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                  name={`response-${fieldIndex}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      case "text":
        return (
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Type your answer here"
            name={`response-${fieldIndex}`}
          />
        );
      case "dropdown":
        return (
          <FormControl fullWidth>
            <InputLabel>{field.question}</InputLabel>
            <Select
              value={responses[fieldIndex] || ""}
              onChange={(e) => handleSelectChange(e, fieldIndex)}
              name={`response-${fieldIndex}`}
            >
              {field.answerOptions.map((option, optionIndex) => (
                <MenuItem key={optionIndex} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "checkbox":
        return (
          <FormControl component="fieldset">
            {field.answerOptions.map((option, optionIndex) => (
              <FormControlLabel
                key={optionIndex}
                control={<Checkbox />}
                value={option}
                label={option}
                name={`response-${fieldIndex}`}
              />
            ))}
          </FormControl>
        );
      default:
        return null;
    }
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
              </Toolbar>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  {form.description}
                </Typography>
              </Grid>
            </Container>
          </AppBar>
          <Grid container spacing={0} justifyContent="center">
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              sx={{ mt: 0, width: "100%" }}
              noValidate
            >
              {form.fields &&
                form.fields.map((field, fieldIndex) => (
                  <Grid item xs={12} key={fieldIndex}>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        p: 3,
                        mt: 3,
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {field.question}
                      </Typography>
                      {renderAnswerOptions(field, fieldIndex)}
                    </Box>
                  </Grid>
                ))}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
              >
                Submit Responses
              </Button>
            </Box>
          </Grid>
          <Dialog open={successPopup} onClose={handleClosePopup}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                Your response has been successfully recorded.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePopup} color="primary">
                Submit another response
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SharedForm;
