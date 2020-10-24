'use strict';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

/////////////////////////////////////////////////////////////////

const cors = require('cors');
const morgan = require('morgan');
const err404 = require('./middleware/404.js');
const err500 = require('./middleware/500.js');
const timestamp = require('./middleware/timestamp.js');
const userRouters = require('./auth/router');

/////////////////////////////////////////////////////////////

app.use(express.static('./public'));
app.use(express.json()); // body
app.use(cors());
app.use(morgan('dev'));
app.use(timestamp);
app.use(userRouters);

//////////////////////////////////////////////////////////


io.on('connection', (socket)=>{
  socket.emit('welcome', 'Welcome to EMS');
  socket.broadcast.emit('welcome', 'A new user has connected');
  socket.on('newmessage',(payload)=>{
    io.emit('message', payload);
  });
});



/////////////////////////////////////////////////////////
// Global ERROR MiddleWare 
app.use('*',err404); // 404
app.use(err500); //500
////////////////////////////////////////////////

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    server.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
  },
};