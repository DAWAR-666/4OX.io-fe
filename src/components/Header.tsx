import { useAuthStore } from "../utils/authStore"
import axios from "axios"

const Header = () => {
    const setUser=useAuthStore(state=>state.setUser)
    const apiUrl=import.meta.env.VITE_BASE_URL
    const handleLogout=async()=>{
        setUser(null)
        await axios.post(`${apiUrl}/auth/logout`,{},{withCredentials:true})
    }
  return (
    <div>
        <button className="fixed border-2 text-white text-4xl hover:bg-amber-300 "
        onClick={handleLogout}
        >logout</button>
    </div>
  )
}

export default Header