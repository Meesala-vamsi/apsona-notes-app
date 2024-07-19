const express = require("express")
const GlobalErrorHandler = require('./Controllers/errorController')
const CustomError = require("./Utils/CustomError")
const userRouter = require("./Routes/userRoutes")
const notesRouter = require("./Routes/notesRoutes")
const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cors())

app.use("/auth",userRouter)
app.use("/notes",notesRouter)

app.use("*", (req, res, next) => {
    const error = new CustomError(`The path you entered ${req.originalUrl} doesn't found on Server..`, 404)
    next(error)
})



app.use(GlobalErrorHandler)

module.exports = app
