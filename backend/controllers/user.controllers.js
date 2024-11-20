import User from "../models/users.models.js";

export const getUserForSidebar = async (req,res) => {
    try {
        const loggedInUserId = req.user._id
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId}}).select('-password')

        res.status(200).json(filterUsers)

    } catch (error) {
        console.error("Error in user controller: " , error.message);
        res.status(500).json({error:"internal Server Error"})
    }
}