require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dataRouter = require("./routes/dataRouter");

const app = express();
app.use(express.json());
app.use("/api/v1", dataRouter);

const url = process.env.DATABASE_URL;
mongoose.connect(url).then(()=>{
    console.log("Successfully established")
})
.catch((error)=>{
console.log(error.message)
})


const port = process.env.port || 5050;
app.listen(port, ()=>{
    console.log(`Serveyr is listening on port: ${port}`)
});