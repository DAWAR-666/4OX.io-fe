
type Props={
  board:Array<string|null>
  onMove: (cellIndex: number) => void
  myTurn:boolean
  disappearingCellIndex:number|null
}
const GameBoard = ({ board, onMove, myTurn, disappearingCellIndex }: Props) => {
  const getColor = (cell:string|null) => {
    if (cell === "X") return "#ff0088";
    if (cell === "O") return "#0d63f8";
    return "#8df0cc"; 
  };

  const getButtonClass = (isActive:boolean, specificStyles:string,isDisappearing:boolean) => {
    // We use inline styles for colors because Tailwind doesn't support 
    // dynamic arbitrary values like shadow-[..._${cellColor}] at runtime easily.
    const baseClasses = "border-2 w-20 h-20 md:w-40 md:h-40 flex justify-center items-center text-7xl md:text-9xl transition-all";
    const hoverClasses = "hover:scale-95 hover:shadow-none cursor-pointer";
    const disappearClass = isDisappearing ? "opacity-30 animate-pulse" : ""
    return `${baseClasses} ${specificStyles} ${isActive ? hoverClasses : "cursor-not-allowed"} ${disappearClass}`;
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#0f172a]">
      <div className="grid grid-cols-3 grid-rows-3 gap-10 md:gap-15">
        {board.map((cell:string|null, index:number) => {
          const isActive = cell === null&&myTurn;
          const cellColor = getColor(cell);
          const isDisappearing=disappearingCellIndex===index
          
          // Using CSS variables or dynamic strings for the shadow color
          const variantStyles = [
            `shadow-[10px_10px_10px_0px_var(--shadow-col)] ${isActive ? "hover:translate-x-2 hover:translate-y-2" : ""}`,
            `shadow-[0px_10px_10px_0px_var(--shadow-col)] ${isActive ? "hover:translate-y-1" : ""}`,
            `shadow-[-10px_10px_10px_0px_var(--shadow-col)] ${isActive ? "hover:-translate-x-1 hover:translate-y-1" : ""}`,
            `shadow-[10px_0px_10px_0px_var(--shadow-col)] ${isActive ? "hover:translate-x-1" : ""}`,
            `shadow-[0px_0px_10px_2px_var(--shadow-col)]`,
            `shadow-[-10px_0px_10px_0px_var(--shadow-col)] ${isActive ? "hover:-translate-x-1" : ""}`,
            `shadow-[10px_-10px_10px_0px_var(--shadow-col)] ${isActive ? "hover:translate-x-1 hover:-translate-y-1" : ""}`,
            `shadow-[0px_-10px_10px_0px_var(--shadow-col)] ${isActive ? "hover:-translate-y-1" : ""}`,
            `shadow-[-10px_-10px_10px_0px_var(--shadow-col)] ${isActive ? "hover:-translate-x-1 hover:-translate-y-1" : ""}`,
          ];

          return (
            <button
              key={index}
              disabled={!isActive}
              onClick={()=>onMove(index)}
              className={getButtonClass(isActive, variantStyles[index],isDisappearing)}
              style={{ 
                borderColor: cellColor, 
                color: cellColor,
                '--shadow-col': cellColor // Custom property for the Tailwind shadow bracket
              }as React.CSSProperties}
            >
              {cell}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;