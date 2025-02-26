import {useNavigate} from 'react-router-dom'
import {Sun} from 'lucide-react'
import { useEffect } from 'react';
const Auth = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('accessToken')){
      navigate('/');
    }
  },[navigate])
  return (
    <>
    <div className={` w-full h-screen`}>
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4">
        <div className="">
        <h1 className='text-2xl font-bold text-blue-600 cursor-pointer' onClick={()=>navigate('/auth')}>
        Web<span className='text-black hover:text-blue-600 transition'>Logo</span> </h1>
        </div>
        <div className="flex items-center gap-5">
        <button className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center w-10 h-10"
        >
          <Sun/>
        </button>
          <button className='border border-gray-400 px-5 py-2.5 rounded-full cursor-pointer
           hover:bg-gray-200 transition' onClick={()=>navigate('/login')}>Sign In</button>
        </div>
      </div>
      <div className="flex items-center justify-center text-center h-screen">
        <div className="">
          <h2 className='text-xl font-bold text-indigo-600 mb-4'>Hi Developer</h2>
          <h3 className="text-4xl font-bold text-indigo-600 mb-4">Build your dreams with our</h3>
          <button className='bg-gradient-to-br from-blue-300 to-indigo-600
           text-white font-semibold px-5 py-2.5 rounded
            shadow-lg cursor-pointer' onClick={()=>navigate('/login')}>Join Now </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Auth