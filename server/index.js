const express = require('express')
const socketio = require('socket.io')

const PORT = process.env.PORT || 5000
const router = require('./router')


          //method 1
// const http = require('http')
// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)

        // method 2
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});


io.on('connection', (socket) => {
    console.log('we have a new connection!@!!!')
    socket.on('disconnect', () => {
      console.log('user left!!! :((')
    })

    socket.on('join', ({name,room}, callback) => {
      console.log(`User ${name} has joined room ${room}`)
      const error = false
      if (error) { // if an error occurs, this call back will pass the error obj to the front end
        callback({error: 'err'})
      }
    })

  socket.on('disconnect', () => {
    console.log('user has left')
  })

})


app.use(router)

server.listen(PORT, () => console.log(`server has started on port ${PORT}`))
