
import mongoose from "mongoose"


// Define a schema for your users
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

// Create a model based on the schema
const User = mongoose.model("User", UserSchema);

// Export the User model for use in your application
export default User;
