// Import the dotenv library to load environment variables from a .env file
import * as dotenv from 'dotenv';

// Load environment variables from the .env file into process.env
dotenv.config();

// Export a configuration object with Firebase settings
export default {
    firebaseConfig: {
        apiKey: process.env.API_KEY, // Your Firebase API Key
        authDomain: process.env.AUTH_DOMAIN, // Your Firebase Auth Domain
        projectId: process.env.PROJECT_ID, // Your Firebase Project ID
        databaseURL: process.env.FIRESTORE_DB_URL, // Your Firebase Firestore Database URL
        storageBucket: process.env.STORAGE_BUCKET, // Your Firebase Storage Bucket
        messagingSenderId: process.env.MESSAGING_SENDER_ID, // Your Firebase Messaging Sender ID
        appId: process.env.APP_ID, // Your Firebase App ID
        measurementId: process.env.MEASUREMENT_ID, // Your Firebase Measurement ID (optional)
    },
};
