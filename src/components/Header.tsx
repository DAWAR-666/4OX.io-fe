import { useAuthStore } from "../utils/authStore"
import axios from "axios"

const Header = () => {
    const setUser=useAuthStore(state=>state.setUser)
    const user=useAuthStore(state=>state.user)
    console.log(user)
    const apiUrl=import.meta.env.VITE_BASE_URL
    const handleLogout=async()=>{
        setUser(null)
        await axios.post(`${apiUrl}/auth/logout`,{},{withCredentials:true})
    }
  return (
    <div className="text-white bg-white/75 w-full fixed">
      {user!.userName}
        <button className="border-2 text-white text-4xl hover:bg-amber-300 "
        onClick={handleLogout}
        >logout</button>
    </div>
  )
}

export default Header