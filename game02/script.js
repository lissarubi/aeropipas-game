const createRoomInput = document.getElementById('createRoomNumber');
const enterRoomInput = document.getElementById('enterRoomNumber');

const inputButtonCreateRoom = document.getElementById('inputButtonCreateRoom');
const inputButtonEnterRoom = document.getElementById('inputButtonEnterRoom');

inputButtonCreateRoom.addEventListener('click', createRoom);
inputButtonEnterRoom.addEventListener('click', enterRoom);

var socket = io('http://localhost:3000');
var gameId;
socket.on('connect', (client) => {
  socket.on('gameId', (client) => {
    console.log(client);
    gameId = client.roomId;
  });
});

function createRoom(client) {
  var clientId = socket.id;
  var room = createRoomInput.value
  socket.emit('newGame', { id: clientId, room: room });
  localStorage.setItem("id", clientId)
  localStorage.setItem("room", room)
  window.location = 'game02/start'
}
function enterRoom() {
  var clientId = socket.id;
  var room = enterRoomInput.value
  const roomId = socket.emit('joinGame', { id: clientId, room: enterRoomInput.value }).id;
  console.log(roomId)
  localStorage.setItem("id", clientId)
  localStorage.setItem("roomNumber", room)
  localStorage.setItem("roomId", roomId)
  // window.location = 'game02/start'
}
