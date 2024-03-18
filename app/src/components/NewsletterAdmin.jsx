import React from 'react';
import { useState, useEffect } from 'react'

import NewsletterContent from './NewsletterContent'

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
        .then( response => handleResponse(response) )
        .then( json => handleJSON(json) )
        .catch( err => { console.log(err.message) })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const searchEmail = (newsletter) => {
        newsletter.email.toLowerCase().includes(search.toLowerCase())
    }

    const listOfNewsletter = newsletter.filter(searchEmail).map( 
        (newsletter, index) => <NewsletterContent key={index} newsletter={newsletter}/>
    )

  return (
    <div className="container">
        <h1>Newsletter</h1>
        <input 
        value={search} 
        onChange={handleSearch} 
        type="text" 
        placeholder="Search For Email" 
        name="email" />
        {listOfNewsletter}
    </div>
  )

}
 
export default NewsletterAdmin