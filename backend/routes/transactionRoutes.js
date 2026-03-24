import express from "express";
import { addTransaction,getTransactions,deleteTransaction,getSummary } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/add",protect,addTransaction);
router.get("/",protect,getTransactions);
router.delete("/:id",protect,deleteTransaction);
router.get("/summary", protect, getSummary);

export default router;