const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    aboutme: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String,
        lowercase: true,
        required:  true,
        unique: true
        
    } 

});



module.exports = Profile = mongoose.model('profiles', ProfileSchema);


