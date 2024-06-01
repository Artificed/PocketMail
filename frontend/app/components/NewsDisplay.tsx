import React from "react";
import { View, Text, Image, Linking } from "react-native";
import News from "../models/News";

interface NewsDisplayProps {
  news?: News;
}

const NewsDisplay: React.FC<NewsDisplayProps> = ({ news }) => {
  if (!news) {
    return <View><Text>No news available</Text></View>;
  }

  const handleURLPress = () => {
    Linking.openURL(news.link);
  };

  const calendar = require('../assets/calendar.webp');
  const profile = require('../assets/pfp.png');

  return (
    <View className="w-screen h-full bg-black">
      <Image source={{ uri: news.image }} className="w-max h-[undefined] aspect-square"/>
      <View className="p-4 flex flex-col">
        <Text className="text-3xl font-bold text-white">{news.title}</Text>
        <View className="flex flex-row justify-between w-full my-8">
          <View className="flex flex-row items-center">
            <Image source={profile} className="h-10 w-10 mr-3"/>
            <Text className="text-sm font-bold text-white">Author:{"\n"}{news.author}</Text>
          </View>
          <View className="flex flex-row items-center">
            <Image source={calendar} className="h-8 w-8 mr-2"/>
            <Text className="text-sm font-bold text-white">{new Date(news.date).toDateString()}</Text>
          </View>
        </View>     
        <Text className="text-sm  text-white">        {news.text?.replace(/\n/g, ' ')}</Text>
        <View className="justify-end">
          <Text className="text-sm mt-5 text-white font-light underline" onPress={handleURLPress}>Read More</Text>
        </View>
      </View>
    </View>
  );
};

export default NewsDisplay;
