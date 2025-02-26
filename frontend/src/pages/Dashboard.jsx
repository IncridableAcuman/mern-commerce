import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {LogOutIcon} from 'lucide-react'
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/api";
import { toast } from "react-toastify";


const data = [
  { name: "Yanvar", sales: 4000 },
  { name: "Fevral", sales: 3000 },
  { name: "Mart", sales: 5000 },
  { name: "Aprel", sales: 7000 },
  { name: "May", sales: 6000 },
];


export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    const handleLogout = async ()=>{
        try {
             await axiosInstance.post('/auth/logout');
            localStorage.removeItem('accessToken');
            toast.success("Successfully");
            navigate('/auth');
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    try {
         await axiosInstance.post('/auth/logout');
        localStorage.removeItem('accessToken');
        toast.success("Logged out");
        navigate('/auth');
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
}

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      {/* Navbar */}
      <nav className="p-4 bg-blue-600 text-white flex justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-800 px-4 py-2 rounded">{darkMode ? "Light" : "Dark"} Mode</button>
        <LogOutIcon className="cursor-pointer hover:text-indigo-900 transition" onClick={handleLogout}/>
      </nav>

      {/* Main Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Statistic Cards */}
        <div className="bg-white shadow-md p-6 rounded-lg text-center dark:bg-gray-800">
          <h2 className="text-lg font-semibold">Foydalanuvchilar</h2>
          <p className="text-3xl font-bold">1,245</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center dark:bg-gray-800">
          <h2 className="text-lg font-semibold">Sotuvlar</h2>
          <p className="text-3xl font-bold">$12,340</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center dark:bg-gray-800">
          <h2 className="text-lg font-semibold">Buyurtmalar</h2>
          <p className="text-3xl font-bold">320</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center dark:bg-gray-800">
          <h2 className="text-lg font-semibold">Xizmatlar</h2>
          <p className="text-3xl font-bold">58</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Sotuvlar Statistikasi</h2>
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke={darkMode ? "#ffffff" : "#000000"} />
              <YAxis stroke={darkMode ? "#ffffff" : "#000000"} />
              <Tooltip wrapperStyle={{ backgroundColor: "#fff", padding: "5px", borderRadius: "5px" }} />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
