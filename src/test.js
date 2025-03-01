import { JSDOM } from "jsdom";
const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

global.window = window;
global.document = window.document;
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

import { createChart } from "lightweight-charts";

// Create a mock container for the chart
const chartContainer = document.createElement("div");
document.body.appendChild(chartContainer);

const chart = createChart(chartContainer, { width: 600, height: 300 });
const series = chart.addCandlestickSeries();

series.setData([
  { time: "2024-02-25", open: 100, high: 110, low: 95, close: 105 },
  { time: "2024-02-26", open: 105, high: 115, low: 100, close: 110 },
]);

console.log("✅ Lightweight Charts test completed successfully!");
