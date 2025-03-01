import Parser from "rss-parser";

export default async function handler(req, res) {
  const parser = new Parser();

  // Define RSS Feeds
  const feeds = [
    "https://news.google.com/rss/search?q=stock+market&hl=en-IN&gl=IN&ceid=IN:en",
    "https://news.google.com/rss/search?q=mutual+funds&hl=en-IN&gl=IN&ceid=IN:en",
    "https://news.google.com/rss/search?q=personal+finance&hl=en-IN&gl=IN&ceid=IN:en"
  ];

  try {
    let news = [];
    for (const feed of feeds) {
      const result = await parser.parseURL(feed);
      news.push(...result.items.slice(0, 5)); // Get the top 5 news articles per feed
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news", error });
  }
}
