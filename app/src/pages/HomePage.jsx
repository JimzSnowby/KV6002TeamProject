import React from 'react'

import Newsletter from '../components/Newsletter'
import Sponsor from '../components/Sponsor'

/**
 * Home page for the application.
 * 
 */

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to ROSE</p>
            <Newsletter/>
            <Sponsor/>
        </div>
    )
}

export default HomePage