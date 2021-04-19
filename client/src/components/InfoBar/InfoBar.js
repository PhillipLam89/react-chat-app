import React from 'react'
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'
import TextContainer from '../TextContainer/TextContainer'
import './InfoBar.css'

const InfoBar = ({room, users}) => (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="green online dot" />
        <h3>Room #{room}</h3>

      </div>
      <div className="rightInnerContainer">
        <a href="/"><img alt="X icon" src={closeIcon}></img></a>
      </div>
    </div>
)

export default InfoBar
