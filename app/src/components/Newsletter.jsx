import React from 'react'
import { useState } from 'react'

function Newsletter() {

  const [newsEmail, setNewsEmail] = useState('');

  const handleResponse = (response) => {
    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error("invalid response: " + response.status)
    }
  }

  const handleSubmit = () => {
    alert('You have submitted');

    return fetch(
      'https://w20012367.nuwebspace.co.uk/assessment/api/newsletter?email=' + newsEmail, 
      { method: 'POST' })
    .then( response => handleResponse(response))
    .catch( err => { console.log(err.message) })
  }

  return (
    <div className="container">

      <h1>Newsletter</h1>

      <p>Sign up for our newsletter to receive the latest news and updates</p>

      <form>
        <label>
          Sign Up Here:
          <input 
          type="text" 
          placeholder="Enter Your Email" 
          value={newsEmail} 
          onChange={e => setNewsEmail(e.target.value)} 
          maxLength="50" 
          name="email"/>
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

export default Newsletter