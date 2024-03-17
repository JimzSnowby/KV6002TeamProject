import React from 'react'
import { useState } from 'react'

function Newsletter() {

  const [newsEmail, setEmail] = useState('');

  const handleSubmit = (e) => {
    setEmail(e)
    e.preventDefault();
    alert('You have submitted');
    
    return fetch('https://w20012367.nuwebspace.co.uk/KV6002TeamProject/api/Newsletter.php' + newsEmail)
    .then(response => response.json())
    .catch(error => console.error(error));
  } 

  return (
    <div className="container">
      <h1>Newsletter</h1>
      <p>Sign up for our newsletter to receive the latest news and updates</p>
      <form>
        <label>
          Sign Up Here:
          <input type="text" placeholder="Enter Your Email" name="email" />
        </label>
        <button type="submit" onClick={(e) => handleSubmit(e.target.value)}>Submit</button>
      </form>
    </div>
  )

}

export default Newsletter