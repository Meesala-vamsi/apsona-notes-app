const mongoose = require("mongoose");
const dotenv = require('dotenv')
const app = require("./app");

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.CONN_STRING,{
    useNewUrlParser:true
})
.then((conn)=>{
    console.log("Connected To Database..")
})
.catch((err)=>{
    console.log(err);
})
const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log("Server Started on port "+port)
})