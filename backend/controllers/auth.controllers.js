import User from "../models/users.models.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const signup = async(req,res)=>{
    try {
        const {fullname,username,password,cofirmpassword,gender} = req.body
        
        if(password !== cofirmpassword){
            return res.status(400).json({error:"Password is not match"})
        }

        const user = await User.findOne({username})

        if (user) {
            return res.status(400).json({error:"Username already exists"})
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPasswrod = await bcrypt.hash(password,salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPasswrod,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            await generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
    
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
    
            })
        }else{
            res.status(400).json({error: "Invalid user data"})
        }


    } catch (error) {
        console.log("Error : " , error.message);
        res.status(500).json({error:"internal Server Error"})
    }
}

export const login = async(req,res)=>{
    try {
        const {username,password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')
    
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        })

    } catch (error) {
        console.log("Error : " , error.message);
        res.status(500).json({error:"internal Server Error"})
    }
}

export const logout = async(req,res)=>{
    try {
        res.cookie('jwt','',{maxAge: 0})
        res.status(200).json({ message : "Logout successfull"})
    } catch (error) {
        console.log("Error : " , error.message);
        res.status(500).json({error:"internal Server Error"})
    }
}

