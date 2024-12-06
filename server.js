const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const socketService = require('./services/ws');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true // Allow credentials such as cookies
}));

app.options('*', cors());

// Serve static files (optional for front-end)
app.use(express.static(__dirname));

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow your Vue app
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// Initialize Socket.IO service
socketService(io);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});