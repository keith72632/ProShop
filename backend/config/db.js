import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        const connect = await mongoose.connect("mongodb+srv://thinmint:tigers10@clusterk.98gsi.mongodb.net/proshop?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline)
    } catch(error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
};

export default connectDB