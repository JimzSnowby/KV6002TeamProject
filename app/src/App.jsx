import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import HomePage from "./pages/HomePage";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
    </Routes>
    </>
  )
}

export default App
