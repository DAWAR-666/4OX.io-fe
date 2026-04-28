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
            
            const response=await axios.post(`${apiUrl}auth/login`,{userName,password},{withCredentials:true})
            
            setUser(response.data.data)
        }
        else{
            const response=await axios.post(`${apiUrl}auth/signUp`,{userName,email,password},{withCredentials:true})
            setUser(response.data.data)
        }
    navigate("/")}catch (err:any){
            const errorMessage = err.response?.data?.message || "Something went wrong";
            toast.error(errorMessage,{className:'font-extrabold'})
        }
        
    }
  return (
    <div className="bg-black min-h-screen w-screen font-bold neon-border text-white flex  justify-center items-center">
        <Toaster position='top-center'/>
        <form className="flex flex-col animate-fade-in gap-3 w-1/2 md:w-1/4">
            <div className="text-center text-2xl tracking-tighter md:text-4xl font-['Press_Start_2p'] text-[#8df0cc]">
                {login?'Sign in':'Sign up'}
            </div>
            <span className="font-['Press_Start_2p'] text-md tracking-tighter text-[#0d63f8]">UserName</span>
            <input 
                required
                type="text" 
                placeholder="Enter UserName" 
                value={userName} 
                onChange={(e)=>{setUserName(e.target.value)}}
                className="border-b-2 border-[#ff0088] text-center focus:outline-none p-1 text-lg"
            />
            {!login&&
            <>
            <span className="font-['Press_Start_2p'] text-md tracking-tighter text-[#0d63f8]">Email</span>
            <input 
                required
                type="email" 
                placeholder="Enter Email" 
                value={email} 
                onChange={(e)=>{setEmail(e.target.value)}}
                className="border-b-2 text-center focus:outline-none p-1 border-[#ff0088] text-lg"
            /></>}
            <span className="font-['Press_Start_2p'] text-md tracking-tighter text-[#0d63f8]">Password</span>
            <input 
                required
                type="password" 
                placeholder="Enter Password" 
                value={password} 
                onChange={(e)=>{setPassword(e.target.value)}}
                className="border-b-2 text-center focus:outline-none p-1 border-[#ff0088] text-lg"
            />

                <button 
                    type="button" 
                    onClick={handleLogin} 
                    className="bg-[#ff0088] rounded-full font-['Press_Start_2P'] hover:bg-[#8df0cc] transition-all hover:text-[#ff0088]"
                >
                    {login?'Sign In':'Sign Up'}
                </button>
                <span 
                    className='text-center text-[#8df0cc]' 
                    onClick={()=>setLogin(!login)}>{login?'dont have an account? Sign up':'already registered? Sign in'}</span>
        </form>
        
    </div>
  )
}

export default Login