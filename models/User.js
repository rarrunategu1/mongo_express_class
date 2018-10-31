//making a schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema; //brings in the schema class 

const UserSchema = new Schema ({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true, 
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now, //takes standard js 
    }
})


module.exports = User = mongoose.model("users", UserSchema);  //common practice to make it lowercase and plural, assignee to user variable and then it's exported 
