const GameBoard = ({board}) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
    <div className="grid grid-cols-3 grid-rows-3 gap-15 ">
        <button className="shadow-[10px_10px_10px_0px_#8df0cc] hover:translate-x-2 transition-all hover:translate-y-2 hover:shadow-none border-2 border-[#8df0cc] w-40 h-40 hover:scale-95 flex justify-center items-center text-9xl">{board[0]}</button>
        <button className="shadow-[0px_10px_10px_0px_#8df0cc] border-2 border-[#8df0cc] transition-all hover:translate-y-1 hover:shadow-none hover:scale-95 flex justify-center items-center text-9xl">{board[1]}</button>
        <button className="shadow-[-10px_10px_10px_0px_#8df0cc] border-2 border-[#8df0cc] hover:-translate-x-1 transition-all hover:translate-y-1 hover:shadow-none hover:scale-95 flex justify-center items-center text-9xl">{board[2]}</button>
        <button className="shadow-[10px_0px_10px_0px_#8df0cc] border-2 border-[#8df0cc] hover:translate-x-1 transition-all hover:shadow-none hover:scale-95 flex justify-center items-center text-9xl">{board[3]}</button>
        <button className="shadow-[0px_0px_10px_2px_#8df0cc] border-2 border-[#8df0cc] hover:scale-95 transition-all hover:shadow-none flex justify-center items-center text-9xl" disabled >{board[4]}</button>
        <button className="shadow-[-10px_0px_10px_0px_#8df0cc] border-2 border-[#8df0cc] hover:-translate-x-1 transition-all hover:shadow-none hover:scale-95 flex justify-center items-center text-9xl">{board[5]}</button>
        <button className="shadow-[10px_-10px_10px_0px_#8df0cc] border-2 border-[#8df0cc] hover:translate-x-1 transition-all hover:-translate-y-1 hover:shadow-none hover:scale-95 flex justify-center items-center text-9xl">{board[6]}</button>
        <button className="shadow-[0px_-10px_10px_0px_#8df0cc] border-2 border-[#8df0cc] transition-all hover:-translate-y-1 hover:shadow-none hover:scale-95 flex justify-center items-center text-9xl">{board[7]}</button>
        <button className="shadow-[-10px_-10px_10px_0px_#8df0cc] border-2 border-[#8df0cc] hover:-translate-x-1 transition-all hover:-translate-y-1 hover:shadow-none hover:scale-95 flex justify-center items-center text-9xl">{board[8]}</button>
    </div>
    </div>
  )
}

export default GameBoard