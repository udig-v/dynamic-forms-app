import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#262626",
      hover: "#555555",
    },
  },
});

const EditForm = () => {
  const navigate = useNavigate();
  const { formId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([
    {
      question: "",
      type: "",
      answerOptions: [],
    },
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/forms/${formId}`)
      .then((res) => {
        const formData = res.data.form;
        setTitle(formData.title);
        setDescription(formData.description);
        setFields(formData.fields);
      })
      .catch((err) => {
        console.log("Error fetching form data:", err);
      });
  }, [formId]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFieldChange = (e, fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].question = e.target.value;
    setFields(updatedFields);
  };

  const handleFieldTypeSelection = (e, fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].type = e.target.value;
    setFields(updatedFields);
  };

  const handleAnswerOptionsChange = (e, fieldIndex, answerIndex) => {
    const { value } = e.target;

    const updatedFields = [...fields];
    updatedFields[fieldIndex].answerOptions[answerIndex] = value;
    setFields(updatedFields);
  };

  const addNewField = () => {
    setFields([...fields, { question: "", type: "", answerOptions: [] }]);
  };

  const removeField = (fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields.splice(fieldIndex, 1);
    setFields(updatedFields);
  };

  const addNewAnswerOption = (fieldIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].answerOptions.push("");
    setFields(updatedFields);
  };

  const removeAnswerOption = (fieldIndex, answerIndex) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].answerOptions.splice(answerIndex, 1);
    setFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: title,
      description: description,
      fields: fields,
    };

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/forms/${formId}`,
        formData
      );
      console.log("Form data updated successfully", data);

      if (data) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error updating form data:", err);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
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
            Edit form
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="form-title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  value={title}
                  type="text"
                  autoFocus
                  onChange={handleTitleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="form-description"
                  name="description"
                  fullWidth
                  id="description"
                  label="Description"
                  value={description}
                  type="text"
                  autoFocus
                  onChange={handleDescriptionChange}
                />
              </Grid>
              {fields.map((field, fieldIndex) => (
                <Grid item xs={12} key={fieldIndex}>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      p: 3,
                      mt: 3,
                      position: "relative",
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={8} sx={{ marginBottom: "8px" }}>
                        <TextField
                          type="text"
                          name={`question-${fieldIndex}`}
                          required
                          fullWidth
                          label={`Question ${fieldIndex + 1}`}
                          value={field.question}
                          onChange={(e) => handleFieldChange(e, fieldIndex)}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl fullWidth>
                          <InputLabel id={`fieldType-label-${fieldIndex}`}>
                            Choose field type
                          </InputLabel>
                          <Select
                            labelId={`fieldType-label-${fieldIndex}`}
                            id={`fieldType-${fieldIndex}`}
                            value={field.type}
                            label="Choose field type"
                            onChange={(e) =>
                              handleFieldTypeSelection(e, fieldIndex)
                            }
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value="multipleChoice">
                              Multiple Choice
                            </MenuItem>
                            <MenuItem value="checkbox">Checkbox</MenuItem>
                            <MenuItem value="dropdown">Dropdown</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    {["multipleChoice", "checkbox", "dropdown"].includes(
                      field.type
                    ) && (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {field.answerOptions.map((option, answerIndex) => (
                            <Box
                              key={answerIndex}
                              display="flex"
                              alignItems="center"
                            >
                              <TextField
                                size="small"
                                variant="outlined"
                                name={`answerOptions-${fieldIndex}-${answerIndex}`}
                                value={option}
                                onChange={(e) =>
                                  handleAnswerOptionsChange(
                                    e,
                                    fieldIndex,
                                    answerIndex
                                  )
                                }
                              />
                              <Tooltip title="Delete answer">
                                <IconButton
                                  onClick={() =>
                                    removeAnswerOption(fieldIndex, answerIndex)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          ))}
                        </Box>
                        <Button
                          type="button"
                          variant="outlined"
                          sx={{ mt: 1, borderRadius: "10px" }}
                          onClick={() => addNewAnswerOption(fieldIndex)}
                        >
                          Add New Answer
                        </Button>
                      </>
                    )}

                    <Tooltip title="Delete question" placement="top-end" arrow>
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                        size="small"
                        onClick={() => removeField(fieldIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
                  onClick={addNewField}
                >
                  Add New Question
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "10px" }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditForm;
