import { useState, useEffect } from 'react'

/**
 * The SignIn component for the application.
 * 
 * @author ???
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