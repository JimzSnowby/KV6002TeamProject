import { useState, useEffect } from 'react'
import Volunteer from '../components/Volunteer'

/**
 * Page to manage Volunteers profile
 * 
 * @author James Sowerby w21023500
 */
function VolunteerPage() {
    return (
        <>
            <div>
                <h1>Volunteer</h1>
                <p>Welcome to your profile</p>
                <Volunteer />
            </div>
        </>
    )
}

export default VolunteerPage