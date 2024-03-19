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

import Chatbot from 'react-chatbot-kit'
import ActionProvider from "./config/ActionProvider"
import MessageParser from "./config/MessageParser"
import config from "./config/config"
import 'react-chatbot-kit/build/main.css'



function App() {

  const [signedIn, setSignedIn] = useState(false)
  const [roleType, setRoleType] = useState('')
  const [showChatbot, setShowChatbot] = useState(false);

  console.log("Final Role type:", roleType);

  return (
    <div>
      {showChatbot && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9998' }}>
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      )}

      {/* Floating icon to toggle chatbot */}
      {!showChatbot && (
        <div
          className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full p-4 cursor-pointer hover:bg-blue-600"
          onClick={() => setShowChatbot(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
        </div>
      )}
      <div className="p-10">
        <SignIn
          signedIn={signedIn}
          setSignedIn={setSignedIn}
          roleType={roleType}
          setRoleType={setRoleType}
        />
      </div>

      <header>
        <Header />
      </header>

      <nav className="px-5">
        <Menu roletype={roleType} signedIn={signedIn} />

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