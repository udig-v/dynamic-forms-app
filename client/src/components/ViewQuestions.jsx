import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewQuestions = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    fields: [],
  });
  const id = useParams().formId;
  const [responses, setResponses] = useState([]);

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

  const handleSelectChange = (event, fieldIndex) => {
    const { name, value } = event.target;
    setResponses((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[fieldIndex] = value;
      return updatedResponses;
    });
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
            disabled
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
    <Grid container spacing={0} justifyContent="center">
      <Box component="form" sx={{ mt: 0, width: "100%" }} noValidate>
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
      </Box>
    </Grid>
  );
};

export default ViewQuestions;
