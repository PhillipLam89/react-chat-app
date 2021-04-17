import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'

  const Join = () => {
      const [name, setName] = useState('')
      const [room, setRoom] = useState('')

      function checkNameAndRoomInput(e) {
        if (!isNaN(room) || !room) {
          alert('dfdsf')

        }
      }
// onClick={e => (!name || !room) && e.preventDefault()}
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
