import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export async function addTransaction(req,res) {
   try {
     const { amount, category, type, date } = req.body;
     if(!amount || !category || !type || !date ){
          return res.status(400).json({message:"all fields are required"});
     }
 
     const transaction=await Transaction.create({
         amount,
         category,
         type,
         date,
         user:req.user.id
     });

     return res.status(201).json({message:"Transaction added successfully",transaction});
   } catch (error) {
     console.error("Add transaction error:", error);
    return res.status(500).json({ message: "Server error" });
   }



}

export async function getTransactions(req,res) {
    try {
        const filter = { user: req.user.id };

        if (req.query.type) {
   filter.type = req.query.type;
         }
        if(req.query.category){
            filter.category=req.query.category;
        }
      if (req.query.month && req.query.year) {
   const month = parseInt(req.query.month) - 1;
   const year = parseInt(req.query.year);

   const startDate = new Date(year, month, 1);
   const endDate = new Date(year, month + 1, 1);

   filter.date = { $gte: startDate, $lt: endDate };
         }
         
         const transactions = await Transaction
   .find(filter)
   .sort({ date: -1 });

     return res.status(200).json({
      message: "Transactions fetched successfully",
      transactions
    });

    } catch (error) {
      console.error("Get transactions error:", error);
    return res.status(500).json({ message: "Server error" });
    }
}

export async function deleteTransaction(req,res) {
    try {
        const id=req.params.id;
        const transaction=await Transaction.findById(id);
        if(!transaction){
            return res.status(404).json({message:"Transaction not found"});

        }
// here we are checking the  ownership 
         if (transaction.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this transaction" });
    }


 await transaction.deleteOne();

    return res.status(200).json({ message: "Transaction deleted successfully" });


    } catch (error) {
    console.error("Delete transaction error:", error);
    return res.status(500).json({ message: "Server error" });
}
}

export async function getSummary(req, res) {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);  //Aggregation requires exact type match.String will not match ObjectId properly.

    const summary = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    summary.forEach(item => {
      if (item._id === "income") {
        totalIncome = item.total;
      } else if (item._id === "expense") {
        totalExpense = item.total;
      }
    });

    return res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    });

  } catch (error) {
    console.error("Summary error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

