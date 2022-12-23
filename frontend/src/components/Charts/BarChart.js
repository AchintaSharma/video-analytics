import React from "react";
import { Bar } from "react-chartjs-2";
import { BarElement, CategoryScale, LinearScale, Chart as ChartJS, } from "chart.js/auto";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale
)

const options = {
  responsive: true,
}
// TODO: Chart resposiveness issue upon decrease. Check.

function BarChart({ chartData }) {
  return <Bar data={chartData} options={options} />;
}

export default BarChart;