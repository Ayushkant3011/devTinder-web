import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/navbar"


function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<div>BasePage</div>}/>
          <Route path="/login" element={<div>LoginPage</div>}/>
          <Route path="/test" element={<div>TestPage</div>}/>
        </Routes>

      </BrowserRouter>

      <NavBar/>  
      <h1 className="text-3xl font-bold underline">DevTinder-WEB</h1>
      
    </>
  )
}

export default App
