import { useParams } from "react-router-dom"
import GameBoard from "./GameBoard"

const GamePage = () => {
    const {roomId}=useParams()
    const board:Array<string|null>=[null,null,null,null,"X","X","O","O",null]
  return (
    <div className="bg-black min-h-screen w-screen text-white">
        <header className="fixed border-b-8 border-double border-zinc-600 w-full flex justify-between font-['Press_Start_2P'] text-sm md:text-xl">
            <div className="bg-[#ff0088]/50 w-1/3 text-center border-r-8 border-[#8df0cc] ">player1</div>
            <div className="w-1/3 text-center">player's turn</div>
            <div className="bg-[#0d63f8]/50 w-1/3 text-center border-l-8 border-[#8df0cc]">player2</div>
        </header>
        <div className="flex justify-center items-center">
            <GameBoard board={board}/>
        </div>
        <footer className="fixed flex flex-row md:text-xl justify-around bottom-0 w-full p-2 font-['Press_Start_2P'] text-rose-400">
             Room Id -- {roomId} 
        </footer>
    </div>
  )
}

export default GamePage