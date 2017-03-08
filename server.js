var express = require('express')
var bodyParser = require('body-parser');

var app = module.exports = express()

app.use(bodyParser.json())

var controller = require('./userCtrl.js');


app.get('/api/users', (req, res, next)=>{
  if(req.query.favorites){
    res.status(200).send(controller.getUsersByFavorite(req.query.favorites))
  }
  else if(req.query.age){
    res.status(200).send(controller.getUsersByAgeLimit(req.query.age))
  }
  else if(req.query.lastname){
    res.status(200).send(controller.findUserByQuery('last_name', req.query.lastname))
  }
  else if(req.query.email){
    res.status(200).send(controller.findUserByQuery('email', req.query.lastname))
  }
  else {
    res.status(200).send(controller.readAll())
  }
})

app.get('/api/users/:user', (req, res, next)=>{
  res.status(200).send(controller.findUserById(req.params.user))
})

app.get('/api/admins', (req, res, next)=>{
  res.status(200).send(controller.getAdmins())
})

app.get('/api/nonadmins', (req, res, next)=>{
  res.status(200).send(controller.getNonAdmins())
})

app.put('/api/users/:userid', (req, res, next)=>{
  res.status(200).send(controller.updateUser(req.params.userid, req.body))
})

app.post('/api/users', (req, res, next)=>{
  res.status(200).send(controller.createUser(req.body))
})

app.delete('/api/users/:userid', (req, res, next)=>{
  res.status(200).send(controller.removeUser(req.params.userid))
})
// app.listen('1138', ()=>console.log('Listening on port 1138'))
