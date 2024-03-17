import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import HomePage from "./pages/HomePage"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import SignIn from "./components/SignIn"
import VolunteerPage from "./pages/VolunteerPage"
import VolunteerSignUp from "./pages/VolunteerSignUp"
import ParticipantPage from "./pages/ParticipantPage"



function App() {
  const [count, setCount] = useState(0)
  const [signedIn, setSignedIn] = useState(false)
  const [roletype, setRoletype] = useState('')

  console.log("Final Role type:", roletype);



  return (
    <>
      <div className="p-10">
        <SignIn
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          roletype={roletype}
          setRoletype={setRoletype}
        />
      </div>
      <nav className="px-5">
        <Menu roletype={roletype} signedIn={signedIn}  />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/volunteer-sign-up" element={<VolunteerSignUp />} />
        <Route path="/volunteer" element={<VolunteerPage />} />
        <Route path="/participant" element={<ParticipantPage />} />   
      </Routes>
      <div className="px-5">
        <Footer />
      </div>
    </>
  )
}

export default App
