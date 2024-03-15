import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import HomePage from "./pages/HomePage"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import VolunteerPage from "./pages/VolunteerPage"
import Chatbot from 'react-chatbot-kit'
import ParticipantPage from "./pages/ParticipantPage"


import ActionProvider from "./config/ActionProvider"
import MessageParser from "./config/MessageParser"
import config from "./config/config"
import 'react-chatbot-kit/build/main.css'

function App() {
  const [count, setCount] = useState(0)
  const [signedIn, setSignedIn] = useState(false)
  const [roletype,setRoletype ] = useState('')



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
      </nav>
      <Routes>
    <div className="p-10">
      <SignIn
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        roletype = {roletype}
        setRoletype ={setRoletype}
      />
    </div>
    <nav className="px-5">
      <Menu roletype={roletype} />
    </nav>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        {/* Put If statement for the profile, checking for logged in user account type */}
        <Route path="/volunteer" element={<VolunteerPage />} />
      </Routes>
      <div>
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/participant" element={<ParticipantPage />} />
    </Routes>
    <div className="px-5">
        <Footer />
        {/*<Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />*/}
      </div>
    </>
  )
}

export default App
