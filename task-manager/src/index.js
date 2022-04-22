require("./db/mongoose");
const express = require("express");
const cors = require('cors')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task');
const missionRouter = require('../../final-Project/src/routers/mission')


const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)
app.use(missionRouter)

app.listen(port, () => {
    console.log(`Server is live at ${port}`);
});

const bcrypt = require('bcryptjs')
const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(password);
    console.log(hashedPassword);

    const isMatch = await bcrypt.compare(password , hashedPassword)
    console.log(isMatch );
}

myFunction()
