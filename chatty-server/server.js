// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
// use it like this uuidv1();

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

function chooseColor() {
    const colorArray = [
    'red',
    'green',
    'blue',
    'pink'
    ];
    const randomNumber = Math.floor(Math.random()*colorArray.length);
    return colorArray[randomNumber];
  }



wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  //console.log(wws.clients);
  clientSize = wss.clients.size

  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(clientSize);
      const messageContent = {"content": "a user joined this chat",
                            "id": uuidv1(),
                            "type": "connection"}
      const stringMessage = JSON.stringify(messageContent);
      // send color
      let randomColoruser = {"type": "colorset", "color": chooseColor(), "id":uuidv1()}
      let colorMessage = JSON.stringify(randomColoruser);
      client.send(stringMessage);
      client.send(colorMessage);
      }
  });

  ws.on('message', function incoming(message) {
    let messageContent = JSON.parse(message);
    messageContent["id"] = uuidv1();
    const stringMessage = JSON.stringify(messageContent);
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(stringMessage);
      }
    });
  });
  ws.on('close', () => {
    clientSize = wss.clients.size

    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(clientSize);
        let messageContent = {"content": "a user left this chat",
                              "id": uuidv1(),
                              "type": "connection"}
        const stringMessage = JSON.stringify(messageContent);
        client.send(stringMessage);
        }
    });
    console.log('Client disconnected')});
});