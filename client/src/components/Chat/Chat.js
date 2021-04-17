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

      socket.emit('join', {name, room}, ({error}) => {
        console.log('err test')
        alert(error)
      })

    }, [ENDPOINT, location.search])

    // return () => {
    //   socket.emit('disconnect')
    //   socket.off()
    // }

    console.log('socket -->', socket)

  return (
    <h1>Chat</h1>
  )
}



  export default Chat
