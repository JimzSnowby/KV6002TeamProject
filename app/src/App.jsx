import React from 'react'
import { Routes, Route } from "react-router-dom"
import { useState } from 'react'

import HomePage from "./pages/HomePage"
import VolunteerPage from "./pages/VolunteerPage"
import ParticipantPage from "./pages/ParticipantPage"
import RegistrationForm from "./pages/Register"
import NotFound from "./pages/NotFound"

import Header from "./components/Header"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import SignIn from "./components/SignIn"



function App() {

  const [count, setCount] = useState(0) // Do we need?
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

      <header>
          <Header/>
      </header>

      <nav className="px-5">
        <Menu roletype={roletype} signedIn={signedIn}  />
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Put If statement for the profile, checking for logged in user account type */}

          <Route path="/volunteer" element={<VolunteerPage />} />

          <Route path="/register" element={<RegistrationForm />} />

          <Route path="*" element={<NotFound/>}/>
      </Routes>

      <footer className="px-5">
        <Footer />
      </footer>
    </>
  )
}

export default App