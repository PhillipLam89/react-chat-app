import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
let socket;

  const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
      const {name, room} = queryString.parse(location.search)
      socket = io(ENDPOINT , {transports: ['websocket', 'polling', 'flashsocket']});

      setName(name)
      setRoom(room)

      socket.emit('join', {name, room}, (error) => { // here we destructure the error obj from the server
        console.log('haha you got an err noob')  //this code block ONLY executes if there is an error on the server
      })

      return () =>  {
        socket.emit('disconnected', {name})
        socket.off()
      }
    }, [ENDPOINT, location.search])

    useEffect( () => {
      socket.on('message', (message) => {
          setMessages([...messages, message])
      })
    }, [messages])

    // funtion to send messages
    const userMessage = e => {
      e.preventDefault()
      if(message) {
        socket.emit('userSendMessage', message, () => setMessage('') )
      }
    }

    console.log('message data -->', message)
    console.log('MESSAGES data -->', messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' ? userMessage(e) : null}
        />
      </div>
    </div>
  )
}



  export default Chat
