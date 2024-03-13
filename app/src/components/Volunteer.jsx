import { useEffect, useState } from 'react'

/**
 * The Volunteer component for retrieving the logged in volunteers data from the database.
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

    const detailsJSX = details.map((details, index) => 
        <section key = {index} className='p-5 bg-blue-200'>
            <h2 className='text-2xl'>{details.name}</h2>
            <p>{details.dob}</p>
            <p>{details.email}</p>
        </section>
        )


    return (
        <section className='p-5'>
            {detailsJSX}
        </section>
    )

}

export default Volunteer