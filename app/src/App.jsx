import { Routes, Route } from "react-router-dom"
import { useState } from 'react'
import HomePage from "./pages/HomePage"
import Menu from "./components/Menu"
import Footer from "./components/Footer"
<<<<<<< HEAD
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
=======
import SignIn from "./components/SignIn"
import VolunteerPage from "./pages/VolunteerPage"

>>>>>>> main

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
    </nav>
    <Routes>
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
=======
        {/* Put If statement for the profile, checking for logged in user account type */}
          <Route path="/volunteer" element={<VolunteerPage />} />
>>>>>>> main
    </Routes>
    <div className="px-5">
        <Footer />
    </div>
    </>
  )
}

export default App
