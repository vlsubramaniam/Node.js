const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', socket => {
  socket.emit('message', 'Welcome you are connected');
  socket.broadcast.emit('message', 'A new user has joined');

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }
    io.emit('message', message);
    callback();
  });

  socket.on('sendLocation', (coords, callback) => {
    io.emit(
      'message',
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    );
    callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', 'An user has left');
  });
});

httpServer.listen(port, () =>
  console.log(`Server started and is running at port ${port}`)
);
