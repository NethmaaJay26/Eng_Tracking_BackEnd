import mongoose, { connect } from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://kavindudananjaya02:kavindudananjaya02@cluster0.e1ybuam.mongodb.net/gg').then(()=>console.log("DB Connected"))
}