const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cryptoController = require('./controllers/cryptoController');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', async (msg) => {
    console.log('Received message:', msg);
    await cryptoController.handleMessage(socket, msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.get('/', (req, res) => res.send('Crypto Web-Chat Backend'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));