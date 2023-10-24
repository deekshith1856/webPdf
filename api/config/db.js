// Import the mongoose library for MongoDB
import mongoose from "mongoose";


// Get the MongoDB connection URL from environment variables
const connectionUrl = process.env.MONGO_URI;

// Connect to the MongoDB database using the connection URL
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,  // Use the new URL parser
    useUnifiedTopology: true,// Use the new Server Discover and Monitoring engine

}).then(() => {

    // Connection successful, log the host of the database
    console.log(`Connection to data base established`, mongoose.connection.host)
}).catch((error) => {

    // An error occurred while connecting to the database, log the error
    console.log(error);
})


// Export the MongoDB connection for use in other parts of your application
export default mongoose.connection;