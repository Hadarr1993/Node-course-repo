require("./db/mongoose");
require("./models/task");
const validate = require("./utils/validate");
const express = require("express");
const User = require("./models/user");
const Task = require("./models/task")
const {
  ageValidate,
  passValidate,
  emailValidate,
} = require("./utils/validate");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', (req,res) => {
    User.find({}).then(users => {
        res.send(users)
    })
    .catch(e => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req,res) => {
    const _id = req.params.id
    
    User.findById(_id).then(user =>{
        user? res.send(user) : res.status(404).send()
    })
    .catch(e => {
        res.status(500).send(e)
    })
})

app.get('/tasks', (req,res) => {
    Task.find().then(tasks => {
        res.send(tasks)
    })
    .catch(e => {
        res.status(500).send(e)
    })
})

app.get('/tasks/:id' , (req,res) => {
    const _id = req.params.id

    Task.findById(_id).then(task => {
        task? res.send(task) : 
        res.status(404).send()
    })
    .catch(e => {
        res.status(500).send(e)
    })
})

app.post("/users", (req, res) => {
  const {
    body: { name, email, password, age },
  } = req;

  const isValid = ageValidate(age).success && passValidate(password).success && emailValidate(email).success
  console.log({isValid, ageValidate: ageValidate(age), passValidate: passValidate(password), emailValidate: emailValidate(email) });


  if (isValid) {
    const user = new User({ name, email, password, age });

    user.save()
      .then(() => {
        res.status(200).send(user);
        console.log(user);
      })
      .catch((e) => {
        res.status(400).send(e)
        
      });
  } else {
    res.send("One of the fields are invalid");
  }
});

app.post("/tasks" , (req, res) => {
    const {
        body: { name,description , completed},
    } = req
    
    const task = new Task({ name,description , completed})
    
    task.save().then(() => {
        res.status(200).send(task)
        console.log(task);
    })
    .catch(e => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
  console.log(`Server is live at ${port}`);
});
