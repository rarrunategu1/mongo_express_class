const express = require('express');
const User = require('../../models/User');
const router = express.Router();

//router.get('/', (req, res)=>res.json({message: "Welcome to User route"}));

router.get('/', (req, res)=> {
  User.find()//will find everything in my user collection in mlab
  .then(users => res.json(users))
  .catch(err => console.log(err));
});

//url /api/users/?name=cliff
//url /api/users/cliff?comment=id
router.get("/:name", (req, res) => {
  const name = req.params.name;
  User.findOne({ name })
  .then(user => {
    if ( !user) {
       return res.status(404).json({message: `User: ${name} not found`})
      }else{
      res.json(user)
  }
  })
  .catch(err => res.status(500).json({message: err})); //500 means something happened on server
})

router.post("/", (req, res) => {
  const { name, password, avatar } = req.body;
  
  const newUser = new User({
    name,
    password,
    avatar
  })
  
  //newUser.avatar = avatar //add other attributes after creating that new item
  
  newUser.save()
  .then(user => res.status(201).json(user))
  .catch(err => res.status(500).json({message: err}));
})

router.delete('/:name', (req, res)=> {
  //TODO: protected route -ensure user is one deleting
  const name = req.params.name;
  User.findOne({ name })
  .then(user => {
    if ( !user) {
       return res.status(404).json({message: `User: ${name} not found`})
      }
      user.remove()
        .then( ()=> res.status(204).json({message: "User successfully deleted"}))
        .catch(err => res.status(500).json(err));
  })
  .catch(err => res.status(500).json({message: err})); //500 means something happened on server
})

router.put('/:name', (req, res) =>{
    User.findOneAndUpdate({name: req.params.name},
    {$set: {password: req.body.password}}, {new: true})
    .then(user => {
      if (!user) {
        res.status(404).json(`User ${req.params.name} not found to update`)
    }else{
      res.json(user)
  }
  })
  .catch(err => res.status(500).json({message: err}));
});
  


module.exports = router;