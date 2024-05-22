const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
// Enable CORS
app.use(cors());

// Create an instance of the HTTP server
const httpServer = http.createServer(app);

// Create an instance of the Socket.io server attached to the HTTP server
const io = new socketIo.Server(httpServer, {
  cors: {
    origin: '*', // Replace with your frontend URL
    // methods: ['GET', 'POST'],
  },
  // options
});

let users = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Store the connected user's ID
  socket.on('register', (userId) => {
    users[userId] = socket.id;
    socket.userId = userId;
    console.log('User registered:', userId);
  });

  // Handle signaling messages
  socket.on('signal', (data) => {
    console.log('Signal received', data);
    const recipientSocketId = users[data.to];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('signal', data);
      console.log(`Forwarded signal to: ${data.to}`);
    } else {
      console.log(`Recipient not found for: ${data.to}`);
    }
  });

  // Handle call decline
  socket.on('message', (data) => {
    console.log('Message to: ', socket.userId);
    const recipientSocketId = users[data.to];
    io.to(recipientSocketId).emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.userId);
    delete users[socket.userId];
  });

  // Catch-all event listener
  socket.onAny((event, ...args) => {
    console.log(`Received event: ${event}`, args);
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

httpServer.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
