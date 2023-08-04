import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewResponses = () => {
  const { formId } = useParams();
  const [responsesData, setResponsesData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/forms/${formId}/responses`)
      .then((res) => {
        setResponsesData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching form responses: ", err);
      });
  }, [formId]);

  const renderResponse = (response, index) => {
    return (
      <Grid item xs={12} key={index}>
        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            p: 3,
            mt: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Response {index + 1}
          </Typography>
          {response.responses.map((questionResponse, questionIndex) => (
            <Typography key={questionIndex} gutterBottom>
              <strong>{questionResponse.question}:</strong>{" "}
              {Array.isArray(questionResponse.response)
                ? questionResponse.response.join(", ")
                : questionResponse.response}
            </Typography>
          ))}
        </Box>
      </Grid>
    );
  };

  return (
    <Box mt={0}>
      {/* <Typography variant="h4" gutterBottom>
        Responses
      </Typography> */}
      <Grid container spacing={0}>
        {responsesData ? (
          responsesData.responses.map((response, index) =>
            renderResponse(response, index)
          )
        ) : (
          <Typography>Loading responses...</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ViewResponses;
