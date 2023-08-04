import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#262626",
      hover: "#555555",
    },
  },
});

const FormCard = (props) => {
  const form = props.form;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            width: "100%",
          }}
        >
          <Grid item key={form.id}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" gutterBottom>
                    {form.title}
                  </Typography>
                  <IconButton
                    aria-controls="form-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="form-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      component={Link}
                      to={`/dashboard/${form._id}`}
                      onClick={handleMenuClose}
                    >
                      <DynamicFormIcon fontSize="small" />
                      View
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to={`/dashboard/${form._id}/edit`}
                      onClick={handleMenuClose}
                    >
                      <EditIcon fontSize="small" />
                      Edit
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to={`/dashboard/${form._id}/delete`}
                      onClick={handleMenuClose}
                    >
                      <DeleteIcon fontSize="small" />
                      Delete
                    </MenuItem>
                  </Menu>
                </Box>
                <Typography variant="body1" color="textSecondary">
                  {form.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default FormCard;
