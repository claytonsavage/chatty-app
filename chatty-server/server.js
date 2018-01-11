const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const PORT = 3001;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });

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
  clientSize = wss.clients.size
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(clientSize);
      const messageContent = {"content": "a user joined this chat",
                            "id": uuidv1(),
                            "type": "connection"}
      const stringMessage = JSON.stringify(messageContent);
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
  });
});