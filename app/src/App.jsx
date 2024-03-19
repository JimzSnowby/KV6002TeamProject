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
import VolunteerSignUp from "./pages/VolunteerSignUp"




function App() {

  const [signedIn, setSignedIn] = useState(false)
  const [roleType, setRoleType] = useState('')
  const [userID, setUserID] = useState('')

  console.log("Final Role type:", roleType);

  return (
    <div>

      <div className="p-10">
        <SignIn
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          roleType={roleType}
          setRoleType={setRoleType}
          userID={userID}
          setUserID={setUserID}
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
          <Route path="/volunteer" element={<VolunteerPage userID={userID}/>} />
          <Route path="/volunteer-sign-up" element={<VolunteerSignUp />} />
          <Route path="/participant" element={<ParticipantPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="px-5">
        <Footer />
      </footer>
      
    </div>
  )
}

export default App