import { toast } from "react-toastify"
import axiosInstance from "../api/api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const ForgotPassword = () => {

  const [email,setEmail]=useState("");
  const navigate = useNavigate();
  useEffect(()=>{
      if(localStorage.getItem('accessToken')){
        navigate('/');
      }
    },[navigate])

  const handleForgotPassword = async (e)=>{
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/forgot-password',{email});
      toast.success("Reset link sent to your email")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
    <div className="">
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadom-md w-96">
        <h2 className="text-2xl font-bold text-center mb-3">Forgot Password?</h2>
        <p className="text-sm text-gray-500 text-center">Enter your email and we`ll send you a reset link.</p>
        <form className="space-y-4" onSubmit={handleForgotPassword}>
          <input type="email" placeholder="Enter your email"
           className="w-full p-3 border rounded-xl mt-3 focus:outline-none focus:ring-2 focus:ring-gray-600"
           value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <button className="w-full bg-blue-500 text-white p-3 mb-2 rounded-xl cursor-pointer 
          hover:bg-blue-600 transition">Send Reset Link</button>
        </form>
      </div>
    </div>
    </div>
    
    </>
  )
}

export default ForgotPassword