const express = require('express');
const User = require('../models/user')
const {isValid} = require("../utils/validate");
const auth = require('../middleware/auth')
const router = new express.Router()


router.post("/users", async (req, res) => {
    const {
      body: {
          name,
          email,
          password,
          age },
    } = req;
  
    if (isValid(age,password,email)) {
      const user = new User({ name, email, password, age });
      try {
          await user.save()
          const token = await user.generateAuthToken()
          res.status(201).send({user, token})
      } catch (e) {
          res.status(400).send({eror:'This email is already in use'})
      }
    } else {
      res.send("One of the fields are invalid");
    }
  });
  
  router.post('/users/login', async (req,res) => {
      const {
          body: {
              email,
              password              
          }
      } = req
      try {
          const user = await User.findbyCredentials(email , password)
          const token = await user.generateAuthToken()
          res.send({user , token})
        
      } catch(e) {
          res.status(400).send({eror: 'Wrong login email or password'})
      }
  })

  router.post('/users/logout' , auth , async (req, res) => {
      try {
          req.user.tokens = req.user.tokens.filter(token => {
              return token.token !== req.token
          })
          await req.user.save()
          res.send()

      }catch(e) {
          res.status(500).send()

      }
  })

  router.post('/users/logoutAll' , auth , async (req, res) => {
      try {
          req.user.tokens = []
          await req.user.save()
          res.send()

      }catch(e) {
          res.satus(500).send()

      }
  })

  router.get('/users/me',auth ,async (req,res) => {
      res.send(req.user)
  })
  
  router.patch('/users/me',auth ,async (req,res) => {
      const updates = Object.keys(req.body)
      const allowedUpdate = ['name' , 'email' , 'password', 'age']
      const isValidOperation = updates.every(update => allowedUpdate.includes(update))
      const user = req.user
  
      console.log(updates);
      console.log(isValidOperation);
      if(!isValidOperation) {return res.status(400).send({error: 'Invalid updates'})}
      
      try {
          
          updates.forEach(update => {user[update] = req.body[update]})
          await user.save()
          res.send(user)

      } catch(e) {
          res.status(400).send(e)
      }
  })
  
  router.delete('/users/me' ,auth , async (req , res) => {
      const user = req.user
      try {
        await user.remove()
        res.send(user)
  
      } catch (e) {
          res.status(500).send(e)
      }
  })

  module.exports = router