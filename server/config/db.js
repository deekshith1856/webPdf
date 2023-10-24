import mongoose from "mongoose";



const connectionUrl = process.env.MONGO_URI;


mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Connection to data base established`, mongoose.connection.host)
}).catch((error) => {
    console.log(error);
})
export default mongoose.connection;