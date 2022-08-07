require("./db/mongoose");
const express = require("express");
const cors = require('cors')
const missionRouter = require('./routers/mission')
const employeeRouter = require('./routers/employee')

const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use(missionRouter)
app.use(employeeRouter)

app.listen(port, () => {
    console.log(`Server is live at ${port}`);
});
