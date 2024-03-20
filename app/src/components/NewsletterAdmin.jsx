import React from 'react';
import { useState, useEffect } from 'react'

function NewsletterAdmin() {

    const [newsletter, setNewsletter] = useState([])
    const [search, setSearch] = useState("")

    useEffect( () => {
        fetchData()
    }, [])

    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }

    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setNewsletter(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }

    const fetchData = () => {
        fetch("https://w21023500.nuwebspace.co.uk/assessment/api/newsletter")
        .then( response => handleResponse(response))
        .then( json => handleJSON(json))
        .catch( err => { console.log(err.message) })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const searchEmail = (newsletter) => {
        newsletter.email.toLowerCase().includes(search.toLowerCase())
    }

    const listOfNewsletter = newsletter.filter(searchEmail).map((newsletter, index) => 
        <section key = {index}>
            <p>{newsletter.email}</p>
        </section>
    )

    const removeReader = () => {
        alert('Deleted Reader');

        return fetch('https://w20012367.nuwebspace.co.uk/assessment/api/newsletter?email=' + newsletter, 
          {method: 'DELETE'})
          .then( response => handleResponse(response))
          .catch( err => { console.log(err.message) })
        }

  return (
    <div className="container">

        <h1>Newsletter</h1>

        <input 
        value={search} 
        onChange={handleSearch} 
        type="text" 
        placeholder="Search For Reader" 
        name="email"/>

        {listOfNewsletter}

        <button
            type="submit" 
            onClick={(e) => { e.preventDefault(); removeReader()} }>
            Delete Reader
        </button>
    </div>
  )

}

export default NewsletterAdmin