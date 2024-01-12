const express = require('express')

const port = 8000;

const app = express();

const db = require('./config/db');

const path = require('path');

app.set('view engine','ejs')

app.use(express.urlencoded())

app.use('/assets',express.static('assets'))

app.use("/",require('./routes/movieRoutes'))

app.use('/uploads',express.static(path.join('uploads')));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server strat on port ${port}`)
})