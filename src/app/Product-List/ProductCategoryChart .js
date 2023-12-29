// src/components/ProductCategoryChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { fetchProductsAsync } from './ProductListSlice';


const ProductCategoryChart = () => {
  const dispatch = useDispatch()
  const products = dispatch(fetchProductsAsync())
  const item = [products]
  console.log(item ,"item")
  // Extract all unique categories from the products
  const uniqueCategories = [...new Set(products.map((index) => index.category))];

  console.log(uniqueCategories,"unique")
  // Count the number of products in each category
  const categoryCounts = uniqueCategories.map((category) => {
    return products.filter((product) => product.category === category).length;
  });

  const categoryChartData = {
    labels: uniqueCategories,
    datasets: [
      {
        label: 'Product Categories',
        data: categoryCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <div className="chart">
        <h2>Product Categories</h2>
        <Bar data={categoryChartData} />
      </div>
    </div>
  );
};

export default ProductCategoryChart;
