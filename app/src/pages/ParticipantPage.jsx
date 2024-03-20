import { useState, useEffect } from 'react'

/**
 * Page to manage Volunteers profile
 * 
 * @author James Sowerby w21023500
 */
function ParticipantPage() {
    return (
        <>
            <div>
                <h1>My profile</h1>
                <p>Welcome to your profile</p>
                <Participant />
            </div>
        </>
    )
}

export default ParticipantPage