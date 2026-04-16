import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../utils/authStore"
import { useState } from "react"
import AnimatedBackground from "../ui/pathDrawing"
import Header from "./Header"
const Body = () => {
    const navigate=useNavigate()
    const user=useAuthStore(state=>state.user)
    console.log(user)
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
        {user&&<Header/>}
        <div className="h-screen flex justify-center items-center z-1 ">
            <div className="flex flex-col bg-black/50 text-white p-30">
                <span className="text-7xl md:text-8xl lg:text-9xl font-extrabold animate-fade-in ">
                    4OX.io
                </span>
                <span className="text-center text-xl font-black text-[#8df0cc] ">
                    Tic-Tac-Toe but with only 4 pieces at time
                </span>
                {!playChoices&&
                <button 
                    className="border-2 border-[#8df0cc] w-1/2 mx-auto mt-5 animate-fade-in text-4xl py-2 rounded-4xl bg-[#0d63f8] hover:bg-[#ff0088] cursor-pointer transition-colors font-extrabold"
                    onClick={handlePlay}
                >
                    PLAY
                </button>}
                {
                    playChoices &&
                    <>
                    <div className="gap-2 w-full flex justify-center mt-5">
                    <button className="border-2 border-[#8df0cc] w-1/2 mx-auto animate-fade-in text-3xl p-2 rounded-4xl bg-[#0d63f8] hover:bg-[#ff0088] cursor-pointer transition-colors font-extrabold"
                    >CREATE</button>
                    <button className="border-2 border-[#8df0cc] w-1/2 mx-auto animate-fade-in text-3xl p-2 rounded-4xl bg-[#0d63f8] hover:bg-[#ff0088] cursor-pointer transition-colors font-extrabold"
                    >JOIN</button>
                    </div>
                    <div className="w-full justify-center flex">
                        <button className="border-2 border-[#8df0cc] animate-fade-in text-xl p-2 rounded-4xl bg-[#0d63f8] hover:bg-[#ff0088] cursor-pointer transition-colors font-extrabold"
                        onClick={()=>{setPlayChoices(false)}}
                    >BACK</button>
                    </div>
                    </>
                }
            </div>
            
        </div>
    </div>
  )
}

export default Body