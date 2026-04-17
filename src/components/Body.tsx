import { useNavigate } from "react-router-dom"
import { useAuthStore, useRoomStore } from "../utils/authStore"
import { useEffect, useState } from "react"
import AnimatedBackground from "../ui/pathDrawing"
import Header from "./Header"
import LoadingDots from "../ui/loadingDots"
import toast from "react-hot-toast"
import axios from "axios"

const Body = () => {
    const navigate=useNavigate()
    const user=useAuthStore(state=>state.user)
    const [playChoices,setPlayChoices]=useState(false)
    const [join,setJoin]=useState(false)
    const [roomId,setRoomId]=useState("")
    const [loading,setLoading]=useState(false)
    const apiUrl=import.meta.env.VITE_BASE_URL
    const setRoom=useRoomStore(state=>state.setRoom)

    useEffect(()=>{
        if (!user) {
        setPlayChoices(false);
        setJoin(false);
        setRoomId("");
        setLoading(false);
    }
    },[user])

    const handlePlay=()=>{
        if(!user){
            navigate('/login')
        }
        else{
            setPlayChoices(true)
        }
    }
    const handleJoinOne=()=>{
        setPlayChoices(false)
        setJoin(true)
    }
    const handleJoinTwo=async()=>{
        try{
            if(roomId.length<6){
                toast.error('INVALID ROOM ID',{className:'font-extrabold'})
            }else{ 
                setPlayChoices(false)
                setJoin(false)
                setLoading(true)
                const response=await axios.post(`${apiUrl}/room/join`,{roomId},{withCredentials:true})
                setRoom(response.data.data)
                navigate(`/${roomId}`)
                toast.success('Room Joined')
            }
        }catch(err:any){
            const errorMessage = err.response?.data?.message || "Something went wrong";
            const errStatus=err.status
            if(errStatus===494){
                navigate(`/${roomId}`)
            }
            toast.error(errorMessage,{className:'font-extrabold'})
        }finally{
            setLoading(false)
            setRoomId("")
        }
        
        
        
    }
    const handleBack=()=>{
        if(join){
            setRoomId("")
            setJoin(false)
            setPlayChoices(true)
        }
        else if(playChoices){
            setPlayChoices(false)
        }
        
    }
    const handleCreate=async()=>{
        try{
            setPlayChoices(false)
            setLoading(true)
            const response=await axios.post(`${apiUrl}/room/create`,{},{withCredentials:true})
            setRoom(response.data.data)
            const roomId=response.data.data.roomId
            navigate(`/${roomId}`)
            toast.success('Room created '+roomId,{className:'font-extrabold'})
        }catch(err:any){
            const errorMessage = err.response?.data?.message || "Something went wrong";
            toast.error(errorMessage,{className:'font-extrabold'})
        }finally{
            setLoading(false)
        }
    }
    return (
    
    <div className="bg-black/70 w-screen min-h-screen overflow-hidden ">
        <AnimatedBackground/>
        {user&&<Header/>}
        <div className="h-screen flex justify-center items-center z-1 ">
            <div className="flex flex-col bg-black/50 text-white p-30">
                <span className="text-7xl md:text-8xl lg:text-9xl text-center font-extrabold animate-fade-in ">
                    4OX.io
                </span>
                <span className="text-center text-xl font-black text-[#8df0cc] ">
                    Tic-Tac-Toe but with only 4 pieces at time
                </span>
                {
                    loading &&
                    <div className="mt-10">
                        <LoadingDots/>
                    </div>
                }
                {!(playChoices||join||loading)&&
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
                        onClick={handleCreate}
                    >CREATE</button>
                    <button className="border-2 border-[#8df0cc] w-1/2 mx-auto animate-fade-in text-3xl p-2 rounded-4xl bg-[#0d63f8] hover:bg-[#ff0088] cursor-pointer transition-colors font-extrabold"
                    onClick={handleJoinOne}
                    >JOIN</button>
                    </div>
                    
                    </>
                }
                {
                    join &&
                    <div className="mb-2 w-full flex flex-col justify-center mt-5">
                        <span className="text-center text-[#ff0088] font-extrabold text-4xl">Room Id</span>
                        <input 
                            type="text" 
                            maxLength={6}
                            autoFocus
                            value={roomId}
                            onChange={(e)=>{setRoomId(e.target.value.toUpperCase())}} 
                            className="text-center border-2 border-[#8df0cc] focus:outline-none focus:border-[#ff0088] focus:border-2  w-1/2 mx-auto animate-fade-in text-3xl p-3  rounded-4xl bg-[#0d63f8] cursor-pointer font-extrabold"
                        />  
                    </div>
                }
                {
                    (playChoices||join)&&
                    <div className="w-full justify-around flex">
                        <button className="border-2 border-[#8df0cc] animate-fade-in text-xl p-2 rounded-4xl bg-[#0d63f8] hover:bg-[#ff0088] cursor-pointer transition-colors font-extrabold"
                        onClick={handleBack}
                        >BACK</button>
                        {
                        join&&
                        <button className="border-2 border-[#8df0cc] text-[#8df0cc] animate-fade-in text-xl p-2 rounded-4xl bg-[#0d63f8] hover:bg-[#ff0088] cursor-pointer transition-colors font-extrabold"
                        onClick={handleJoinTwo}
                        >JOIN</button>
                        }
                    </div>
                }
            </div>
            
        </div>
    </div>
  )
}

export default Body