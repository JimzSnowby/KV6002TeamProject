import React from 'react';
import { useState, useEffect } from 'react'

function SponsorAdmin() {

    const [sponsor, setSponsor] = useState([])
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
            setSponsor(json)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }

    const fetchData = () => {
        fetch("https://w21023500.nuwebspace.co.uk/assessment/api/sponsor")
        .then( response => handleResponse(response))
        .then( json => handleJSON(json))
        .catch( err => { console.log(err.message) })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const searchEmail = (sponsor) => {
        sponsor.email.toLowerCase().includes(search.toLowerCase())
    }

    const listOfSponsor = details.filter(searchEmail).map((sponsor, index) => 
        <section key = {index}>
            <p>{sponsor.email}</p>
        </section>
    )

    const removeSponsor = () => {
        alert('Deleted Sponsor');

        return fetch('https://w20012367.nuwebspace.co.uk/assessment/api/sponsor?email=' + sponsor, 
          {method: 'DELETE'})
          .then( response => handleResponse(response))
          .catch( err => { console.log(err.message) })
        }

    return (
        <div className="container">

            <h1>Sponsor</h1>

            <input 
            value={search} 
            onChange={handleSearch} 
            type="text" 
            placeholder="Search For Sponsor" 
            name="email"/>

            {listOfSponsor}

            <button 
                type="submit" 
                onClick={(e) => { e.preventDefault(); removeSponsor()} }>
                Delete Sponsor
            </button>
        </div>
    )

}

export default SponsorAdmin