const express = require('express')
const router = express.Router() //creates new router object to handle requests

router.get('/', (req, res) => {
    res.send('server is up and runnin')
})

module.exports = router
