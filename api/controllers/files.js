import { PDFDocument } from 'pdf-lib';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import config from "../config/firebase.config.js"
import FileModel from '../models/files.js';


const splitPdf = async (req, res, next) => {
    try {
        //Access the uploaded file as buffer
        const uploadedFileBuffer = req.file.buffer;

        const pages = req.body.pages;
        if (uploadedFileBuffer) {
            //file saved successfully

            //create new pdf document
            const pdfDoc = await PDFDocument.create();
            const pdfDoc2 = await PDFDocument.load(uploadedFileBuffer);

            const copiedPages = await pdfDoc.copyPages(pdfDoc2, pages.length > 1 ? pages.map(pageNumber => pageNumber - 1) : [pages[0] - 1])

            // Add a page to the new PDF
            copiedPages.map((val) => pdfDoc.addPage(val));

            // Serialize the new PDF document to bytes
            const newPdfBytes = await pdfDoc.save();

            // Write the new PDF to a file
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="new.pdf"');
            res.send(newPdfBytes);

        }
        else {
            // File not saved
            const error = new Error('Failed to process the files')

            error.status = 401; // Set the status code for the error

            throw error;


        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}
const uploadPdf = (req, res, next) => {
    try {
        //if no files are sent to server
        if (req.files.length < 1) {
            const error = new Error('No files present')

            error.status = 401; // Set the status code for the error

            throw error;

        }
        //Initialize a firebase application
        initializeApp(config.firebaseConfig);
        // Initialize Cloud Storage and get a reference to the service
        const storage = getStorage();
        const dateTime = giveCurrentDateTime();
        const promises = req.files.map(async (file) => {
            const storageRef = ref(storage, `files/${file.originalname + "       " + dateTime}`);

            // Create file metadata including the content type


            const metadata = {
                contentType: file.mimetype,
            };

            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);
            return {
                message: 'file uploaded to firebase storage',
                name: file.originalname,
                type: file.mimetype,
                downloadURL: downloadURL
            }


        })
        Promise.all(promises).then((results) => {
            // Handle the results of the promises returned by FileModel.create()
            results.map(async (result) => {
                // Create a new document in the FileModel collection for each result
                await FileModel.create({
                    fileName: result.name,
                    fileUrl: result.downloadURL,
                    userId: req.user._id
                })
            })
            // Send a response after all FileModel.create() promises have resolved
            res.send({
                message: 'Files uploaded to Firebase Storage',

            });

        }).catch((error) => {
            console.log(error);
            next(error)
        })
    } catch (error) {

        console.log(error)
        // Handle any errors that occur in the Promise.all() or FileModel.create() process
        next(error);
    }
}
const getUploads = async (req, res, next) => {
    try {
        const sortBy = req.query.sortBy || 1;
        const currentPage = req.query.currentPage || 1;
        const dataPerPage = req.query.dataPerPage || 10;


        const data = await FileModel.find({ userId: req.user._id })
            .sort({ createdAt: sortBy }).skip((currentPage - 1) * dataPerPage).limit(dataPerPage)
        const dataCount = await FileModel.countDocuments({ userId: req.user._id })

        if (!data) {
            const error = new Error('data not avaiable')

            error.status = 401; // Set the status code for the error

            throw error;
        }
        else {
            res.status(200).send({ data, dataCount: Math.floor(dataCount / dataPerPage) });
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}



const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}
export { splitPdf, uploadPdf, getUploads }