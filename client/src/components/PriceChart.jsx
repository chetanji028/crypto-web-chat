 
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Title } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title);

const PriceChart = ({ data }) => {
  const chartData = {
    labels: data.map((point) => point.x),
    datasets: [
      {
        label: 'Price (USD)',
        data: data.map((point) => point.y),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <Line data={chartData} options={{ responsive: true, scales: { x: { type: 'time' } } }} />
    </div>
  );
};

export default PriceChart;