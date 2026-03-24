import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/transactions",transactionRoutes);

app.get("/",(req,res)=>{
    res.send("api is running..");
});

const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


