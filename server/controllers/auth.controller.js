import userSchema from '../models/user.models.js'
import jwt from 'jsonwebtoken';

export const registerUser = async(req,res) =>{
    const {userName,password,email} = await req.body;
    if(!userName || !password || !email) return res.status(401).send({message:"Invalid credentials"});
    
    const user = await userSchema.findOne({email: email});
    if(user) return res.status(409).send({message:"User already exists"});
    
    const hashpassword=await userSchema.hashPassword(password);
    const newUser = new userSchema({userName:userName,password:hashpassword,email:email});
    await newUser.save();
    if(!newUser) return res.status(401).send({message:"Something went wrong try again"});

    const token = await newUser.generateToken();

    res.cookie("token",token);
    res.status(201).send({message:"User registered successfully",user:newUser});
}

export const loginUser = async(req,res) =>{
    const {email,password} = await req.body;
    if(!email ||!password) return res.status(401).send({message:"Invalid credentials"});
    
    const user = await userSchema.findOne({email: email});
    if(!user) return res.status(404).send({message:"User not found"});
    
    const validPassword = await user.comparePassword(password);
    if(!validPassword) return res.status(401).send({message:"Invalid credentials"});
    
    const token = await user.generateToken();
    res.cookie("token",token);
    res.status(200).send({message:"User logged in successfully",user:user});
}

export const logoutUser = async(req,res) =>{
    res.clearCookie("token");
    res.status(200).send({message:"User logged out successfully"});
}

export const authMiddleware = async(req,res,next) =>{
    const token = req.cookies.token;
    if(!token) return res.status(401).send({message:"Unauthorized"});
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userSchema.findById(decoded.id);
        if(!user) return res.status(404).send({message:"User not found"});
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).send({message:"Invalid token"});
    }
}

export const checkAuth = async(req,res,next) =>{
    res.status(200).send({message:"User Authenticated",user:req.user});
}
export const getUserProfile = async(req,res) =>{
    res.status(200).send({message:"User profile",user:req.user});
}

