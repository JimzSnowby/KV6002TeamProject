import { Routes, Route } from "react-router-dom";
import { useState } from 'react'
import HomePage from "./pages/HomePage";
import './App.css'
import Menu from "./components/Menu";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <nav>
      <Menu />
    </nav>
    <Routes>
        <Route path="/" element={<HomePage />} />
    </Routes>
    <div>
        <Footer />
    </div>
    </>
  )
}

export default App
