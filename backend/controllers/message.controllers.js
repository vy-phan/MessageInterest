import Conversation from "../models/conversation.models.js"
import Message from "../models/message.models.js";
import { getSocketIdByUserId,io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]}
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save()
        // await newMessage.save()

        // this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getSocketIdByUserId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error sendMessage in controller: ", error.message);
        res.status(500).json({ error: "internal Server Error" })
    }
}

export const getMessage = async (req, res) => {
    try {
        const {id: userToChatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]}
        }).populate('messages')

        if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error getMessage in controller: ", error.message);
        res.status(500).json({ error: "internal Server Error" })
    }
}