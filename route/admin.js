const express=require('express');
const route=express.Router();
const controllerRouter=require('../controllers/user');
const comments = require('../model/comments');

route.get('/data',controllerRouter.getData);
route.post('/save-data',controllerRouter.saveData);
route.delete('/delete-data/:id',controllerRouter.deleteComments);
route.post('/comment-save',controllerRouter.saveComments);
route.get('/comment/:id',controllerRouter.getComments);

module.exports=route;