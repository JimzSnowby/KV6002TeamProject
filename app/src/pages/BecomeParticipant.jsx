import React, { useState } from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

/**
 * Home page for the application.
 * 
 */

function BecomeParticipant() {
    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to ROSE</h1>
            <p className="text-lg mb-4">Thank you for your interest in becoming a participant in our charity events!</p>
            <p className="text-lg mb-4">To register as a participant and take part in our cancer screenings, please follow these steps:</p>
            <ol className="list-decimal pl-6 mb-4">
                <li className="mb-2">Click on the <strong className="text-blue-500">"Sign Up"</strong> button below to access the registration form.</li>
                <li className="mb-2">Fill out the required information, including your full name, email, phone number, date of birth, and password.</li>
                <li className="mb-2">Upload evidence of your income. This evidence is necessary to verify your eligibility for participation.</li>
                <li className="mb-2">Submit the registration form.</li>
            </ol>
            <p className="text-lg mb-4">Upon successful registration, you will be notified via email and provided with further instructions on how to participate in our charity events.</p>
            <p className="text-lg mb-4">If you have any questions or need assistance, please feel free to contact us.</p>
            <div>
                <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block">Sign Up</Link>
            </div>
        </div>
    );
}


export default BecomeParticipant