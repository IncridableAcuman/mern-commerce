import { LogOut } from 'lucide-react';
import axiosInstance from "../api/api";
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate=useNavigate();

    const handleSubmit = async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            localStorage.removeItem("accessToken");
            navigate("/auth");
            toast.success("Logged out");
        } catch (error) {
            toast.error(error.message || "Internal Server Error");
        }
    }

  return (
    <div className='flex items-center justify-between py-4 px-4 sm:px-6 md:px-8 lg:px-10 shadow-md'>
        <h1 className='text-xl font-semibold text-amber-600'>Logo</h1>
        <LogOut className='text-amber-700 cursor-pointer hover:text-amber-300 transition duration-300' onClick={handleSubmit}/>
    </div>
  )
}

export default Navbar