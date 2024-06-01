import React, { useState, useEffect } from "react";
import { View } from "react-native";
import NewsDisplay from "../components/NewsDisplay";
import News from "../models/News";

const NewsScreen: React.FC = () => {

  const [news, setNews] = useState<News>();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://35ad-34-87-189-0.ngrok-free.app",
        {
          headers: {
            "ngrok-skip-browser-warning": "1231",
            "Access-Control-Allow-Origin": "true",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      const newsData: News = {
        author: data.Author,
        image: data.Image,
        text: data.Text,
        title: data.Title,
        link: data.URL,
        date: data.Date
      };

      setNews(newsData);

    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="h-screen w-screen">
      <NewsDisplay news={news}/>
    </View>
  );
};

export default NewsScreen;

