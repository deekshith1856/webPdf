import mongoose from "mongoose";

// Define a schema for your files
const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    }

}, { timestamps: true })

// Create a model based on the schema
const FileModel = mongoose.model('FileModel', fileSchema);
export default FileModel;