import { NextResponse } from "next/server";
import { NseIndia } from "stock-nse-india";

const nseIndia = new NseIndia();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol") || "TCS"; // Default: TCS

    // Fetch start and end dates
    const today = new Date().toISOString().split("T")[0];
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 1);
    const formattedPastDate = pastDate.toISOString().split("T")[0];

    const start = searchParams.get("start") || formattedPastDate;
    const end = searchParams.get("end") || today;

    console.log(`📅 Fetching historical data from ${start} to ${end} for ${symbol}`);

    // Fetch stock details
    const equityDetails = await nseIndia.getEquityDetails(symbol);

    // Fetch historical data
    let historicalData = [];
    try {
      const historyResponse = await nseIndia.getEquityHistoricalData(symbol, { start, end });

      if (historyResponse.length > 0) {
        const stockDataArray = historyResponse[0]?.data || [];
        historicalData = stockDataArray.map((item) => ({
          date: item.CH_TIMESTAMP?.split("T")[0] || "Unknown",
          open: item.CH_OPENING_PRICE ?? null,
          high: item.CH_TRADE_HIGH_PRICE ?? null,
          low: item.CH_TRADE_LOW_PRICE ?? null,
          close: item.CH_CLOSING_PRICE ?? null,
        })).filter((item) => item.close !== null);
      }
    } catch (historyError) {
      console.error("❌ Error fetching historical data:", historyError);
    }

    return NextResponse.json({ symbol, equityDetails, historicalData });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
