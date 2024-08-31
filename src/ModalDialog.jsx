import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import Form from "./Form";

const ModalDialog = ({ open, handleClose, handleAddRow }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Form handleClose={handleClose} handleAddRow={handleAddRow} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
