const express = require('express')
const Mission = require('../models/mission')
const router = new express.Router()

router.post("/mission" , async (req,res) => {
    const {
        body: {title , description , owner , status}
    } = req
    console.log(req.body);
    const mission = new Mission({title , description , owner , status})

    try {
        await mission.save()
        res.status(200).send(mission)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/missions" , async (req,res) => {
    try {
        const missions = await Mission.find()
        res.status(200).send(missions)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get("/mission/:id" , async (req,res) => {
    const _id = req.paramd._id

    try {
        const mission = await Mission.findById(_id)
        mission? res.status(200).send(mission) :
        res.status(404).send()
    } catch (e){
        res.status(500).send(e)
    }
})

router.patch("/mission/:id" , async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ["title" , "description" , "ownder" , "status"]
    const isValidOperation  = updates.every(update => allowedUpdate.includes(update))
    const details = req.body
    const _id = req.params.id
    

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
        const mission = await Mission.findByIdAndUpdate(_id , details , {new: true , runValidators: true})
        mission? res.status(200).send(mission) : res.status(404).send
    } catch(e) {
        res.status(500).send({error: "Something went wrong"})
    }
    
})

module.exports = router



