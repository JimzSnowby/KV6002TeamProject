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
  
  const handleJSON = (json) => {
      if (json.constructor === Array) {
        setNewsEmail(json)
      } else {
          throw new Error("invalid JSON: " + json)
      }
  }

  const handleSubmit = (e) => {
    setNewsEmail(e)
    e.preventDefault();
    alert('You have submitted');
    
    return fetch('https://w20012367.nuwebspace.co.uk/KV6002TeamProject/api/Newsletter.php' + newsEmail)
    .then( response => handleResponse(response) )
    .then( json => handleJSON(json) )
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

export default Newsletter