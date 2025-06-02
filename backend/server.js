import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"



const app = express();
const port =  process.env.PORT || 4000
connectDB() 
connectCloudinary()


//middleware
app.use(express.json())
app.use(cors({
    origin:"https://full-working-ecommerce-wb3b.vercel.app",
    credentials:true
}))
 



// api endpoints
app.use('/api/v1/user',userRouter)
app.use('/api/v1/product',productRouter)

app.get('/', (req,res)=>{
    res.send("API WORKING");
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})