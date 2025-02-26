import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Auth from './pages/Auth'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import PrivateRoutes from './Private/PrivateRoutes'
import {ToastContainer} from 'react-toastify'
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<PrivateRoutes element={<Home/>} />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/auth' element={<Auth/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
    </Routes>
    </>
    
  )
}

export default App