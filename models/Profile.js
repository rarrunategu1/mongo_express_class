const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    fullName: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    lastName: {
        type: String,
        required: true
    },
    aboutMe: {
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
        
    }, 

});

ProfileSchema.virtual('fullname').get(function(){
    return [this.firstName, this.lastName].filter(Boolean).join(' ');
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);


