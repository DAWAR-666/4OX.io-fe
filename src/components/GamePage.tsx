import { useParams } from "react-router-dom"

const GamePage = () => {
    const {roomId}=useParams()
  return (
    <div>GamePage: {roomId}</div>
  )
}

export default GamePage