import React from 'react'
import { useState } from 'react'

function Sponsor() {
  
  const [sponsorEmail, setSponsorEmail] = useState('');

  const handleResponse = (response) => {
    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error("invalid response: " + response.status)
    }
  }
  

  const handleSubmit = () => {
    alert('You have submitted');
    
    return fetch('https://w20012367.nuwebspace.co.uk/assessment/api/sponsor?email=' + sponsorEmail,
    { method: 'POST' })
    .then( response => handleResponse(response) )
    .catch( err => { console.log(err.message) })
  }

  return (
    <div className="container">

      <h1>Sponsor</h1>
      
      <p>Sign up to sponsor our event</p>

      <form>
        <label>
          Sign Up Here:
          <input 
          type="text" 
          placeholder="Enter Your Email" 
          value={sponsorEmail}
          onChange={e => setSponsorEmail(e.target.value)}
          maxLength="50"
          name="email" />
        </label>

        <button 
          type="submit"
          onClick={(e) => { e.preventDefault(); handleSubmit()} }>
          Submit
        </button>
      </form>
  </div>
  )

}

export default Sponsor