const express = require('express')
const User = require('../models/user')
const {isValid} = require("../utils/validate");
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
          res.status(201).send(user)
      } catch (e) {
          res.status(400).send(e)
      }
    } else {
      res.send("One of the fields are invalid");
    }
  });
  
  router.get('/users', async (req,res) => {
      try {
          const users = await User.find({})
          res.send(users)
      } catch (e) {
          res.status(500).send()
      }
  })
  
  router.get('/users/:id', async (req,res) => {
      const _id = req.params.id
      try {
          const user = await User.findById(_id)
          user? res.send(user) : res.status(404).send()
      } catch(e) {
          res.status(500).send(e)
      }
  })
  
  router.patch('/users/:id', async (req,res) => {
      const updates = Object.keys(req.body)
      const allowedUpdate = ['name' , 'email' , 'password', 'age']
      const isValidOperation = updates.every(update => allowedUpdate.includes(update))
      const _id = req.params.id
      const details = req.body
  
      console.log(updates);
      console.log(isValidOperation);
      if(!isValidOperation) {return res.status(400).send({error: 'Invalid updates'})}
      
      try {
          const user = await User.findByIdAndUpdate(_id , details , {new: true ,runValidators: true})
          user? res.send(user) : res.status(404).send()
      } catch(e) {
          res.status(400).send(e)
      }
  })
  
  router.delete('/users/:id' , async (req , res) => {
      const _id = req.params.id
      try {
  
          const user = await User.findByIdAndDelete(_id)
          user? res.send(user) : res.status(404).send()
  
      } catch (e) {
          res.status(500).send(e)
      }
  })

  module.exports = router