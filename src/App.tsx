import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import { useEffect } from "react"
import { useAuthStore } from "./utils/authStore"
import axios from "axios"

const App = () => {
  const setUser=useAuthStore(state=>state.setUser)
  const loggedinUser=useAuthStore(state=>state.user)
  const fetchUser=async()=>{
    if(!loggedinUser){
      const apiUrl = import.meta.env.VITE_BASE_URL;
      const user=await axios.get(`${apiUrl}/user/profile`,{withCredentials:true})
      setUser(user.data.data)
    }    
  }
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body/>}>

          </Route>
        </Routes>  
      </BrowserRouter>
    </div>
  )
}

export default App