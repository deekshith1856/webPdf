
import mongoose, { Schema } from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 35,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

}, { timestamps: true })
const User = mongoose.model("User", UserSchema);
export default User;
