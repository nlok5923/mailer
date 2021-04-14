const mongoose = require("mongoose")

let subscribers = new mongoose.Schema({
    email: {
        type:String, 
        default:null
    }
})

module.exports = mongoose.model('subscriber', subscribers);