import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
let socket;

  const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
      const {name, room} = queryString.parse(location.search)
      socket = io(ENDPOINT , {transports: ['websocket', 'polling', 'flashsocket']});

      setName(name)
      setRoom(room)

      socket.emit('join', {name, room}, ({error}) => { // here we destructure the error obj from the server
        console.log('haha you got an err noob')  //this code block ONLY executes if there is an error on the server
      })

      return () =>  {
        socket.emit('disconnected', {name})
        socket.off()

      }

    }, [ENDPOINT, location.search])



  return (
    <h1>Chat</h1>
  )
}



  export default Chat
