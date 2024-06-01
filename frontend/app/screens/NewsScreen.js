import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";
import NewsDisplay from "../components/NewsDisplay";

function NewsScreen() {

  const [author, setAuthor] = useState();
  const [image, setImage] = useState();
  const [text, setText] = useState();
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [date, setDate] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://96d2-104-198-208-140.ngrok-free.app",
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
    <View className="flex flex-col justify-center items-center border h-screen">
      <NewsDisplay author={author} image={image} text={text} title={title} link={link} date={date}/>
    </View>
  );
}

export default NewsScreen;
