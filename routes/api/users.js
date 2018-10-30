const express = require('express');
const User = require('../../models/User');
const router = express.Router();

//router.get('/', (req, res)=>res.json({message: "Welcome to User route"}));

router.get('/', (req, res)=> {
  User.find()//will find everything in my user collection in mlab
  .then(users => res.json(users))
  .catch(err => console.log(err));
});

module.exports = router;