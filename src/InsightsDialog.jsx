import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import DownloadIcon from '@mui/icons-material/Download';

// These functions should match the ones used in your table component
const getStatusColor = (value) => {
  switch (value) {
    case 'Fraudulent':
      return 'bg-red-500 text-white';
    case 'Legitimate':
      return 'bg-green-500 text-white';
    default:
      return '';
  }
};

const getStatusIcon = (value) => {
  switch (value) {
    case 'Fraudulent':
      return <ErrorIcon style={{ color: 'white', marginRight: '5px', fontSize: '16px' }} />;
    case 'Legitimate':
      return <CheckCircleIcon style={{ color: 'white', marginRight: '5px', fontSize: '16px' }} />;
    default:
      return null;
  }
};

const downloadJSON = (data, filename = 'features.json') => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const InsightsDialog = ({ open, handleClose, transaction }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      if (!transaction) return;

      try {
        setLoading(true);
        setError(null);

        const features = transaction.features || [
          parseFloat(transaction.time),
          ...Array(26).fill(0),
          parseFloat(transaction.amount),
          0,
          0,
        ];

        const response = await axios.post('http://127.0.0.1:5000/predict_keras', { features }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const fraudStatus = response.data.prediction === 1 ? "Fraudulent" : "Legitimate";
        setInsights({
          ...transaction,
          prediction: fraudStatus,
          features,  // Save the features for download
        });
      } catch (err) {
        setError('Failed to fetch model insights');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchInsights();
    }

  }, [open, transaction]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Model Insights
        {insights && (
          <Button 
            onClick={() => downloadJSON(insights.features)} 
            sx={{ position: 'absolute', right: 8, top: 13 }}
            startIcon={<DownloadIcon />}
            variant="outlined"
            color="secondary"
          >
            Download model features json
          </Button>
        )}
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Typography variant="body1">Loading insights...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">{error}</Typography>
        ) : insights ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Transaction ID: {insights.transactionId}</Typography>
              <Divider sx={{ marginY: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Date:</strong> {insights.date}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Merchant:</strong> {insights.merchant}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Location:</strong> {insights.location}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Amount:</strong> ${insights.amount}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"><strong>Time:</strong> {insights.time} (Normalized)</Typography>
            </Grid>
            <Grid item xs={12} container alignItems="center">
                <Typography variant="body1" sx={{ marginRight: 1 }}>
                    <strong>Fraud Status:</strong>
                </Typography>
                <div className={`capitalize px-3 py-1 inline-flex items-center rounded-full ${getStatusColor(insights.prediction)}`}>
                    {getStatusIcon(insights.prediction)}<span>{insights.prediction}</span>
                </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">
                **PLEASE NOTE:** The data and insights shown here are derived from test data that has been anonymized through PCA (Principal Component Analysis) for confidentiality. As a demonstration, this data does not reflect real-world scenarios and should not be used to run the model or derive actionable insights. The features displayed, including V1 through V28, are principal components from PCA, with 'Time' and 'Amount' being the only features not transformed. These insights are intended purely for display purposes.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography 
                variant="h6" 
                color="textPrimary" 
                align="center" 
                sx={{ fontWeight: 'bold', mt: 2 }}
              >
                THE ACTUAL MODEL TRAINING AND AUPRC CAN BE FOUND IN THE `CC_FRAUD.IPYNB` ON MY GITHUB.
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">No insights available.</Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose} variant="contained" color="primary" sx={{ fontSize: '1rem', padding: '10px 20px' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InsightsDialog;
