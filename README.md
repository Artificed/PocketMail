# PocketMail

A simple mobile app users can use to track down the current news and events

## How it Works

- News source is fetched from worldnewsapi.com
- Text is summarized using the Llama 3 model we finetuned on the cnn_dailymail dataset
- The NewsAPI is built on colab & hosted on ngrok
- The mobile app is built on Expo (React Native)

## Usage & Installation

- Install dependencies: npm install
- Run the app: npx expo start

## License

[MIT License](LICENSE)