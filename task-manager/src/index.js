require("./db/mongoose");
const express = require("express");
const cors = require('cors')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task');
const missionRouter = require('../../final-Project/src/routers/mission')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = require('../../swagger.json')

const app = express();
const port = process.env.PORT || 3000;

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs' , swaggerUi.serve , swaggerUi.setup(swaggerDocs))

app.use(cors())
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)
app.use(missionRouter)

app.listen(port, () => {
    console.log(`Server is live at ${port}`);
});

