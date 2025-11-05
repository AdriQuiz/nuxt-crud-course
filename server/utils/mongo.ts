import mongoose from "mongoose";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI as string)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch(error => console.error('Error connecting to MongoDB: ', error));
}

export default mongoose;