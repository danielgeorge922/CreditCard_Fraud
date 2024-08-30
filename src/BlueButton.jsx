import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const BlueButton = () => {
  return (
    <IconButton
      sx={{
        backgroundColor: 'blue',          // Blue background
        color: 'white',                   // White icon color
        '&:hover': {
          backgroundColor: 'darkblue',    // Darker blue on hover
        },
        borderRadius: '50%',              // Circular shape
        padding: '12px',                  // Padding to adjust the button size
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Subtle shadow effect
      }}
    >
      <AddIcon fontSize="large" />
    </IconButton>
  );
};

export default BlueButton;
