import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [userName,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [login,setLogin]=useState(true)
    const navigate=useNavigate()
    const handleLogin=()=>{
        const apiUrl=import.meta.env.VITE_BASE_URL
        if(login){
            
            axios.post(`${apiUrl}/auth/login`,{userName,password},{withCredentials:true})
        }
        else{
            axios.post(`${apiUrl}/auth/signUp`,{userName,email,password},{withCredentials:true})
        }
        navigate("/")
    }
  return (
    <div className="bg-black min-h-screen w-screen font-bold border-10 text-white flex justify-center items-center">
        
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

                <button onClick={handleLogin}>{login?'Sign In':'Sign Up'}</button>
                <span onClick={()=>setLogin(!login)}>{login?'dont have an account? Sign up':'already registered? Sign in'}</span>
        </form>
        
    </div>
  )
}

export default Login