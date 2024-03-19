import { useState, useEffect } from 'react'

/**
 * Page to manage Volunteers profile
 * 
 * @author James Sowerby w21023500
 */
function VolunteerPage(props) {
    const [details, setDetails] = useState([])

    useEffect(() => {
        console.log("Volunteer ID: ", props.userID)
        fetch('https://w21023500.nuwebspace.co.uk/assessment/api/volunteer?volunteerID=' + props.userID)
        .then(response => response.json())
        .then(data => setDetails(data))
        .catch(error => console.error(error))
    }, [])

    const detailsJSX = details.map((details, index) => 
        <section key = {index} className='p-5 bg-blue-200'>
            <h2 className='text-2xl text-center'>{details.name}</h2>
            <p className='text-center'>Volunteer ID: {details.volunteerID}</p>
            <p className='text-center'>Date of Birth: {details.dob}</p>
            <p className='text-center'>Email: {details.email}</p>
        </section>
        )

    return (
        <section className='p-5'>
            <h1 className='text-4xl text-center'>Profile</h1>
            {detailsJSX}
        </section>
    )
}

export default VolunteerPage