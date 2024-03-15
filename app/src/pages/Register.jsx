/**
 * RegistrationForm Component
 *
 * This component represents the registration form for users to sign up.
 * 
 * @author Maja Bosy
 */

import React, { useState } from 'react'
import bcrypt from 'bcryptjs'

function RegistrationForm({ onRegistration }) {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const salt = bcrypt.genSaltSync(10) // Generate salt for password hashing
    const [passwordStrength, setPasswordStrength] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    // Check password strength
    const checkPasswordStrength = (password) => {
        // Calculate password strength
        let strength = 0
        if (password.length >= 8) strength += 1
        if (password.length >= 12) strength += 1
        if (/\d/.test(password)) strength += 1
        if (/[a-z]/.test(password)) strength += 1
        if (/[A-Z]/.test(password)) strength += 1
        if (/[^A-Za-z0-9]/.test(password)) strength += 1

        // Return password strength based on the calculated score
        switch (strength) {
            case 0:
            case 1:
            case 2:
                return 'Weak'
            case 3:
            case 4:
                return 'Moderate'
            case 5:
            case 6:
                return 'Strong'
            default:
                return '' // No color applied for empty or unknown strength
        }
    }

    // Colours for password strength
    const getPasswordStrengthTextClass = () => {
        switch (passwordStrength) {
            case 'Weak':
                return 'text-green-500'
            case 'Moderate':
                return 'text-orange-500'
            case 'Strong':
                return 'text-red-500'
            default:
                return '' // No color applied for empty or unknown strength
        }
    }


    // Handle password input changes
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value
        setPassword(newPassword)
        setPasswordStrength(checkPasswordStrength(newPassword))
    }

    // Handle registration form submission
    const handleRegistration = () => {

        if (name && email && password) {
            const hashedPassword = bcrypt.hashSync(password, salt) // Hash the password

            let formData = new FormData()
            formData.append('name', name)
            formData.append('password', hashedPassword)
            formData.append('email', email)
            formData.append('dob', dob)

            // Send a POST request to register the user
            fetch('https://w20037161.nuwebspace.co.uk/project/api/register', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    // Successful registration
                    if (response.status === 200 || response.status === 204) {
                        // Clear the fields
                        setName('')
                        setEmail('')
                        setPassword('')
                        window.alert('You were registered successfully! You can log in now.')
                        // Redirect to homepage
                        window.location.href = '/project/app/home'
                    } else {
                        // Registration failed, handle errors
                        response.json().then(data => {
                            setErrorMessage(data.error || 'Registration failed. Please try again later.')
                        })
                    }
                })
                .catch(error => {
                    console.error('Error registering:', error)
                    setErrorMessage('Registration failed. Please try again later.')
                })
        } else {
            setErrorMessage('Please fill in all fields.')
        }
    }


    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-12'>
            <h2 className='text-xl mb-4 bg-gray-800 text-white py-2 rounded-t-md text-center uppercase font-semibold'>Registration</h2>
            {errorMessage && (
                <div className='bg-red-500 text-white p-2 mb-4 text-center'>
                    {errorMessage}
                </div>
            )}
            <table className='w-full'>
                <tbody>
                    <tr className='bg-gray-200'>
                        <td className='p-2'>Full Name:</td>
                        <td className='p-2'>
                            <input
                                type='text'
                                placeholder='Full Name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className='border border-gray-300 px-3 py-2 rounded-md w-full'
                            />
                        </td>
                    </tr>
                    <tr className='bg-gray-200'>
                        <td className='p-2'>E-mail:</td>
                        <td className='p-2'>
                            <input
                                type='text'
                                placeholder='E-mail'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className='border border-gray-300 px-3 py-2 rounded-md w-full'
                            />
                        </td>
                    </tr>
                    <tr className='bg-gray-200'>
                        <td className='p-2'>Date of birth:</td>
                        <td className='p-2'>
                            <input
                                type='date'
                                placeholder='Date of birth'
                                value={dob}
                                onChange={e => setDob(e.target.value)}
                                className='border border-gray-300 px-3 py-2 rounded-md w-full'
                            />
                        </td>
                    </tr>
                    <tr className='bg-gray-200'>
                        <td className='p-2'>Password:</td>
                        <td className='p-2'>
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={handlePasswordChange}
                                className='border border-gray-300 px-3 py-2 rounded-md w-full'
                            />
                            <div className='font-semibold'>Password strength: <span className={getPasswordStrengthTextClass()}>{passwordStrength}</span></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='mt-4 font-semibold'>
                <button
                    onClick={handleRegistration}
                    className='bg-purple-400 text-white px-4 py-2 rounded-b-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full'
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default RegistrationForm
