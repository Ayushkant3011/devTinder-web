import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/navbar"
import Body from "./components/Body"
import Profile from "./components/Profile"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"


function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}> 
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element= {<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
