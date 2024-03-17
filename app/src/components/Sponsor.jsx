import React from 'react'
import { useState } from 'react'

function Sponsor() {
  const [sponsorEmail, setSponsor] = useState('');

  const handleSubmit = (e) => {
    setSponsor(e)
    e.preventDefault();
    alert('You have submitted');
    
    return fetch('https://w20012367.nuwebspace.co.uk/KV6002TeamProject/api/Newsletter.php' + sponsorEmail)
    .then(response => response.json())
    .catch(error => console.error(error));
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