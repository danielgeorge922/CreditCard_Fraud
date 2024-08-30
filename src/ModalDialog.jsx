import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import Form from './Form';  // Import the form that should appear in the modal

const ModalDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Form handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
