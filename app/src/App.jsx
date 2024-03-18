import React from 'react'
import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import HomePage from "./pages/HomePage"
import VolunteerPage from "./pages/VolunteerPage"
import NotFound from "./pages/NotFound"
import Header from "./components/Header"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import SignIn from "./components/SignIn"
import ParticipantPage from "./pages/ParticipantPage"
import RegistrationForm from "./pages/Register"
import BecomeParticipant from './pages/BecomeParticipant'


function App() {

  const [signedIn, setSignedIn] = useState(false)
  const [roleType, setRoleType] = useState('')

  console.log("Final Role type:", roleType);

  return (
    <div>

      <div className="p-10">
        <SignIn
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          roleType={roleType}
          setRoleType={setRoleType}
        />
      </div>

      <header>
          <Header/>
      </header>

      <nav className="px-5">
        <Menu roletype={roleType} signedIn={signedIn}  />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/register" element={<RegistrationForm />} /> {/* Route for the registration form */}
          <Route path="/becomeparticipant" element={<BecomeParticipant />} />

      </Routes>

      <footer className="px-5">
        <Footer />
      </footer>
      
    </div>
  )
}

export default App