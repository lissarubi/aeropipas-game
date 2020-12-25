const express = require('express');
var cors = require('cors');
const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

const connectClients = []
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const clientRooms = {}

io.on('connection', (client) => {
  connectClients.push(client)
  const state = createGameState(client);

  client.on('newGame' ,handleNewGame)
  client.on('joinGame', handleJoinGame)
  client.on('keydown',handleKeydown)

});

function startGameInterval(roomId) {
  const intervalId = setInterval(() => {
    const winner = gameLoop(state[roomId]);
    
    if (!winner) {
      emitGameState(roomId, state[roomId])
    } else {
      emitGameOver(roomId, winner);
      state[roomId] = null;
      clearInterval(intervalId);
    }
  }, 1000 / 60);
}


function createGameState(client) {
  return {
    players: [
      {
        pos: {
          x: 100,
          y: 450,
        },
        speed: client.speed,
        angle: client.angle,
      },
      {
        pos: {
          x: 600,
          y: 450,
        },
        speed: client.speed,
        angle: client.angle,
      },
    ],
  };
}

function handleNewGame(clientData){
  const clientId = clientData.id
  const clientRoom = clientData.room

  for (i = 0; i < connectClients.length; i++){
    if (connectClients[i].id == clientId){
      var connectClient = connectClients[i]
    }
  }
  if (connectClient){

  clientRooms[connectClient.id] = clientRoom
  console.log(clientRooms)

  connectClient.emit('gameId', clientRoom)
  }
  else{
    return
  }
}

function handleJoinGame(client){
  const clientId = client.id
  const roomId = client.room
  console.log(io.sockets.adapter.rooms)
    const room = io.sockets.adapter.rooms.get(clientId);
  console.log(room)
    let allUsers;
    if (room) {
      allUsers = room.sockets;
    }

  for (i = 0; i < connectClients.length; i++){
    if (connectClients[i].id == clientId){
      var connectClient = connectClients[i]
    }
  }

    let numClients = 0;
    if (allUsers) {
      numClients = Object.keys(allUsers).length;
    }

    if (numClients === 0) {
      connectClient.emit('unknownCode');
      return;
    } else if (numClients > 1) {
      connectClient.emit('tooManyPlayers');
      return;
    }

    clientRooms[client.id] = roomId;

    client.join(roomId);
    client.number = 2;
    client.emit('init', 2);
    
    startGameInterval(roomId);
  return room
}

function handleKeydown(client){
  
  const roomId = clientRooms[client.id]
 if (!roomId) {
      return;
    }

  const x = client.x
  const y = client.y
  const speed = client.speed
  const angle = client.angle

  state[roomId].players[client.number -1 ].x = x
  state[roomId].players[client.number -1 ].y = y
  state[roomId].players[client.number -1 ].speed = speed
  state[roomId].players[client.number -1 ].angle = angle
}

function emitGameState(room, gameState) {
  // Send this event to everyone in the room.
  io.sockets.in(room)
    .emit('gameState', JSON.stringify(gameState));
}

function emitGameOver(room, winner) {
  io.sockets.in(room)
    .emit('gameOver', JSON.stringify({ winner }));
}

function gameLoop(state) {
  if (!state) {
    return;
  }

  const playerOne = state.players[0];
  const playerTwo = state.players[1];

  console.log({playerOne, playerTwo})

  return false;
}

http.listen(3000, () => {
  console.log('listening on *:3000');
});
