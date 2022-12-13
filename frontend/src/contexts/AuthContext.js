import Cookies from 'js-cookie'
import React,{useContext, createContext, useState, useEffect} from 'react'
const AuthContext = createContext()
export function useAuth(){
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [token, setToken ] = useState(null);

    useEffect(()=>{
        resolveAuth();
    },[])
    
    const resolveAuth = async() =>{
        if(Cookies.get('token')){
            setToken(Cookies.get('token'));
        }
        setLoading(false);
    }

    const value = {
        loading,
        token,
        setToken
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export {AuthProvider, AuthContext}