import React from "react";

import { Container, Divider, Grid, Typography } from "@mui/material";

function Home() {
  return (
    <Container component="main" maxWidth="lg">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" align="center" sx={{ marginBottom: 5 }}>
                <b>Create</b> dynamic web{" "}
                <span style={{ fontFamily: "monospace" }}>FORMS</span> without
                coding
              </Typography>
            </Grid>
            <Grid item xs={12} md={1}>
              <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography
                variant="h6"
                color="black"
                align="center"
                sx={{ marginBottom: 2 }}
              >
                With just a few clicks, you can design custom forms tailored to
                your specific needs, whether it's gathering customer feedback,
                conducting surveys, processing job applications, or collecting
                event registrations.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
