import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Grid, Card, CardContent, Typography } from '@mui/material';

// Dummy data for the stock charts
const stockPriceData = [
  { day: 'Mon', price: 150 },
  { day: 'Tue', price: 160 },
  { day: 'Wed', price: 158 },
  { day: 'Thu', price: 162 },
  { day: 'Fri', price: 170 },
];

const volumeData = [
  { day: 'Mon', volume: 12000 },
  { day: 'Tue', volume: 15000 },
  { day: 'Wed', volume: 10000 },
  { day: 'Thu', volume: 13000 },
  { day: 'Fri', volume: 17000 },
];

const categoryDistributionData = [
  { name: 'Technology', value: 45 },
  { name: 'Healthcare', value: 25 },
  { name: 'Finance', value: 20 },
  { name: 'Energy', value: 10 },
];

// Colors for the Pie Chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StockModel = () => {
  return (
    <div>
      <Grid container spacing={3}>
        {/* Line Chart for Stock Price Over Time */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Stock Price Over Time</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockPriceData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart for Daily Volume of Trades */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Daily Volume of Trades</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={volumeData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="volume" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart for Stock Category Distribution */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Stock Category Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default StockModel;
