import { useState,useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

function Dashboard() {

const navigate = useNavigate();
const [transactions, setTransactions] = useState([]);

const [summary, setSummary] = useState({
  totalIncome: 0,
  totalExpense: 0,
  balance: 0
});

const [formData, setFormData] = useState({
  amount: "",
  category: "",
  type: "expense",
  date: ""
});

const [filters, setFilters] = useState({
  type: "",
  category: "",
  month: "",
  year: ""
});

 async function fetchTransations() {
    try{
     const token = localStorage.getItem("token");
     const response = await axios.get(
   "http://localhost:8000/api/transactions",
   {
      headers: {
         Authorization: `Bearer ${token}`
      },
      params: filters  
   }
);
setTransactions(response.data.transactions);
    }
    catch(error){
 console.log(
      "Fetch transactions error:",
      error.response?.data || error.message
    );
  }
    };


 async function fetchSummary() {
     try{  const token = localStorage.getItem("token");
             const response = await axios.get(
   "http://localhost:8000/api/transactions/summary",
   {
      headers: {
         Authorization: `Bearer ${token}`
      }
   }
);
console.log("Summary response:", response.data);
setSummary(response.data);
     }
     catch(error){
         console.log( "Summary error:",error.response?.data || error.message);
     }
 };



 function handleChange(e) {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
}

async function handleSubmit(e) {
  e.preventDefault();
   try {
  const token=localStorage.getItem("token");

  const response=await axios.post("http://localhost:8000/api/transactions/add",
    formData,
    {
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }
  );

const newtransaction=response.data.transaction;


  setTransactions(prev=>[newtransaction,...prev]);

    await fetchSummary();

  // reset the form

  setFormData({
    amount:"",
    category:"",
    type:"expense",
    date:""
  });

 } catch (error) {
    console.log("Add transaction error:" , error.response?.data||error.message);
 }
}

async function handleDelete(id){
 try {
    
    const token=localStorage.getItem("token");

    const response=await axios.delete(`http://localhost:8000/api/transactions/${id}`,
        {
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }
 );
 setTransactions(prev=>
    prev.filter(t => t._id !== id)
 );

 await fetchSummary();

 }catch (error) {
    console.log(
      "Delete error:",
      error.response?.data || error.message
    );
    
 }

}

useEffect(() => {

  fetchTransations();

}, [filters]);  //Run this effect whenever filters changes.

useEffect(()=>{
    
    fetchSummary();

},[]);

function handleFilterChange(e) { /// it will only update the filter state ...
  setFilters(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
}

function handleLogout(e){
localStorage.clear();
 navigate("/");
};
return (
 <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6"
>


{/* HEADER */}
<div className="relative mb-10 rounded-2xl overflow-hidden">

  {/* Background Gradient */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-pink-900 opacity-80"></div>

  {/* Texture */}
  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>

  {/* Glow Effect */}
  <div className="absolute w-72 h-72 bg-pink-500 blur-3xl opacity-20 top-0 left-10"></div>
  <div className="absolute w-72 h-72 bg-purple-500 blur-3xl opacity-20 bottom-0 right-10"></div>

  {/* Content */}
  <div className="relative z-10 flex justify-between items-center px-6 py-5">

    <div>
      <h1 className="text-2xl font-bold tracking-wide">
       <div className="flex items-center gap-2">
 
  <h1 className="text-2xl font-bold">SpendTrack </h1>
   <span className="text-2xl">📊 </span>
</div>
      </h1>
      <p className="text-gray-300 text-sm">
        Manage your money smartly ✨
      </p>
    </div>

    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition"
    >
      Logout
    </button>

  </div>
</div>

    {/* SUMMARY CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

      {/* INCOME */}
     <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg 
hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] 
transition-all duration-300">
        <p className="text-gray-400">Total Income</p>
        <h2 className="text-2xl font-bold text-green-400">
          ₹ {summary.totalIncome}
        </h2>
      </div>

      {/* EXPENSE */}
     <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg 
hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] 
transition-all duration-300">
        <p className="text-gray-400">Total Expense</p>
        <h2 className="text-2xl font-bold text-red-400">
          ₹ {summary.totalExpense}
        </h2>
      </div>

      {/* BALANCE */}
<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg 
hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] 
transition-all duration-300">
        <p className="text-gray-400">Balance</p>
        <h2 className="text-2xl font-bold text-purple-400">
          ₹ {summary.balance}
        </h2>
      </div>

    </div>
    
    {/* MAIN CONTENT */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* LEFT SIDE → FORM */}
  <motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg"
>

    <h2 className="text-xl font-semibold mb-4">➕ Add Transaction</h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10"
      />

      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 active:scale-95 transition"
      >
        Add Transaction
      </button>

    </form>
</motion.div>

  {/* RIGHT SIDE → TRANSACTIONS */}
  <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg">

    <h2 className="text-xl font-semibold mb-4">📃 Transactions</h2>

    {/* FILTERS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">

      <select
        name="type"
        value={filters.type}
        onChange={handleFilterChange}
        className="px-3 py-2 rounded bg-white/10 border border-white/10"
      >
        <option value="">All</option>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={filters.category}
        onChange={handleFilterChange}
        className="px-3 py-2 rounded bg-white/10 border border-white/10"
      />

      <input
        type="number"
        name="month"
        placeholder="Month"
        value={filters.month}
        onChange={handleFilterChange}
        className="px-3 py-2 rounded bg-white/10 border border-white/10"
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={filters.year}
        onChange={handleFilterChange}
        className="px-3 py-2 rounded bg-white/10 border border-white/10"
      />

    </div>

    {/* TRANSACTION LIST */}
    <div className="space-y-3 max-h-[400px] overflow-y-auto">

     {transactions.map((t, index) => (
  <motion.div
    key={t._id}
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="flex justify-between items-center bg-white/10 p-3 rounded-lg 
    hover:bg-white/20 hover:scale-[1.02] transition-all duration-200"
  >
    <div>
      <p className="font-semibold">₹ {t.amount}</p>
      <p className="text-sm text-gray-400">{t.category}</p>
      <p className="text-xs text-gray-500">
        {new Date(t.date).toLocaleDateString()}
      </p>
    </div>

    <div className="flex items-center gap-3">
      <span
        className={`text-sm ${
          t.type === "income" ? "text-green-400" : "text-red-400"
        }`}
      >
        {t.type}
      </span>

      <button
        onClick={() => handleDelete(t._id)}
        className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 hover:scale-110 active:scale-95 transition"
      >
        ✕
      </button>
    </div>
  </motion.div>
))}

    </div>

  </div>

</div>

</motion.div>
  
);
 
}

export default Dashboard;