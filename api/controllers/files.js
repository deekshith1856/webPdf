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
            res.status(500).send('File upload failed')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}
const uploadPdf = (req, res, next) => {
    try {

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

            results.map(async (result) => {
                await FileModel.create({
                    fileName: result.name,
                    fileUrl: result.downloadURL,
                    userId: req.user._id
                })
            })
            console.log('Files successfully uploaded.');
            res.send({
                message: 'Files uploaded to Firebase Storage',

            });

        }).catch((error) => { res.status(400).send(error.message) })
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}
const getUploads = async (req, res, next) => {
    try {
        console.log(req.query);
        const sortBy = req.query.sortBy || 1;
        const currentPage = req.query.currentPage || 1;
        const dataPerPage = req.query.dataPerPage || 10;


        const data = await FileModel.find({ userId: req.user._id })
            .sort({ createdAt: sortBy }).skip((currentPage - 1) * dataPerPage).limit(dataPerPage)
        const dataCount = await FileModel.countDocuments({ userId: req.user._id })

        if (!data) {
            res.status(200).send({ message: 'No data' })
        }
        else {
            res.status(200).send({ data, dataCount: Math.floor(dataCount / dataPerPage) });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message })
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