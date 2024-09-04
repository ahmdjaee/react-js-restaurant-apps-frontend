import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [300, 500, 400, 700, 800, 900],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
const MyChart = () => {
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MyChart;
  