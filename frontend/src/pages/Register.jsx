import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
import API from "../services/api";

function Register() {
const navigate=useNavigate();

const [formData,setFormData]=useState({
name:"",
email:"",
password:""
});

 const [error, setError] = useState("");


function handleChange(e){
 setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};

async function handleSubmit(e) {
    e.preventDefault();

    try {
        const response=await axios.post(`${API}/users/register`,
            formData
        );

        console.log("Registered successfuly: ", response.data);

        navigate("/");

    } catch (error) {
        console.log("register error:" , error.response?.data);
       setError(
  error.response?.data?.message ||
  error.message ||
  "Registration failed"
);
    }
    
}

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
    
    {/* Texture */}
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

    {/* Glow Effects */}
    <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
    <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

    {/* Content */}
    <div className="relative z-10 w-full flex justify-center">

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
          >
            Register
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-pink-400 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  </div>
);

}

export default Register;