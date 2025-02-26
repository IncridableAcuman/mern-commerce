import { createContext, useState } from "react"

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const login = (userData) =>{
        setUser(userData);
    }
    const logout = ()=>{
        setUser(null);
    }
  return(
    <AuthContext.Provider value={{user,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export  {AuthProvider,AuthContext}