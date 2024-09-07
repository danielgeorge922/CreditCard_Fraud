import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDialog from './ModalDialog';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StoreIcon from '@mui/icons-material/Store';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InsightsDialog from './InsightsDialog';
import StockModel from './StockModel';
import FinanceDashboard from './FinanceDashboard';

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

const pageTransition = {
  type: "tween",  // You can use "spring" for a different effect
  duration: 0.5   // Adjust the duration to your liking
};

// Extended dummy data for Credit Card Fraud Detection with 20 rows
const initialData = [
  {
    transactionId: 'TXN001',
    date: '01/15/2023',
    amount: '$100.00',
    location: 'New York, USA',
    time: '12:34 PM',
    merchant: 'Amazon',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN002',
    date: '02/20/2023',
    amount: '$450.50',
    location: 'Los Angeles, USA',
    time: '02:15 PM',
    merchant: 'Best Buy',
    fraudStatus: 'Fraudulent',
  },
  {
    transactionId: 'TXN003',
    date: '03/05/2023',
    amount: '$10.00',
    location: 'Miami, USA',
    time: '05:23 AM',
    merchant: 'Starbucks',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN004',
    date: '04/22/2023',
    amount: '$1234.99',
    location: 'San Francisco, USA',
    time: '09:11 PM',
    merchant: 'Apple Store',
    fraudStatus: 'Fraudulent',
  },
  {
    transactionId: 'TXN005',
    date: '05/18/2023',
    amount: '$56.78',
    location: 'Chicago, USA',
    time: '10:45 AM',
    merchant: 'Walmart',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN006',
    date: '06/01/2023',
    amount: '$230.10',
    location: 'Houston, USA',
    time: '01:30 PM',
    merchant: 'Target',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN007',
    date: '07/08/2023',
    amount: '$720.00',
    location: 'Phoenix, USA',
    time: '04:55 PM',
    merchant: 'Home Depot',
    fraudStatus: 'Fraudulent',
  },
  {
    transactionId: 'TXN008',
    date: '08/12/2023',
    amount: '$199.99',
    location: 'Las Vegas, USA',
    time: '07:20 PM',
    merchant: 'Walmart',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN009',
    date: '09/19/2023',
    amount: '$89.00',
    location: 'Dallas, USA',
    time: '11:10 AM',
    merchant: 'Costco',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN010',
    date: '10/30/2023',
    amount: '$580.45',
    location: 'San Diego, USA',
    time: '02:45 PM',
    merchant: 'Best Buy',
    fraudStatus: 'Fraudulent',
  },
  {
    transactionId: 'TXN011',
    date: '11/07/2023',
    amount: '$75.00',
    location: 'Portland, USA',
    time: '03:22 PM',
    merchant: 'Starbucks',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN012',
    date: '12/15/2023',
    amount: '$320.89',
    location: 'Seattle, USA',
    time: '09:15 AM',
    merchant: 'Apple Store',
    fraudStatus: 'Fraudulent',
  },
  {
    transactionId: 'TXN013',
    date: '01/05/2024',
    amount: '$210.60',
    location: 'Boston, USA',
    time: '01:10 PM',
    merchant: 'Target',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN014',
    date: '02/18/2024',
    amount: '$34.50',
    location: 'Denver, USA',
    time: '08:50 AM',
    merchant: 'Walmart',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN015',
    date: '03/25/2024',
    amount: '$1,234.00',
    location: 'Austin, USA',
    time: '12:30 PM',
    merchant: 'Apple Store',
    fraudStatus: 'Fraudulent',
  },
  {
    transactionId: 'TXN016',
    date: '04/07/2024',
    amount: '$290.75',
    location: 'Orlando, USA',
    time: '04:22 PM',
    merchant: 'Home Depot',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN017',
    date: '05/12/2024',
    amount: '$19.99',
    location: 'San Antonio, USA',
    time: '06:40 PM',
    merchant: 'Starbucks',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN018',
    date: '06/24/2024',
    amount: '$450.00',
    location: 'Indianapolis, USA',
    time: '10:15 AM',
    merchant: 'Best Buy',
    fraudStatus: 'Fraudulent',
  },
  {
    transactionId: 'TXN019',
    date: '07/14/2024',
    amount: '$75.50',
    location: 'Columbus, USA',
    time: '09:00 AM',
    merchant: 'Target',
    fraudStatus: 'Legitimate',
  },
  {
    transactionId: 'TXN020',
    date: '08/20/2024',
    amount: '$650.99',
    location: 'Charlotte, USA',
    time: '02:30 PM',
    merchant: 'Walmart',
    fraudStatus: 'Fraudulent',
  },
];





