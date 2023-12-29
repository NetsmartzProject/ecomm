
import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalOrdersAsync, selectTotalOrderes } from '../UserSlice';

const processDataForChart = (orders) => {
  const orderCounts = orders.reduce((acc, order) => {
    const orderDate = new Date(order.orderDate).toLocaleDateString();

    if (!acc[orderDate]) {
      acc[orderDate] = { date: orderDate, count: 0, usernames: [] };
    }

    acc[orderDate].count += 1;
    acc[orderDate].usernames.push(order.user.email); // Assuming the email is the username

    return acc;
  }, {});

  const chartData = Object.values(orderCounts);

  return chartData;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <p style={{ margin: 0, color: '#333' }}>Date: {label}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} style={{ color: entry.color, margin: 0 }}>
            Count: {entry.value}
            <br />
            Users: {entry.payload.usernames.join(', ')}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const UserChart = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectTotalOrderes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTotalOrdersAsync());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const chartData = processDataForChart(orders);

  return (
    <div
      style={{
        margin: '20px',
        background: 'url("https://t4.ftcdn.net/jpg/02/32/92/55/360_F_232925587_st4gM8b3TJHtjjddCIUNyVyFJmZqMmn4.jpg")', // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#fff' }}>User Chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: '#fff' }} />
          <YAxis tick={{ fill: '#fff' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8', r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;
