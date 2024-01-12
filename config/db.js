const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/MOVIES-PR5')

const db = mongoose.connection;

db.on('connected',(err)=>{
    if(err){
        console.log(`db not found`);
        return false;
    }
    console.log(`db connected`);
})