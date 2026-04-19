const GameBoard = ({ board }:{board:Array<string|null>}) => {
  // Helper to get the hex code based on the cell value
  const getColor = (cell:string|null) => {
    if (cell === "X") return "#ff0088";
    if (cell === "O") return "#0d63f8";
    return "#8df0cc"; // Default for null
  };

  const getButtonClass = (isActive:boolean, specificStyles:string) => {
    // We use inline styles for colors because Tailwind doesn't support 
    // dynamic arbitrary values like shadow-[..._${cellColor}] at runtime easily.
    const baseClasses = "border-2 w-40 h-40 flex justify-center items-center text-9xl transition-all";
    const hoverClasses = "hover:scale-95 hover:shadow-none cursor-pointer";
    
    return `${baseClasses} ${specificStyles} ${isActive ? hoverClasses : "cursor-not-allowed"}`;
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[#0f172a]">
      <div className="grid grid-cols-3 grid-rows-3 gap-15">
        {board.map((cell:string|null, index:number) => {
          const isActive = cell === null;
          const cellColor = getColor(cell);
          
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
              className={getButtonClass(isActive, variantStyles[index])}
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