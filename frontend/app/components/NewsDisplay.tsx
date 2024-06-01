import React from "react";
import { SafeAreaView, View, Text, Image, Linking } from "react-native";

interface NewsDisplayProps {
  author: string;
  image: string;
  text: string;
  title: string;
  link: string;
  date: string;
}

const NewsDisplay: React.FC<NewsDisplayProps> = ({ author, image, text, title, link, date }) => {

  const timeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };

  const handleURLPress = () => {
    Linking.openURL(link);
  };

  const colors = [
    'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink', 'rose', 'cyan', 'emerald', 'violet'
  ];

  const randomizeBgColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `bg-${randomColor}-100`;
  };

  return (
    <View className={`w-screen h-full ${randomizeBgColor()}`}>
      <View className="w-full h-1/2 flex flex-col justify-end">
        <Image source={{ uri: image }} className="absolute top-0 left-0 w-full h-full"/>
        <View className="bg-[#000000B3] py-4 px-5 flex flex-row justify-between">
          <View>
            <Text className="text-white text-lg">{author}</Text>
          </View>
          <View>
            <Text className="text-white text-lg">{timeSince(new Date(date))}</Text>
          </View>
        </View>
      </View>
      <View className="p-4 flex flex-col">
        <Text className="text-3xl font-bold">{title}</Text>
        <Text className="text-sm mt-5">{text}</Text>
        <View className="justify-end">
          <Text className="text-sm mt-5" onPress={handleURLPress}>Source: {link}</Text>
        </View>
      </View>
    </View>
  );
};

export default NewsDisplay;
