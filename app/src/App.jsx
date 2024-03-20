import React from 'react'
import { Routes, Route } from "react-router-dom"
import { useState } from 'react'

import HomePage from "./pages/HomePage"
import VolunteerPage from "./pages/VolunteerPage"
import ParticipantPage from "./pages/ParticipantPage"
import RegistrationForm from "./pages/Register"
import NotFound from "./pages/NotFound"
import VolunteerSignUp from "./pages/VolunteerSignUp"
import AdminRegister from './pages/AdminRegister'
import NewEvent from './pages/NewEvent'

import Header from "./components/Header"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import SignIn from "./components/SignIn"

import Search from './components/Search'
import Event from './components/Event'




function App() {

  const [signedIn, setSignedIn] = useState(false)
  const [roleType, setRoleType] = useState('')
  const [position, setPosition] = useState('')
  const [userID, setUserID] = useState('')

  console.log("Final Role type:", roleType);
  console.log("Final Position:", position);

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
          position={position}
          setPosition={setPosition}
        />
      </div>

      <header>
          <Header/>
      </header>

      <nav className="px-5">
        <Menu roletype={roleType} 
        position={position}
        signedIn={signedIn}  />
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/volunteer" element={<VolunteerPage userID={userID}/>} />
          <Route path="/volunteer-sign-up" element={<VolunteerSignUp />} />
          <Route path="/participant" element={<ParticipantPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/admin-sign-up" element={<AdminRegister />} />
          <Route path="/new-event" element={<NewEvent />} />
          <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="px-5">
        <Footer />
      </footer>
      
    </div>
  )
}

export default App