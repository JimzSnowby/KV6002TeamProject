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
<<<<<<< HEAD

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
      {/*<Chatbot config={config} actionProvider={ActionProvider} 	    messageParser={MessageParser} />*/}
    </nav>
    <Routes>
=======
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
>>>>>>> main
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        {/* Put If statement for the profile, checking for logged in user account type */}
       
          <Route path="/volunteer" element={<VolunteerPage />} />
<<<<<<< HEAD
    </Routes>
    <div>
=======
        

       
          <Route path="/participant" element={<ParticipantPage />} />
      </Routes>
      <div className="px-5">
>>>>>>> main
        <Footer />
      </div>
    </>
  )
}

export default App
