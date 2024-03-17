import React from 'react';
import { useState, useEffect } from 'react'

import SponsorContent from './SponsorContent'

function SponsorAdmin() {
    
    const [sponsor, setSponsor] = useState([])
    const [search, setSearch] = useState("")

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
        fetch("https://w21023500.nuwebspace.co.uk/KV6002/sponsor")
        .then( response => handleResponse(response) )
        .then( json => handleJSON(json) )
        .catch( err => { console.log(err.message) })
    }
 
    useEffect( fetchData, [])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const searchEmail = (newsletter) => {
        newsletter.email.toLowerCase().includes(search.toLowerCase())
    }

    const listOfSponsor = sponsor.map( 
        (sponsor, index) => <SponsorContent key={index} sponsor={sponsor}/>
    )

  return (
    <div className="container">
        <h1>Sponsor</h1>
        <input value={search} onChange={handleSearch} type="text" placeholder="Search For Email" name="email" />
        {listOfSponsor}
    </div>
  )

}
 
export default SponsorAdmin