import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


const loginUser = async (req,res) => {
    try {

        const {email, password}  = req.body;
    
        const user = await userModel.findOne({email})
    
        if(!user){
            return res.status(200).json({
                success:false,
                messsage:"User doesn't exist"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }else{
            return res.json({success:false,message:"Invalid Credentials"})
        }
    
        
    } catch (error) {
     console.log(error)
     res.json({success:false,message:error.message})
    }
}


const registerUser = async (req,res) => {
   try {

    const {name, email, password}  = req.body;

    const exists = await userModel.findOne({email})

    if(exists){
        return res.status(200).json({
            success:false,
            messsage:"User already exist"
        })
    }

    if(!validator.isEmail(email)){
        return res.status(200).json({
            success:false,
            messsage:"Please enter valid email"
        })
    }
    if(password.length < 8){
        return res.status(200).json({
            success:false,
            messsage:"Please enter a strong password"
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hasedPassword  = await bcrypt.hash(password,salt)

    const newUser  = new userModel({name,email, password:hasedPassword})

    const user  = await newUser.save()

    const token = createToken(user._id)

    res.json({success:true,token})
    
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
   }
    
}


const adminLogin = async (req,res) => {
    try {

        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:true,message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {loginUser, registerUser, adminLogin}