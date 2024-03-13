import { useEffect, useState } from 'react'

/**
 * The Volunteer component for displaying and managing the volunteer profile.
 * 
 * @author James Sowerby w21023500
 */
function Volunteer() {
    const [details, setDetails] = useState([])

    useEffect(() => {
        fetch('https://w21023500.nuwebspace.co.uk/KV6002/volunteer')
        .then(response => response.json())
        .then(data => setDetails(data))
        .catch(error => console.error(error))
    }, [])

    const detailsJSX = details.map((detail, index) => 
        <li key = {index}>
            <h2>{detail.name}</h2>
            <p>{detail.email}</p>
        </li>
        )


    return (
        <section>
            {detailsJSX}
        </section>
    )

}

export default Volunteer