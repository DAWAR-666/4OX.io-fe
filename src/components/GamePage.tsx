import { useNavigate, useParams } from "react-router-dom"
import GameBoard from "./GameBoard"
import { useAuthStore } from "../utils/authStore"
import { useEffect, useState } from "react"
import type { Game, Player } from "../utils/types"
import socket from "../utils/sockets"
import toast from "react-hot-toast"
const GamePage = () => {
    const {roomId}=useParams()
    const user=useAuthStore(state=>state.user)
    const navigate=useNavigate()
    const [gameState,setGameState]=useState<Game|null>(null)
    const [winner,setWinner]=useState<string|null>(null)
    useEffect(()=>{
        if(!user||!roomId){
            navigate('/')
            return
        }
        socket.connect()


        socket.on("gameState",(state:Game)=>{
            setGameState(state)
        })
        socket.on("gameOver",({winner}:{winner:Player})=>{
            setWinner(winner.userName)
        })
        socket.on("opponentLeft",()=>{
            toast.error('Opponent Left!',{className:'font-extrabold'})
            setWinner('opponentLeft')
        })
        socket.on('error',(message:string)=>{
            toast.error(message, { className: 'font-extrabold' })
        })
        socket.emit("joinRoom",roomId,user._id)
        return ()=>{
            socket.off('gameState')
            socket.off('gameOver')
            socket.off('opponentLeft')
            socket.off('error')
            socket.disconnect()
        }
    },[])
    const myTurn=gameState?.currentTurn===socket.id
    const me=gameState?.players.find(p=>p.socketId===socket.id)
    const opponent=gameState?.players.find(p=>p.socketId!==socket.id)
    const handleMove=(cellIndex:number)=>{
        if(!gameState){
            return
        }
        if(gameState.status!=='playing')return
        if(socket.id!==gameState?.currentTurn)return
        if(gameState?.board[cellIndex]!==null)return
        socket.emit('gameMove',{roomId,cellIndex})
    }
    if (!gameState || gameState.status === 'waiting') {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
      <span className="font-['Press_Start_2P'] text-[#8df0cc] text-2xl">
        ROOM: {roomId}
      </span>
      <span className="font-['Press_Start_2P'] text-white text-sm">
        Waiting for opponent...
      </span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(roomId!)
          toast.success('Copied!', { className: 'font-extrabold' })
        }}
        className="border-2 border-[#8df0cc] px-8 py-3 rounded-4xl bg-[#0d63f8] hover:bg-[#ff0088] text-white font-extrabold transition-colors cursor-pointer"
      >
        COPY CODE
      </button>
    </div>
  )
}
    if (gameState?.status === 'finished' ||winner==='opponentLeft') {
  const iWon = winner === user?.userName
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-8">
      <span className="font-['Press_Start_2P'] text-3xl md:text-6xl text-[#8df0cc]">
        {winner === 'opponentLeft'
          ? 'OPPONENT LEFT!'
          : iWon ? 'YOU WIN!' : 'YOU LOSE!'}
      </span>
      <button
        onClick={() => navigate('/')}
        className="border-2 border-[#8df0cc] px-8 py-3 rounded-4xl bg-[#0d63f8] hover:bg-[#ff0088] text-white font-extrabold transition-colors cursor-pointer"
      >
        BACK TO HOME
      </button>
    </div>
  )
}

const mybg=me?.symbol==="X" ? "bg-[#ff0088]/50" : "bg-[#0d63f8]/50"
const enemyBG = opponent?.symbol === "O" ? "bg-[#0d63f8]/50" : "bg-[#ff0088]/50"
return (
    <div className="bg-black min-h-screen w-screen text-white">
        <header className="fixed border-b-8 border-double border-zinc-600 w-full flex justify-between font-['Press_Start_2P'] text-sm md:text-xl ">
            <div className={`${mybg} w-1/3 text-center border-r-8 border-[#8df0cc]`}>{me?.userName ?? user?.userName}</div>
            <div className="w-1/3 text-center">{myTurn?"Your Turn":"Opponent's turn"}</div>
            <div className={`${enemyBG} w-1/3 text-center border-l-8 border-[#8df0cc]`}>{opponent?.userName??'waiting.....'}</div>
        </header>
        <div className="flex justify-center items-center">
            <GameBoard 
                board={gameState?.board??Array(9).fill(null)}
                onMove={handleMove}
                myTurn={myTurn ?? false}
                disappearingCellIndex={
                    me?.queue.length === 3 ? me.queue[0].cellIndex : null
                }
            />
        </div>
        <footer className="fixed flex flex-row md:text-xl justify-around bottom-0 w-full p-2 font-['Press_Start_2P'] text-rose-400">
             Room Id -- {roomId} 
        </footer>
    </div>
  )
}

export default GamePage