# Crypto Web-Chat

A real-time cryptocurrency chat application built with React, Node.js, Socket.IO, and the CoinGecko API. Users can interact with a bot to retrieve Ethereum (ETH) prices, market stats, trending coins, 7-day price charts, or record ETH holdings in a portfolio. The app features a responsive UI with chat bubbles, a thinking indicator, and price chart visualizations.

## Features

- **Real-Time Chat**: Send messages to a bot via Socket.IO and receive instant responses.
- **Cryptocurrency Data**:
  - Fetch current ETH price (`"ETH price"`, `"ETH trading"`, `"ETH cost"`).
  - Retrieve ETH market stats (`"ETH stats"`): market cap, 24h change, description.
  - List trending coins (`"show trending coins"`).
  - Display 7-day ETH price chart (`"ETH chart"`).
  - Record ETH holdings (`"I have 2 ETH"`).
- **UI Components**:
  - `ChatBubble`: Displays user and bot messages with timestamps.
  - `ChatInput`: Input field for sending messages.
  - `ThinkingIndicator`: Shows when the bot is processing.
  - `PriceChart`: Visualizes price data for ETH charts.
  - `PortfolioProvider`: Manages user portfolio context.
- **Error Handling**:
  - Graceful handling of invalid messages, API failures, and rate limits.
  - Fallback mock data for CoinGecko API errors.
- **Responsive Design**: Tailwind CSS for a modern, mobile-friendly UI.
- **Speech Synthesis**: Bot responses (except "Thinking...") are read aloud using browser speech synthesis.

## Prerequisites

- **Node.js**: v14 or higher
- **npm**: v6 or higher
- **CoinGecko API**: Free tier (50 calls/minute, no API key required)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chetanji028/crypto-web-chat
   cd crypto-web-chat 

   ##Install Backend Dependencies:
    cd server 
    npm install
   npm install express socket.io axios  

   ##Install Frontend Dependencies:
   cd client 
   npm install 

   ## start the backend:
   cd server 
   npm run dev 

   ## start the frontend 
   cd client 
   npm start 

   #####Usage
Open the app at http://localhost:3000.

Type commands in the chat input:
"ETH price": Get current ETH price.

"ETH stats": View ETH market cap, 24h change, and description.

"show trending coins": List trending cryptocurrencies.

"ETH chart": Display a 7-day ETH price chart.

"I have 2 ETH": Record ETH holdings.

Any unrecognized command returns a help message.

The bot responds with messages, charts, or error feedback if the API fails.

Messages are displayed in chat bubbles with timestamps, and bot responses are read aloud.




