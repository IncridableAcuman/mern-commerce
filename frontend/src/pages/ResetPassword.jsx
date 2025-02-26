import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/api";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('accessToken')){
      navigate('/');
    }
  },[navigate])

  useEffect(() => {
    const tokenFormUrl = searchParams.get("token");
    if (tokenFormUrl) {
      setToken(tokenFormUrl);
    } else {
      console.error("Token not found in URL");
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if(password.length<8){
      toast.error("Password must be at least 8 characters long");
    }

    try {
       await axiosInstance.put("/auth/reset-password", {
        password,
        token,
      });

        toast.success("Password successfully updated");
        navigate("/login");
      
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md w-96">
          <h2 className="text-2xl text-center font-bold">Reset Password</h2>
          <form className="space-y-4" onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl border border-green-500 mt-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-xl border border-green-500 mt-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              className="w-full bg-green-500 text-white rounded-xl p-3 cursor-pointer hover:bg-green-600 transition"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;