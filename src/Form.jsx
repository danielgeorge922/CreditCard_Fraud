import React, { useState } from "react";
import { Button, styled, TextField } from "@mui/material";
import axios from "axios";  // Import Axios

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

  const handleSampleData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/sample_data');
      const sample = response.data;

      // Populate the form fields with sample data
      setTransactionId(sample.transactionId);
      setDate(sample.date);
      setTime(sample.time);
      setAmount(sample.amount);
      setLocation(sample.location);
      setMerchant(sample.merchant);

    } catch (error) {
      console.error("Error fetching sample data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the features array with exactly 30 elements
    const features = [
        parseFloat(time),           // 1st feature: time
        ...Array(26).fill(0),       // 2nd to 27th features: placeholders (V1-V26)
        parseFloat(amount),         // 28th feature: amount
        0,                          // 29th feature: another placeholder
        0                           // 30th feature: another placeholder
    ];

    try {
        const response = await axios.post('http://127.0.0.1:5000/predict_keras', { features }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setFraudStatus(response.data.prediction === 1 ? "Fraudulent" : "Legitimate");

        const newRow = {
            transactionId,
            date,
            amount,
            location,
            time,
            merchant,
            fraudStatus: response.data.prediction === 1 ? "Fraudulent" : "Legitimate",
            className: 'new-row',
        };

        handleAddRow(newRow);
        handleClose();

    } catch (error) {
        console.error("There was an error making the prediction!", error);
    }
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
      <Button variant="outlined" color="primary" onClick={handleSampleData} sx={{ margin: "1rem" }}>
        Fill with Sample Data
      </Button>
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
