// these helper functions will help to manage users such as which rooms they're in etc
const express = require('express')

const users = []

const addUser = ({id, name, room}) =>  { //destructured from socket instance
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

          // this check prevents multiple same name users in the same room
  const existingUser = users.find(user => user.room === room && user.name === name)

  if (existingUser) return {error: 'That user name is taken bro'}
        // if no duplicate users then proceed

  const user = {id, name, room}
  users.push(user)
  return {user}

}
const removeUser = (removalID) =>  {
  const index = users.findIndex(user => user.id === removalID)
  if (index !== -1) return users.splice(index, 1)[0] // this will returned the spliced aka removed user

}
const getUser = (id) => users.find(user => user.id === id)


const getAllUsersInRoom = (room) => users.filter(user => user.room === room)// will return array with names of all users in specific room


module.exports = {addUser, removeUser, getUser, getAllUsersInRoom}
