const express = require('express')
const Employee = require('../models/employee')
const router = new express.Router()

router.post("/employee" , async (req,res) => {
    const {
        body: {name , email , password , level}
    } = req
    console.log(req.body);
    const employee = new Employee({name , email , password , level})

    try {
        await employee.save()
        res.status(200).send(employee)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get("/employees" , async (req,res) => {
    try {
        const employees = await Employee.find()
        res.status(200).send(employees)
    } catch(e) {
        res.status(500).send(e)
    }
})


module.exports = router



