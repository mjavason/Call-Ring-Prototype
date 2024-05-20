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
      }
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.userId);
      delete users[socket.userId];
    });
  });

httpServer.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
