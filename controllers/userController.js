import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { response } from "express";



// login user
const loginUser = async (req, res) => {

    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success:false, message:"User Does not Exist"})
            
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success:false, message:"Invalid Password"})
            
        }

        const token = createToken(user._id);
        res.json({success:true, token})


    } catch (error) {

        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


//register user
const registerUser = async (req, res) => {
  const {password, email} = req.body;
  try {
      // checking that the user already exists
      const exist = await userModel.findOne({email})
      if (exist) {
          return res.json({success:false, message:"User Already Registered"})
          
      }

      //validating email format and strong password
      if (!validator.isEmail(email)) {
          return res.json({success:false, message:"Please Enter a Valid Email"})
          
      }

      if (password.length<8) {
          return res.json({success:false, message:"Please Enter a Strong Password"})
          
      }

      //encryption of password

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)


      const newUser = new userModel({
          
          email:email,
          password:hashedPassword

      })

      const user = await newUser.save()
      const token = createToken(user._id)
      res.json({success:true, token})


      
  } catch (error) {
      console.log(error);
      res.json({success:false, message:"Error"})
  }

}

export {loginUser, registerUser}