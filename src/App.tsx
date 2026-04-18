import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import { useEffect } from "react"
import { useAuthStore } from "./utils/authStore"
import axios from "axios"
import Login from "./components/Login"
import GamePage from "./components/GamePage"

const App = () => {
  const setUser=useAuthStore(state=>state.setUser)
  const loggedinUser=useAuthStore(state=>state.user)
  const fetchUser=async()=>{
    if(!loggedinUser){
      const apiUrl = import.meta.env.VITE_BASE_URL;
      const user=await axios.get(`${apiUrl}/user/profile`,{withCredentials:true})
      setUser(user.data.data.safeUser)
    }    
  }
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/:roomId" element ={<GamePage/>}/>
        </Routes>  
      </BrowserRouter>
    </div>
  )
}

export default App