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

router.get('/:email', (req, res) =>{
    const email = req.params.email; //not good practice to use email as a param
    Profile.findOne({email})
    .then(profile => {
        if (!profile){
            res.status(404)
            .json({message: `The profile for email address ${email} does not exist`});
        } else {
            res.json(profile);
        }
    })
    .catch(err => res.status(500).json({message: err}));
    
    
router.post("/", (req, res) => {
    
    const { firstname, lastname, email } = req.body;
    
    const newProfile = new Profile({
        firstname,
        lastname,
        email
    })

    newProfile.save()
        .then(profile =>res.status(202).json(profile))
        .catch(err =>res.status(500).json({message: err}))
})    
});

module.exports = router;