const App = () => {
  const location = useLocation();
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  const pageVariants = {
    initial: { opacity: 0, x: "-100vw" }, // Off-screen to the left
    in: { opacity: 1, x: 0 },            // In-screen (centered)
    out: { opacity: 0, x: "100vw" }      // Off-screen to the right
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInsightsClose = () => {
    setInsightsOpen(false);
    setSelectedTransaction(null); // Clear the selected transaction data
  };

  const handleAddRow = (newRow) => {
    newRow.isNew = true; // Mark the new row as 'new'
    setData((prevData) => [{ ...newRow, isNew: true }, ...prevData]);
  };

  const handleDeleteRow = (rowIndex) => {
    const newData = [...data];
    newData.splice(rowIndex, 1);
    setData(newData);
  };

  const handleViewInsights = (transaction) => {
    setSelectedTransaction(transaction);
    setInsightsOpen(true);
  };

  const columns = [
    {
      name: 'Transaction ID',
      label: <><ReceiptIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: '#9E9E9E' }} /> Transaction ID</>,
    },
    {
      name: 'Date',
      label: <><CalendarTodayIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: '#42A5F5' }} /> Date</>,
    },
    {
      name: 'Amount',
      label: <><AttachMoneyIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: '#66BB6A' }} /> Amount</>,
    },
    {
      name: 'Location',
      label: <><LocationOnIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: '#26C6DA' }} /> Location</>,
    },
    {
      name: 'Time',
      label: <><AccessTimeIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: '#FFA726' }} /> Time</>,
    },
    {
      name: 'Merchant',
      label: <><StoreIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: '#8D6E63' }} /> Merchant</>,
    },
    {
      name: 'Fraud Status',
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <div className="flex items-center">
              <p className={`capitalize px-3 py-1 inline-flex items-center rounded-full ${getStatusColor(value)}`}>
                {getStatusIcon(value)}<span style={{ whiteSpace: 'nowrap' }}>{value}</span>
              </p>
              {data[tableMeta.rowIndex]?.isNew && (
                <div className="flex ml-2">
                  <Tooltip title="View Insights">
                    <IconButton onClick={() => handleViewInsights(data[tableMeta.rowIndex])}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Row">
                    <IconButton 
                      onClick={() => handleDeleteRow(tableMeta.rowIndex)} 
                      sx={{ color: 'red' , mr: -6}}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          );
        },
      },
    },
  ];

  const options = {
    selectableRows: false,
    rowsPerPage: 8,
    rowsPerPageOptions: [5, 8, 10],
    setTableProps: () => ({
      size: 'small',
      sx: {
        '& .MuiTableRow-root.new-row': {
          backgroundColor: '#3b4a5a',
        },
      },
    }),
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: 'Poppins',
      },
      palette: {
        background: {
          paper: "#1e293b",
          default: "#0f172a"
        },
        mode: 'dark',
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 4px",
              backgroundColor: "#1e293b",
              color: "#e2e8f0",
            },
            body: {
              padding: "12px 15px",
              color: "#e2e8f0"
            },
          }
        },
        MuiTableHead: {
          styleOverrides: {
            root: {
              backgroundColor: "#1e293b",
            },
          }
        },
      }
    });

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 py-10">
        <div className="w-full max-w-7xl h-4/5">
          <ThemeProvider theme={getMuiTheme()}>
            <div className="flex items-center justify-between">
                <Tabs
                  value={location.pathname}
                  textColor="inherit"
                  indicatorColor="secondary"
                  sx={{
                    '& .MuiTab-root': { color: 'white' },
                    '& .MuiTabs-indicator': { backgroundColor: 'white' },
                  }}
                >
                  
                  <Tab label="Dashboard" value="/finance" component={Link} to="/finance" />
                  <Tab label="Credit Card Fraud Detection" value="/" component={Link} to="/" />
                  <Tab label="Stock Model" value="/stock-model" component={Link} to="/stock-model" />
                </Tabs>

              <Button 
                variant="contained"
                sx={{
                  backgroundColor: '#2b6dd6',
                  color: 'white',
                  '&:hover': { backgroundColor: '#89b5fa' },
                }}
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
              >
                Add a Row
              </Button>
            </div>
  
            {/* Add AnimatePresence for exit transitions */}
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Motion Div for Route Animation */}
                <Route path="/" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <MUIDataTable
                      title={"Credit Card Transactions"}
                      data={data.map(row => Object.values(row))}
                      columns={columns}
                      options={options}
                    />
                  </motion.div>
                } />

                <Route path="/finance" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <FinanceDashboard />
                  </motion.div>
                } />

                <Route path="/stock-model" element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <StockModel />
                  </motion.div>
                } />
              </Routes>
            </AnimatePresence>
              
            <ModalDialog open={open} handleClose={() => setOpen(false)} handleAddRow={handleAddRow} />
            <InsightsDialog open={insightsOpen} handleClose={() => setInsightsOpen(false)} transaction={selectedTransaction} />
  
          </ThemeProvider>
        </div>
      </div>
    );
  };
  
  export default App;