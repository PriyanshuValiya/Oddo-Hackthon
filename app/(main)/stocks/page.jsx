'use client';

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const Stock = () => {
  const [stockSymbol, setStockSymbol] = useState("IRCTC");
  const [stockData, setStockData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    setStockData(null);
    setHistoricalData([]);
    setDate(null);

    try {
      const response = await fetch(`/api/stock?symbol=${stockSymbol.toUpperCase()}&start=${startDate}&end=${endDate}`);

      if (!response.ok) {
        throw new Error(`Error fetching stock data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      if (data?.equityDetails) {
        setStockData(data.equityDetails);
        setDate(data.equityDetails.metadata.lastUpdateTime || "Unknown Date");
        setHistoricalData(data.historicalData);
      } else {
        setError("No data found for this stock.");
      }
    } catch (err) {
      setError("Failed to fetch stock data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-4 text-center">Stock Price Tracker</h2>

      {/* Stock Symbol Input */}
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Stock Symbol (e.g., IRCTC)"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value)}
      />

      {/* Date Inputs */}
      <div className="flex justify-between space-x-2 mb-4">
        <div className="flex flex-col w-1/2">
          <label className="text-sm text-gray-600">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-sm text-gray-600">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Fetch Data Button */}
      <button
        onClick={fetchStockData}
        className="w-full bg-blue-500 text-white px-4 py-3 rounded-md mb-4 hover:bg-blue-600 transition duration-200"
      >
        Get Stock Data
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="text-gray-500 text-center mt-2">Loading...</p>}

      {/* Stock Data Display */}
      {stockData && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100 shadow-md">
          <h3 className="text-lg font-semibold text-blue-700">{stockSymbol.toUpperCase()}</h3>
          <p className="text-gray-800">
            <strong>Last Updated:</strong> {date}
          </p>
          <p className="text-gray-800">
            <strong>Open Price:</strong> ₹{stockData.priceInfo.open}
          </p>
          <p className="text-gray-800">
            <strong>Day High:</strong> ₹{stockData.priceInfo.dayHigh}
          </p>
          <p className="text-gray-800">
            <strong>Day Low:</strong> ₹{stockData.priceInfo.dayLow}
          </p>
          <p className="text-gray-800">
            <strong>Last Price:</strong> ₹{stockData.priceInfo.lastPrice}
          </p>
          <p className="text-gray-800">
            <strong>Previous Close:</strong> ₹{stockData.priceInfo.previousClose}
          </p>
          <p className={`text-lg font-bold mt-2 ${stockData.priceInfo.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stockData.priceInfo.change >= 0 ? `🟢 +${stockData.priceInfo.change.toFixed(2)}` : `🔴 ${stockData.priceInfo.change.toFixed(2)}`}
            ({stockData.priceInfo.pChange.toFixed(2)}%)
          </p>
        </div>
      )}

      {/* Stock Chart */}
      {historicalData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
            Stock Price Trend
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={historicalData}>
              {/* Background Grid */}
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />

              {/* X-Axis - Rotated for better readability */}
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: '#374151', fontWeight: 'bold' }} 
                tickFormatter={(tick) => tick.slice(0, 7)} 
                angle={-15} 
                dy={5}
              />

              {/* Y-Axis - With custom ticks & colors */}
              <YAxis 
                tick={{ fontSize: 12, fill: '#374151', fontWeight: 'bold' }} 
                tickLine={false} 
                axisLine={false} 
              />

              {/* Tooltip - Better visibility & styling */}
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#F9FAFB', 
                  borderRadius: '8px', 
                  border: '1px solid #D1D5DB', 
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.15)', 
                  padding: '8px' 
                }} 
                itemStyle={{ fontSize: '14px', color: '#4F46E5' }} 
              />

              {/* Legend - Styled for clarity */}
              <Legend 
                verticalAlign="top" 
                height={36} 
                wrapperStyle={{ fontSize: '14px', color: '#4B5563', fontWeight: 'bold' }} 
              />

              {/* Line Chart - Smooth curve, bold stroke, no dots */}
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#4F46E5" 
                strokeWidth={3} 
                dot={false} 
                activeDot={{ r: 6, fill: '#4F46E5', stroke: 'white', strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Stock;
