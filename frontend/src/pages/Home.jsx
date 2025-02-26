import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Dashboard from "./Dashboard";

const Home = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('accessToken')){
      navigate('/auth')
    }
  },[navigate])
  return (
    <>
    <Dashboard/>
    </>
  )
}

export default Home