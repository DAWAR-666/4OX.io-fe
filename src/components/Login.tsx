import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast ,{Toaster}from "react-hot-toast"
import { useAuthStore } from "../utils/authStore"
const Login = () => {
    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [login,setLogin]=useState(true)
    const navigate=useNavigate()
    const setUser=useAuthStore(state=>state.setUser)
    const handleLogin=async()=>{
        const apiUrl=import.meta.env.VITE_BASE_URL
        try{if(login){
            
            const response=await axios.post(`${apiUrl}/auth/login`,{userName,password},{withCredentials:true})
            
            setUser(response.data.data)
        }
        else{
            const response=await axios.post(`${apiUrl}/auth/signUp`,{userName,email,password},{withCredentials:true})
            setUser(response.data.data)
        }
    navigate("/")}catch (err:any){
            const errorMessage = err.response?.data?.message || "Something went wrong";
            toast(errorMessage)
        }
        
    }
  return (
    <div className="bg-black min-h-screen w-screen font-bold border-10 text-white flex justify-center items-center">
        <Toaster position='top-center'/>
        <form className="flex flex-col gap-3 w-1/3">
            <div className="text-center text-5xl">
                {login?'Sign in':'Sign up'}
            </div>
            <span>UserName</span>
            <input 
                required
                type="text" 
                placeholder="Enter UserName" 
                value={userName} 
                onChange={(e)=>{setUserName(e.target.value)}}
            />
            {!login&&
            <>
            <span>Email</span>
            <input 
                required
                type="email" 
                placeholder="Enter Email" 
                value={email} 
                onChange={(e)=>{setEmail(e.target.value)}}
            /></>}
            <span>Password</span>
            <input 
                required
                type="password" 
                placeholder="Enter Password" 
                value={password} 
                onChange={(e)=>{setPassword(e.target.value)}}
            />

                <button type="button" onClick={handleLogin}>{login?'Sign In':'Sign Up'}</button>
                <span onClick={()=>setLogin(!login)}>{login?'dont have an account? Sign up':'already registered? Sign in'}</span>
        </form>
        
    </div>
  )
}

export default Login