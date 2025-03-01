'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const MutualFund = () => {
  const [schemeName, setSchemeName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [schemeCode, setSchemeCode] = useState(null);
  const [navData, setNavData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timePeriod, setTimePeriod] = useState('3Y'); // Default 3 Years
  const [percentageChange, setPercentageChange] = useState(null);

  // Fetch fund list for autocomplete suggestions
  useEffect(() => {
    const fetchFundList = async () => {
      try {
        const response = await fetch('https://api.mfapi.in/mf');
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error('Error fetching fund list:', err);
      }
    };
    fetchFundList();
  }, []);

  // Get scheme code from scheme name
  const fetchSchemeCode = async () => {
    const fund = suggestions.find((fund) => fund.schemeName === schemeName);
    return fund ? fund.schemeCode : null;
  };

  // Fetch NAV Data and Chart Data
  const fetchNavData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching scheme code for:', schemeName);
      const code = await fetchSchemeCode();
      if (!code) throw new Error('Scheme not found');

      setSchemeCode(code);
      console.log('Found Scheme Code:', code);

      const response = await fetch(`https://api.mfapi.in/mf/${code}`);
      const result = await response.json();

      if (!result || !result.data) throw new Error('Invalid NAV data');

      const latestNavData = result.data[0];

      setNavData({
        schemeName: result.meta.scheme_name,
        nav: latestNavData.nav,
        date: latestNavData.date
      });

      // Filter data based on time period
      const today = new Date();
      let startDate = new Date();

      switch (timePeriod) {
        case '1M': startDate.setMonth(today.getMonth() - 1); break;
        case '1Y': startDate.setFullYear(today.getFullYear() - 1); break;
        case '3Y': startDate.setFullYear(today.getFullYear() - 3); break;
        case '5Y': startDate.setFullYear(today.getFullYear() - 5); break;
        case '10Y': startDate.setFullYear(today.getFullYear() - 10); break;
        case 'ALL': startDate = new Date(0); break;
        default: startDate.setFullYear(today.getFullYear() - 3); break;
      }

      const filteredData = result.data
        .filter((entry) => new Date(entry.date) >= startDate)
        .map((entry) => ({
          date: entry.date,
          nav: parseFloat(entry.nav),
        }))
        .reverse();

      setChartData(filteredData);

      // Calculate percentage change
      if (filteredData.length > 1) {
        const firstNav = filteredData[0].nav;
        const lastNav = filteredData[filteredData.length - 1].nav;
        const change = ((lastNav - firstNav) / firstNav) * 100;
        setPercentageChange(change.toFixed(2)); // Round to 2 decimal places
      } else {
        setPercentageChange(null);
      }

    } catch (err) {
      setError(err.message || 'Failed to fetch NAV data');
      console.error('Error fetching NAV:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-4 text-center">Mutual Fund NAV Tracker</h2>

      {/* Search Input */}
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Mutual Fund Name"
        value={schemeName}
        onChange={(e) => setSchemeName(e.target.value)}
        list="fund-suggestions"
      />
      <datalist id="fund-suggestions">
        {suggestions.map((fund, index) => (
          <option key={index} value={fund.schemeName} />
        ))}
      </datalist>

      {/* Time Period Selection */}
      <div className="flex space-x-2 mb-4">
        {['1M', '1Y', '3Y', '5Y', '10Y', 'ALL'].map((period) => (
          <button
            key={period}
            className={`px-4 py-2 rounded-md text-white ${
              timePeriod === period ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
            }`}
            onClick={() => setTimePeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Fetch Data Button */}
      <button
        className="w-full bg-blue-500 text-white px-4 py-3 rounded-md mb-4 hover:bg-blue-600 transition duration-200"
        onClick={fetchNavData}
      >
        Get NAV Data
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className="text-gray-500 text-center mt-2">Loading...</p>}

      {/* NAV Display */}
      {navData && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100 shadow-md">
          <h3 className="text-lg font-semibold text-blue-700">{navData.schemeName}</h3>
          <p className="text-gray-800">
            <strong>NAV:</strong> ₹{navData.nav}
          </p>
          <p className="text-gray-600">
            <strong>Date:</strong> {navData.date}
          </p>
          {percentageChange !== null && (
            <p className={`text-lg font-bold mt-2 ${percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {percentageChange >= 0 ? `🟢 +${percentageChange}%` : `🔴 ${percentageChange}%`} (over {timePeriod})
            </p>
          )}
        </div>
      )}

      {/* NAV Chart */}
      {chartData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">
            NAV Trend ({timePeriod})
          </h3>
          <ResponsiveContainer width="100%" height={400}>
  <LineChart data={chartData}>
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
      dataKey="nav" 
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

export default MutualFund;
