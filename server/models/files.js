import mongoose from "mongoose";

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
        ref: 'User',
        required: true
    }

}, { timestamps: true })

const FileModel = mongoose.model('FileModel', fileSchema);
export default FileModel;