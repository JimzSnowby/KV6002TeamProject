import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import './App.css'
import HomePage from "./pages/HomePage"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import SignIn from "./components/SignIn"
import VolunteerPage from "./pages/VolunteerPage"


function App() {
  const [count, setCount] = useState(0)
  const [signedIn, setSignedIn] = useState(false)

  return (
    <>
    <div>
      <SignIn
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        table="volunteer"
        tableID="volunteerID"
      />
    </div>
    <nav>
      <Menu />
    </nav>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
    </Routes>
    <div>
        <Footer />
    </div>
    </>
  )
}

export default App
