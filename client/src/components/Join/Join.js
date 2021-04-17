import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './Join.css'

  const Join = () => {
      const [name, setName] = useState('')
      const [room, setRoom] = useState('')

      return (
        <div className="joinOuterContainer">
          <div className="joinInnerContainer">
          <h1 className="heading">Phillip's Live Chat ASpp</h1>
          <div><input  placeholder="Name" className="joinInput" type="text" onChange={e => setName(e.target.value)} /></div>
          <div><input  placeholder="Room" className="joinInput mt-20" type="text" onChange={e => setRoom(e.target.value)} /></div>
          <Link onClick={e => (!name || !room) && e.preventDefault()} to={`/chat?name=${name}&room=${room}`}>
            <button className="button" type="submit">sign In</button>
          </Link>
          </div>
        </div>
      )
  }

  export default Join
