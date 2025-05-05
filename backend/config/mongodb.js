import mongoose from "mongoose";


const connectDB = async () => {

    await mongoose.connect(process.env.MONGO_URI,{
        dbName:"e-commerce"
    })
     .then((c)=> console.log(`Database connected with ${c.connection.host}`))
     .catch((e)=> console.log(e))
}


export default connectDB;