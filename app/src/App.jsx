import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import './App.css'
import HomePage from "./pages/HomePage"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav>
      <Menu />
    </nav>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
    </Routes>
    <div>
        <Footer />
    </div>
    </>
  )
}

export default App
