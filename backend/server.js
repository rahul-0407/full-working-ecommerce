import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"




const app = express();
const port =  process.env.PORT || 4000
connectDB() 
connectCloudinary()


const allowedOrigins = ['https://full-working-ecommerce-wb3b.vercel.app', 'https://full-working-ecommerce-jqoc.vercel.app', 'http://localhost:5173','http://localhost:5174'];

//middleware
app.use(express.json())
app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));



// api endpoints
app.use('/api/v1/user',userRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/order',orderRouter)

app.get('/', (req,res)=>{
    res.send("API WORKING");
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})