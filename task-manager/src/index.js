require("./db/mongoose");
require("./models/task");
const validate = require("./utils/validate");
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task")
const {isValid} = require("./utils/validate");
const async = require("hbs/lib/async");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const {
    body: { name, email, password, age },
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

app.post("/tasks" , async (req, res) => {
    const {
        body: { name,description , completed},
    } = req
    const task = new Task({ name,description , completed})
    try {

        await task.save()
        res.sendStatus(201).send(task)
        console.log(task);

    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req,res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        user? res.send(user) : res.status(404).send()
    } catch(e) {
        res.status(500).send(e)
    }
})

app.get('/tasks', async (req,res) => {
    
    try {
        const tasks = await Task.find()
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})

app.get('/tasks/:id' , async (req,res) => {
    const _id = req.params.id
    try {

        const task = await Task.findById(_id)
        task? res.send(task) : 
        res.status(404).send()

    } catch (e) {
        res.status(500).send(e)
    }
})

app.listen(port, () => {
  console.log(`Server is live at ${port}`);
});
