import { useState, useEffect } from 'react'
import Volunteer from '../components/Volunteer'

/**
 * Page to manage Volunteers profile
 * 
 * @author James Sowerby w21023500
 */
function ParticipantPage() {
    return (
        <>
            <div>
                <h1>Participant</h1>
                <p>Welcome to your profile</p>
                <Participant />
            </div>
        </>
    )
}

export default ParticipantPage