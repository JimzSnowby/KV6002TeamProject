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
  
  const handleJSON = (json) => {
      if (json.constructor === Array) {
        setSponsorEmail(json)
      } else {
          throw new Error("invalid JSON: " + json)
      }
  }

  const handleSubmit = (e) => {
    setSponsorEmail(e)
    e.preventDefault();
    alert('You have submitted');
    
    return fetch('https://w20012367.nuwebspace.co.uk/KV6002TeamProject/api/Newsletter.php' + sponsorEmail)
    .then( response => handleResponse(response) )
    .then( json => handleJSON(json) )
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
        maxLength="50"
        name="email" />
      </label>

      <button 
        type="submit" 
        onClick={(e) => handleSubmit(e.target.value)}>
        Submit
      </button>
    </form>
  </div>
  )

}

export default Sponsor