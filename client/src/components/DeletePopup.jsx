import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeletePopup = () => {
  const navigate = useNavigate();
  const { formId } = useParams();

  const handleClose = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/forms/${formId}`)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this form?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="button" onClick={handleDelete} color="primary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopup;
