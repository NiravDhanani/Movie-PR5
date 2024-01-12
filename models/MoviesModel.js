const mongoose = require('mongoose');

const MovieModel = mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    year : {
        type : String,
        require : true,
    },
  
    language : {
        type : Array,
        require : true,
    }, 
    image : {
        type : String,
        require : true,
    },
    price : {
        type:String,
        require : true,
    }
})

const Movies = mongoose.model('MOVIE-PR5',MovieModel);

module.exports = Movies

