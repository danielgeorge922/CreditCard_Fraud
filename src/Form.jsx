import React, { useState } from "react";
import { Button, styled, TextField } from "@mui/material";

const StyledTextField = styled(TextField)({
  margin: "1rem",
  width: "300px",
});

const Form = ({ handleClose, handleAddRow }) => {
  const [transactionId, setTransactionId] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [merchant, setMerchant] = useState("");
  const [fraudStatus, setFraudStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRow = {
      transactionId,
      date,
      amount,
      location,
      time,
      merchant,
      fraudStatus,
      className: 'new-row',  // Add a class to highlight the new row
    };
    handleAddRow(newRow); // Add the new row to the table
    handleClose(); // Close the modal on form submission
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <StyledTextField
        label="Transaction ID"
        variant="filled"
        required
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />
      <StyledTextField
        label="Date"
        variant="filled"
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <StyledTextField
        label="Amount"
        variant="filled"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <StyledTextField
        label="Location"
        variant="filled"
        required
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <StyledTextField
        label="Time"
        variant="filled"
        required
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <StyledTextField
        label="Merchant"
        variant="filled"
        required
        value={merchant}
        onChange={(e) => setMerchant(e.target.value)}
      />
      
      <div>
        <Button variant="contained" sx={{ margin: "2rem" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ margin: "2rem" }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
