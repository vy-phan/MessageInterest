import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

export const getSocketIdByUserId = (receiverId) => {
    return useSocketMap[receiverId]
}
const useSocketMap = {}

io.on("connection", (socket) => {
    console.log("User connected",socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
        useSocketMap[userId] = socket.id
    }
    io.emit("getOnlineUsers",Object.keys(useSocketMap))

    socket.on("disconnect", () => {
        console.log("User disconnected",socket.id);
        delete useSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(useSocketMap))
    })
})

export {app,io,server}