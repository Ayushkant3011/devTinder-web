import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/navbar"
import Body from "./components/Body"
import Login from "./components/login"
import Profile from "./components/Profile"


function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}> 
            <Route path="/login" element= {<Login/>}/>
            <Route path="/profile" element= {<Profile/>}/>
          </Route>
        </Routes>

      </BrowserRouter>
      
    </>
  )
}

export default App
