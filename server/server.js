const express = require('express')()
const http = require('http').Server(express)
const socketio = require('socket.io')(http,{
    cors: {
      origin: "http://localhost:8080",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  })
const port = 8000
const volleyball = require('volleyball');

var position = {
    x: 200,
    y: 110
}
express.use(volleyball)

express.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

socketio.on("connection", socket => {
    console.log(`user ${socket.id} is connected`);
    // game 
    socket.emit("position", position)
    socket.on("move", data =>{
        switch(data){
            case"left":
                position.x -= 5
                socketio.emit("position", position)
                break
            case"right":
                position.x += 5
                socketio.emit("position", position)
                break
            case"up":
                position.y -= 5
                socketio.emit("position", position)
                break
            case"down":
                position.y += 5
                socketio.emit("position", position)
                break
        }
    })
// texting
    socket.on('message', data =>{
      socket.broadcast.emit('recieved', data)
      console.log(data);
    })
    
    socket.on('disconnect', ()=>{
      console.log(`user ${socket.id} left.`);
    })
})
   
http.listen(port, () => {
  console.log(`listening on port: ${port}........`);
});






// const express = require('express')
// const app = express()
// const http = require('http')
// const server = http.createServer(app)
// const socketio = require('socket.io')(http)

//app.use(express.static('../client/public'))

/*app.use(volleyball)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
    console.log(`listening on port: ${port}........`);
  });
*/
