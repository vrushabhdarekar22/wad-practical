const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    Songname:String,
    Film:String,
    Music_director:String,
    Singer:String,
    Actor:{
        type:String,
        default:"N/A"
    },
    Actress:{
        type:String,
        default:"N/A"
    }
})

const Song = mongoose.model('songdetails',songSchema);

module.exports = Song;