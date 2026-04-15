import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../utils/authStore"
import { useState } from "react"
import AnimatedBackground from "../ui/pathDrawing"
const Body = () => {
    const navigate=useNavigate()
    const user=useAuthStore(state=>state.user)
    const [playChoices,setPlayChoices]=useState(false)
    const handlePlay=()=>{
        if(!user){
            navigate('/login')
        }
        else{
            setPlayChoices(true)
        }
    }
    return (
    
    <div className="bg-black/70 w-screen min-h-screen overflow-hidden ">
        <AnimatedBackground/>
        <div className=""></div>
    </div>
  )
}

export default Body