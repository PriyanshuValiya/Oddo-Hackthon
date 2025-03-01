'use client';

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Stock = () => {
  const [stockSymbol, setStockSymbol] = useState("IRCTC"); // Default stock
  const [stockData, setStockData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Date Range Selection
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]); // Default: Today
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]); // Default: Today

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    setStockData(null);
    setHistoricalData([]);
    setDate(null);

    try {
      const response = await fetch(`/stock?symbol=${stockSymbol.toUpperCase()}&start=${startDate}&end=${endDate}`);

      if (!response.ok) {
        throw new Error(`Error fetching stock data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      if (data?.equityDetails) {
        setStockData(data.equityDetails);
        setDate(data.equityDetails.metadata.lastUpdateTime || "Unknown Date");

        // Update historical data for chart
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Stock Data</h2>

      {/* Stock Symbol Input */}
      <input
        type="text"
        placeholder="Enter Stock Symbol (e.g., IRCTC)"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value)}
        style={{ padding: "8px", marginRight: "10px", borderRadius: "4px" }}
      />

      {/* Date Inputs */}
      <label>Start Date:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label>End Date:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <button onClick={fetchStockData} style={{ padding: "8px", cursor: "pointer" }}>
        Get Stock Data
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Stock Data Display */}
      {stockData && (
        <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", marginTop: "20px" }}>
          <h3>Stock Data for {stockSymbol.toUpperCase()}</h3>
          <p><strong>Last Updated:</strong> {date}</p>
          <p><strong>Symbol:</strong> {stockData.info.symbol}</p>
          <p><strong>Open Price:</strong> {stockData.priceInfo.open}</p>
          <p><strong>Day High:</strong> {stockData.priceInfo.dayHigh}</p>
          <p><strong>Day Low:</strong> {stockData.priceInfo.dayLow}</p>
          <p><strong>Last Price:</strong> {stockData.priceInfo.lastPrice}</p>
          <p><strong>Previous Close:</strong> {stockData.priceInfo.previousClose}</p>
          <p><strong>Change:</strong> {stockData.priceInfo.change.toFixed(2)}</p>
          <p><strong>Percentage Change:</strong> {stockData.priceInfo.pChange.toFixed(2)}%</p>
        </div>
      )}

      {/* Historical Data Chart */}
      <h3 style={{ marginTop: "20px" }}>Stock Price Trend</h3>
      {historicalData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={historicalData}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default Stock;
