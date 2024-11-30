// const express = require("express")
// const dotenv = require("dotenv")

import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectMongoDB from "./db/connectMongoDB.js"
import { app,server } from "./socket/socket.js"


const PORT = process.env.PORT || 5000

dotenv.config()

// app.get("/",(req, res) =>{
//     res.send("Hello world!")
// })

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
app.use("/api/users",userRoutes)



server.listen(PORT,() => {
    connectMongoDB()
    console.log(`Server Running on port ${PORT}`)
})
