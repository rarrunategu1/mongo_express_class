const express = require('express');
const Profile = require('../../models/Profile');
const router = express.Router();

//reads all profiles

router.get('/', (req, res)=> {
  Profile.find()
        .then(profiles => res.json(profiles))
        .catch(err => console.log(err));
});

//reads one particular profile

router.get('/:fullName', (req, res) =>{
    const fullName = req.params.fullName;
    Profile.findOne()
    .then(profile => {
        if (!profile){
            res.status(404)
            .json({message: `The profile for email address ${fullName} does not exist`});
        } else {
            res.json(profile);
        }
    })
    .catch(err => res.status(500).json({message: err}));
    
});

module.exports = router;