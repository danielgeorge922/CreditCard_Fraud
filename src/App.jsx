import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ModalDialog from './ModalDialog'; // Import the ModalDialog component

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

// Extended dummy data for Credit Card Fraud Detection with 20 rows
const creditCardData = [
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
  'Transaction ID',
  'Date',
  'Amount',
  'Location',
  'Time',
  'Merchant',
  {
    name: 'Fraud Status',
    options: {
      customBodyRender: (value) => (
        value ? (
          <p className={`capitalize px-3 py-1 inline-block rounded-full ${getStatusColor(value)}`}>
            {value}
          </p>
        ) : null
      ),
    },
  },
];

const options = {
  selectableRows: false,
  rowsPerPage: 8,
  rowsPerPageOptions: [5, 10, 20],
  setTableProps: () => ({
    size: 'small', // This will reduce the row height slightly to make the spacing more visible
    sx: {
      '& .MuiTableRow-root': {
        marginBottom: '8px', // Add space between rows
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
            backgroundColor: "#1e293b", // Ensure header background matches the rest of the table
            color: "#e2e8f0", // Ensure header text color matches the rest of the table
          },
          body: {
            padding: "12px 15px", // Increase padding for body cells to add more space
            color: "#e2e8f0"
          },
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: "#1e293b", // Ensure the entire header row background matches the rest of the table
          },
        }
      },
    }
  });

const CreditCardDataTable = () => (
  <MUIDataTable
    title={"Credit Card Transactions"}
    data={creditCardData.map((row) => Object.values(row))}
    columns={columns}
    options={options}
  />
);

const App = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 py-10">
      <div className="w-full max-w-7xl h-3/5"> {/* Make the table wider */}
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
            {/* Add button */}

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2b6dd6', // Set your desired background color here
                color: 'white',             // Text color
                '&:hover': {
                  backgroundColor: '#89b5fa',  // Hover color
                },
              }}
              startIcon={<AddIcon />} // Add the plus icon at the start
              onClick={handleOpen} // Open the modal on button click
            >
              Add a Row
            </Button>

          </div>

          <Routes>
            <Route path="/" element={<CreditCardDataTable />} />
          </Routes>

          {/* Modal Dialog for Form */}
          <ModalDialog open={open} handleClose={handleClose} />

        </ThemeProvider>
      </div>
    </div>
  );
};

export default App;