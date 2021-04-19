import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
let socket;




  const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'https://live-chat-reacts.herokuapp.com/'

    useEffect(() => {
      const {name, room} = queryString.parse(location.search)
      socket = io(ENDPOINT , {transports: ['websocket', 'polling', 'flashsocket']});

      setName(name)
      setRoom(room)

      socket.emit('join', {name, room}, (error) => { // here we destructure the error obj from the server
          if (error) {
            alert(error)//this code block ONLY executes if there is an error on the server
          }
      })
    }, [ENDPOINT, location.search])

    useEffect( () => {

      socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
      });

      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    },[])

    // function to send messages
    const userMessage = e => {
      e.preventDefault()
      if(message) {
        socket.emit('userSendMessage', message, () => setMessage('') )
      }
    }

    console.log('NEW message data -->', message)
    console.log('ALL MESSAGES Collection  -->', messages)

  return (
    <div className="outerContainer">

      <div className="container">
        <InfoBar users={users} room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={userMessage}/>
      </div>
      <div className="chat-info-container">
        <TextContainer users={users}/>
      </div>
    </div>
  )
}



  export default Chat
