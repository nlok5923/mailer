const mongoose = require("mongoose")

let subscribers = new mongoose.Schema({
    email: {
        type:String, 
        default:null,
        unique: true,
    }
})

module.exports = mongoose.model('astronomy-subscriber', subscribers);