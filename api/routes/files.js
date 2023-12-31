import multer from "multer";
import express from 'express';
import { getUploads, splitPdf, uploadPdf } from "../controllers/files.js";
import verifyToken from "../middlewares/verifyToken.js";

// Create an Express Router
const router = express.Router();

// Define a multer instance for temporary in-memory file storage
const upload = multer({ storage: multer.memoryStorage() });

// Route to get user uploads (requires token verification)
router.get('/myuploads', verifyToken, getUploads);

// Route to split a PDF file (uses the 'split' multer middleware)
router.post('/split', upload.single('file'), splitPdf);

// Route to upload multiple PDF files to the cloud (requires token verification)
router.post('/cloud', verifyToken, upload.array('pdfFiles', 5), uploadPdf);

// Export the router for use in your application
export default router;
