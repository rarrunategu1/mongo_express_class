const express = require('express');
const Profile = require('../../models/Profile');
const route = express.Router();
var bodyParser = require('body-parser');
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
	extended: true
}))
//reads all profiles
route.get('/', (req, res) => {
	Profile.find().then(profiles => res.json(profiles)).catch(err => console.log(err));
});
//reads one particular profile
route.get('/:email', (req, res) => {
	const email = req.params.email; //not good practice to use email as a param
	Profile.findOne({
		email
	}).then(profile => {
		if (!profile) {
			res.status(404).json({
				message: `The profile for email address ${email} does not exist`
			});
		} else {
			res.json(profile);
		}
	}).catch(err => res.status(500).json({
		message: err
	}));
})
//creates a new profile    
route.post('/', (req, res) => {
	const {
		firstname,
		lastname,
		email
	} = req.body;
	const newProfile = new Profile({
		firstname,
		lastname,
		email
	});
	newProfile.save().then(profile => res.status(202).json(profile)).catch(err => res.status(500).json({
		message: err
	}));
});
//deletes a profile found by email
route.delete('/:email', (req, res) => {
	const email = req.params.email;
	Profile.findOne({
		email
	}).then(profile => {
		if (!profile) {
			return res.status(404).json({
				message: `A profile with email ${profile} cannot be found`
			})
		}
		profile.remove().then(() => res.status(204).json({
			message: "Profile successfully deleted"
		})).catch(err => res.status(500).json(err));
	}).catch(err => res.status(500).json({
		message: err
	})); //500 means something happened on server
})
//updates a profile found by name
route.put('/:email', (req, res) => {
	const email = req.params.email; //not good practice to use email as a param
	Profile.findOne({
		email
	}).then(profile => {
		if (!profile) {
			res.status(404).json({
				message: `The profile for email address ${email} does not exist`
			});
		} else {
			Profile.findOneAndUpdate({
				email
			}, {
				$set: {
					firstname: req.body.firstname
				}
			}, {
				new: true
			}).then(profile => res.json(profile))
		}
	}).catch(err => res.status(500).json(err));
})
module.exports = route;