import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: String,
        email: String,
        age: Number
    }
)


export default mongoose.model('User', userSchema)