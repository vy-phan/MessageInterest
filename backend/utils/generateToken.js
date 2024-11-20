import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,//ngan chan hack XSS 
        sameSite:"strict",
        secure: process.env.NODE_ENV !== 'devlopment' // set up when use in envoriment devlopment 
    })
}

export default generateTokenAndSetCookie