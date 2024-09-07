import React from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Grid, Card, CardContent, Typography } from '@mui/material';

// Dummy data for the charts
const incomeExpenseData = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 5000, expenses: 2800 },
  { month: 'Apr', income: 4500, expenses: 2400 },
  { month: 'May', income: 5200, expenses: 2200 },
  { month: 'Jun', income: 6000, expenses: 3500 },
];

const categoryData = [
  { name: 'Rent', value: 3000 },
  { name: 'Groceries', value: 1000 },
  { name: 'Entertainment', value: 700 },
  { name: 'Utilities', value: 500 },
  { name: 'Transport', value: 400 },
];

const savingsData = [
  { month: 'Jan', savings: 2000 },
  { month: 'Feb', savings: 2500 },
  { month: 'Mar', savings: 3000 },
  { month: 'Apr', savings: 3200 },
  { month: 'May', savings: 3800 },
  { month: 'Jun', savings: 4500 },
];

// Color palette for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347'];

const FinanceDashboard = () => {
  return (
    <div>
      
      <Grid container spacing={3}>
        {/* Bar Chart for Income vs Expenses */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Monthly Income vs Expenses</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={incomeExpenseData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" fill="#8884d8" />
                  <Bar dataKey="expenses" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart for Spending by Category */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Spending by Category</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart for Savings Progress */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Savings Progress</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={savingsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="savings" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default FinanceDashboard;
