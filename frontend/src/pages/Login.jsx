import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";

function Login(){
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error, setError] = useState("");

const navigate = useNavigate();

 async function handleSubmit(e){
e.preventDefault();
 try {
   const response= await axios.post("http://localhost:8000/api/users/login",{
       email,
       password
   });
   console.log(response.data);

   const token=response.data.token;
   localStorage.setItem("token",token);
    navigate("/dashboard");

 }catch (err) {
  console.log("Login error:", err.response?.data);

  setError(
    err.response?.data?.message ||
    err.message ||
    "Login failed"
  );
}
 };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
    
    {/* Texture Layer */}
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

    {/* Content Wrapper */}
    <div className="relative z-10 w-full flex justify-center">

      <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <span
            className="text-pink-400 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  </div>
);
}

export default Login;