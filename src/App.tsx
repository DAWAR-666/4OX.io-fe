import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body/>}>

          </Route>
        </Routes>  
      </BrowserRouter>
    </div>
  )
}

export default App