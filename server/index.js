const express = require('express')
const socketio = require('socket.io')

const {addUser, removeUser, getUser, getAllUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000
const router = require('./router')
const app = express()

          //method 1
// const http = require('http')

// const server = http.createServer(app)
// const io = socketio(server)

        // method 2
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on('connection', (socket) => {

    socket.on('join', ({name,room}, callback) => {
      const {error, user} = addUser({id: socket.id, name, room})
       //we must pass in an obj because this function requires it as we defined in users.js
      if (error) return callback(error)
      socket.join(user.room) //this joins the user in that room
      socket.emit('message', {user: 'admin', text: `${user.name}, welcome to room ${user.room}`})
      //socket.broadcast will emit a message to everyone ELSE in the room but the user
      socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`}) //will be visible to other participants in the chat
      io.to(user.room).emit('roomData', { room: user.room, users: getAllUsersInRoom(user.room)})

      callback()
    })

    socket.on('userSendMessage', (message, callback) => {
      const user = getUser(socket.id)

      io.to(user.room).emit('message', {user:user.name, text: message})
      callback()
    })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getAllUsersInRoom(user.room)});
    }
  })
});


app.use(router)


httpServer.listen(PORT, () => console.log(`server has started on port ${PORT}`))
