const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post("/tasks" , async (req, res) => {
    const {
        body: {name, description , completed},
    } = req
    const task = new Task({ name,description , completed})
    try {

        await task.save()
        res.sendStatus(201).send(task)

    } catch (e) {
        res.status(400).send()
    }
})

router.get('/tasks', async (req,res) => {
    
    try {
        const tasks = await Task.find()
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get('/tasks/:id' , async (req,res) => {
    const _id = req.params.id
    try {
 
        const task = await Task.findById(_id)
        task? res.send(task) : 
        res.status(404).send()

    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name' , 'description' , 'completed']
    const isValidOperation = updates.every(update =>  allowedUpdate.includes(update))
    const _id = req.params.id
    const details = req.body

    if(!isValidOperation)  {
        return res.status(400).send({error: 'Invalid updates'})
    }
    
    try {
        const task = await Task.findByIdAndUpdate(_id , details , {new: true , runValidators:true})
        console.log(task);
        task? res.send(task) : res.status(404).send()
        
    } catch(e) {
        res.status(400).send({e: 'not working'})
    }
})

router.delete('/tasks/:id' , async (req, res) => {
    const _id = req.params.id
    try {

        const task = await Task.findByIdAndDelete(_id)
        task? res.send(task) : res.status(404).send()
    } catch(e) {
        res.status(400).send({e: 'not working'})
    }
})

module.exports = router