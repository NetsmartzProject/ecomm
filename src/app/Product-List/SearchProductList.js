// import React, { useEffect } from 'react';
// import Navbar from '../../navbar/Navbar';
// import Chart from 'chart.js/auto';

// const getStyle = (variableName) => {
//   // Define your getStyle function here to retrieve CSS variables or colors
//   // You can use a CSS-in-JS library or directly access CSS variables
//   // For example, if you are using styled-components:
//   // return `var(--${variableName})`;
// };

// const SearchProductList = () => {
//   useEffect(() => {
//     // Initialize chart data and options here
//     const chartData = {
//       labels: ["January", "February", "March", "April", "May", "June", "July"],
//       datasets: [
//         {
//           label: "My First dataset",
//           backgroundColor: "rgba(220, 220, 220, 0.2)",
//           borderColor: "rgba(220, 220, 220, 1)",
//           pointBackgroundColor: "rgba(220, 220, 220, 1)",
//           pointBorderColor: "#fff",
//           data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
//         },
//         {
//           label: "My Second dataset",
//           backgroundColor: "rgba(151, 187, 205, 0.2)",
//           borderColor: "rgba(151, 187, 205, 1)",
//           pointBackgroundColor: "rgba(151, 187, 205, 1)",
//           pointBorderColor: "#fff",
//           data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
//         },
//       ],
//     };

//     const chartOptions = {
//       plugins: {
//         legend: {
//           labels: {
//             color: getStyle('--cui-body-color'),
//           },
//         },
//       },
//       scales: {
//         x: {
//           type: 'category', // Use 'category' scale for labels
//           grid: {
//             color: getStyle('--cui-border-color-translucent'),
//           },
//           ticks: {
//             color: getStyle('--cui-body-color'),
//           },
//         },
//         y: {
//           grid: {
//             color: getStyle('--cui-border-color-translucent'),
//           },
//           ticks: {
//             color: getStyle('--cui-body-color'),
//           },
//         },
//       },
//     };

//     // Create the chart instance here
//     const ctx = document.getElementById('myLineChart');
//     const myChart = new Chart(ctx, {
//       type: 'line',
//       data: chartData,
//       options: chartOptions,
//     });

//     // Cleanup the chart when the component unmounts
//     return () => {
//       myChart.destroy();
//     };
//   }, []); // The empty dependency array ensures this effect runs once

//   return (
//     <div>
//       <Navbar />
//       <div>
//         <h2>My Line Chart</h2>
//         <canvas id="myLineChart" width="400" height="200"></canvas>
//       </div>
//     </div>
//   );
// };

// export default SearchProductList;



import React from 'react'
import Searchbar from '../../navbar/Searchbar'
import Navbar from '../../navbar/Navbar'

const SearchProductList = () => {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <Searchbar/>
    </div>
  )
}

export default SearchProductList


