const express = require('express')
const socketio = require('socket.io')

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
    console.log('we have a new connection!@!!!')

    socket.on('join', ({name,room}, callback) => {
    console.log(`User ${name} has joined room ${room}`)
    })

    socket.on('disconnected', ({name}, callback) => {
      console.log(`${name} has left the chat`)
    })





})


app.use(router)

httpServer.listen(PORT, () => console.log(`server has started on port ${PORT}`))
