const express = require('express');
const routes = express.Router();
const MovieController = require('../controllers/MovieController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        let img = Date.now() + file.originalname;
        cb(null, img);
    },
});

const fileUpload = multer({ storage: storage }).single('avatar');

routes.get('/', MovieController.view);
routes.get('/form', MovieController.form);
routes.post('/addData', fileUpload, MovieController.addData);
routes.get('/deleteData', MovieController.deleteData);
routes.get('/editData', MovieController.editData);
routes.post('/updateData', fileUpload, MovieController.updateData);

module.exports = routes;
