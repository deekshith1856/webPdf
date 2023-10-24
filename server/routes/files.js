
import multer from "multer";
import express from 'express';
import { getUploads, splitPdf, uploadPdf } from "../controllers/files.js";
import verifyToken from "../middlewares/verifyToken.js";
// import path from 'path'

const router = express.Router();

const split = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // Specify the directory where you want to save the files ('./upload' directory)

            cb(null, '../server/upload');
        },
        filename: (req, file, cb) => {
            // Define the filename for the uploaded file (e.g., use the original name)
            cb(null, Date.now() + file.originalname);
        },
    })
})
// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router.get('/myuploads', verifyToken, getUploads);

router.post('/split', split.single('file'), splitPdf)


router.post('/cloud', verifyToken, upload.array('pdfFiles', 5), uploadPdf)



export default router;