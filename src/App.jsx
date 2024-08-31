import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalDialog from './ModalDialog';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StoreIcon from '@mui/icons-material/Store';

const getStatusColor = (value) => {
  switch (value) {
    case 'Fraudulent':
      return 'bg-red-500 text-white'; // Red background for Fraudulent transactions
    case 'Legitimate':
      return 'bg-green-500 text-white'; // Green background for Legitimate transactions
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
      customBodyRender: (value) => (
        value ? (
          <p className={`capitalize px-3 py-1 inline-flex items-center rounded-full ${getStatusColor(value)}`}>
            {getStatusIcon(value)}<span style={{ whiteSpace: 'nowrap' }}>{value}</span>
          </p>
        ) : null
      ),
    },
  },
];

const options = {
  selectableRows: false,
  rowsPerPage: 8,
  rowsPerPageOptions: [5,8,10],
  setTableProps: () => ({
    size: 'small',
    sx: {
      '& .MuiTableRow-root.new-row': {
        backgroundColor: '#3b4a5a', // Darker background color for new rows
        // border: '2px solid #2b6dd6', // Border color for new rows
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

  const App = () => {
    const location = useLocation();
    const [data, setData] = useState(initialData);
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleAddRow = (newRow) => {
      newRow.isNew = true; // Mark the new row as 'new'
      setData((prevData) => [{ ...newRow, isNew: true }, ...prevData]);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 py-10">
        <div className="w-full max-w-7xl h-3/5">
          <ThemeProvider theme={getMuiTheme()}>
            <div className="flex items-center justify-between">
              <Tabs
                value={location.pathname}
                textColor="inherit"
                indicatorColor="secondary"
                sx={{
                  '& .MuiTab-root': {
                    color: 'white',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <Tab label="Credit Card Fraud Detection" value="/" component={Link} to="/" />
              </Tabs>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#2b6dd6',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#89b5fa',
                  },
                }}
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Add a Row
              </Button>
            </div>
  
            <Routes>
              <Route path="/" element={
                  <MUIDataTable
                  title={"Credit Card Transactions"}
                  data={data.map(row => Object.values(row))}
                  columns={columns}
                  options={{
                    ...options,
                    setRowProps: (row, dataIndex) => {
                      return {
                        className: data[dataIndex]?.isNew ? 'new-row' : '', // Apply the 'new-row' class to new rows
                      };
                    },
                  }}
                />
              } />
            </Routes>
  
            <ModalDialog open={open} handleClose={handleClose} handleAddRow={handleAddRow} />
  
          </ThemeProvider>
        </div>
      </div>
    );
  };
  
  export default App;