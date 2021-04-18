import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'

  const Join = () => {
      const [name, setName] = useState('')
      const [room, setRoom] = useState('')

      function checkNameAndRoomInput(e) {
        //this will prevent empty fields for name/room and also prevent names with all integers or names that start with an integer
        if (isNaN(room) || !room || !name || !isNaN(name) || !isNaN(name[0])) {
          e.preventDefault()
          alert('Invalid Entries, try again')
        }
      }

      return (
        <div className="joinOuterContainer">
          <div className="joinInnerContainer">
          <h1 className="heading">Phillip's Live Chat App</h1>
          <div><input  placeholder="Create Username Here" className="joinInput" type="text" onChange={e => setName(e.target.value)} /></div>
          <div><input  placeholder="Enter room #" className="joinInput mt-20" type="text" onChange={e => setRoom(e.target.value)} /></div>
          <Link onClick={checkNameAndRoomInput} to={`/chat?name=${name}&room=${room}`}>
            <button className="button" type="submit">sign In</button>
          </Link>
          </div>
        </div>
      )
  }

  export default Join
