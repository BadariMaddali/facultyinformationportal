const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json())
app.use(cors());

const db = require('./models');

const userRouter = require("./routes/Users");
app.use("/users", userRouter);

const adminRouter = require("./routes/Admin");
app.use("/admin", adminRouter)

const coordinatorRouter = require("./routes/Coordinator");
app.use("/coordinator", coordinatorRouter);

const facultyRouter = require("./routes/Faculty");
app.use("/faculty", facultyRouter);


db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server Running on Port 3001");
    });
});


