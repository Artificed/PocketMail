import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import NewsDisplay from "../components/NewsDisplay";
import News from "../models/News";

const NewsScreen: React.FC = () => {
  const [news, setNews] = useState<News>();
  const [swipeTimeout, setSwipeTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isHolding, setIsHolding] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://099a-34-125-71-143.ngrok-free.app/",
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
        date: data.Date,
      };

      setNews(newsData);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHorizontalScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentWidth = event.nativeEvent.contentSize.width;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    const horizontalOffset = event.nativeEvent.contentOffset.x;

    if (
      (horizontalOffset <= 0 ||
        horizontalOffset >= contentWidth - layoutWidth) &&
      isHolding
    ) {
      fetchData();
    }
    setIsHolding(false);
  };

  const handleScrollBeginDrag = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentWidth = event.nativeEvent.contentSize.width;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;
    const horizontalOffset = event.nativeEvent.contentOffset.x;

    if (
      horizontalOffset <= 0 ||
      horizontalOffset >= contentWidth - layoutWidth
    ) {
      const timeout = setTimeout(() => {
        setIsHolding(true);
      }, 100);
      setSwipeTimeout(timeout);
    }
  };

  const handleScrollEndDrag = () => {
    if (swipeTimeout) {
      clearTimeout(swipeTimeout);
      setSwipeTimeout(null);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      horizontal
      onMomentumScrollEnd={handleHorizontalScrollEnd}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <NewsDisplay news={news} />
      </ScrollView>
    </ScrollView>
  );
};

export default NewsScreen;
