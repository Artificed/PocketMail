import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import NewsDisplay from "../components/NewsDisplay";

const NewsScreen: React.FC = () => {

  const [author, setAuthor] = useState<string | undefined>();
  const [image, setImage] = useState<string | undefined>();
  const [text, setText] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [link, setLink] = useState<string | undefined>();
  const [date, setDate] = useState<string | undefined>();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://7692-34-87-189-0.ngrok-free.app",
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
      setAuthor(data.Author);
      setImage(data.Image);
      setText(data.Text);
      setTitle(data.Title);
      setLink(data.URL);
      setDate(data.Date);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View className="h-screen w-screen">
      <NewsDisplay 
        author={author || ""}
        image={image || ""}
        text={text || ""}
        title={title || ""}
        link={link || ""}
        date={date || ""}
      />
    </View>
  );
};

export default NewsScreen;

