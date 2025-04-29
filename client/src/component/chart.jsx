import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function Chart({ data }) {
  return (
    <LineChart width={500} height={230} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis
        tickCount={5} // Number of ticks to display
        domain={[0, 20]} // Set the domain (range) of the Y-axis
        ticks={[0, 5, 10, 15, 20]} // Custom tick values
      />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="missedChats"
        stroke="#ff7300"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
