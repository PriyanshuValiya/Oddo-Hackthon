"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const shuffledNews = data.sort(() => 0.5 - Math.random()).slice(0, 12);
          setNews(shuffledNews);
        } else {
          setNews([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching news:", err);
        setNews([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen  py-12 px-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 drop-shadow-lg">
        🔥 Latest Finance News
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="w-[450px] flex">
              <div className="h-80 w-full bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
          ))}
        </div>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-500">
          No news available. Please check again later.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-80 flex flex-col justify-between rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105 overflow-hidden bg-white/80 backdrop-blur-md border border-gray-300">
                <CardContent className="px-6 pt-1 flex flex-col justify-start h-full">
                  <div>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold text-lg hover:underline"
                    >
                      {article.title}
                    </a>
                    <p className="text-gray-500 text-sm mt-2">
                      {new Date(article.pubDate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-700 mt-2 overflow-hidden line-clamp-3">
                    {article.contentSnippet}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
