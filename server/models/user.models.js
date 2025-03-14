import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"] , default: "user"},
    createAt: { type:Date, required: true, default: new Date},
});

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.generateToken = async function(){
    const token = jwt.sign({ id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET);
    return token;
}


export default mongoose.model("User", userSchema);