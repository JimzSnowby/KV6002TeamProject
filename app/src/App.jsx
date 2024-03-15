import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import HomePage from "./pages/HomePage"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import VolunteerPage from "./pages/VolunteerPage"
import Chatbot from 'react-chatbot-kit'

import ActionProvider from "./config/ActionProvider"
import MessageParser from "./config/MessageParser"
import config from "./config/config"
import 'react-chatbot-kit/build/main.css'

function App() {
  const [count, setCount] = useState(0)
  const [signedIn, setSignedIn] = useState(false)

  return (
    <>
    <div className="p-10">
      <SignIn
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        table="volunteer"
        tableID="volunteerID"
      />
    </div>
    <nav className="px-5">
      <Menu />
      <Chatbot config={config} actionProvider={ActionProvider} 	    messageParser={MessageParser} />
    </nav>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        {/* Put If statement for the profile, checking for logged in user account type */}
          <Route path="/volunteer" element={<VolunteerPage />} />
    </Routes>
    <div>
        <Footer />
    </div>
    </>
  )
}

export default App
