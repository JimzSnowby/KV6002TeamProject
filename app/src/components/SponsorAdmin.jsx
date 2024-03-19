import React from 'react';
import { useState, useEffect } from 'react'

import SponsorContent from './SponsorContent'

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
        .then( response => handleResponse(response) )
        .then( json => handleJSON(json) )
        .catch( err => { console.log(err.message) })
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const searchEmail = (sponsor) => {
        sponsor.email.toLowerCase().includes(search.toLowerCase())
    }

    const listOfSponsor = sponsor.filter(searchEmail).map( 
        (sponsor, index) => <SponsorContent key={index} sponsor={sponsor}/>
    )

    const removeSponsor = () => {
        fetch('https://w123.nuwebspace.co.uk/api/favourites?film_id='+props.email,
          {
           method: 'DELETE',
          }
         )
         .then(res => {
            if ((res.status === 200) || (res.status === 204)) {
                // Use the filter method to remove the film_id(s) from the favourites array
                props.setFavourites(props.favourites.filter(
                  fav => fav !== props.film.film_id
                ))
            }
         })
      }

    return (
        <div className="container">
            
            <h1>Sponsor</h1>

            <input 
            value={search} 
            onChange={handleSearch} 
            type="text" 
            placeholder="Search For Email" 
            name="email" />

            {listOfSponsor}

            <button 
                type="submit" 
                onClick={removeSponsor}>
                Delete Sponsor
            </button>
        </div>
    )

}
 
export default SponsorAdmin