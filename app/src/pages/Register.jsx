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
    const [phone, setPhone] = useState('')
    const [ticket, setTicket] = useState('3') // Ticket set to always be 3
    const [evidence, setEvidence] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
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


    // Handle confirm password input changes
    const handleConfirmPasswordChange = (e) => {
        const newPassword = e.target.value
        setConfirmPassword(newPassword)
    }


    // Handle evidence file input changes
    const handleEvidenceChange = (e) => {
        const files = e.target.files;
        setEvidence(files);
    };



    // Handle registration form submission
    const handleRegistration = () => {
        const currentDate = new Date()
        const selectedDate = new Date(dob)
        const nameRegex = /^[a-zA-Z\s]*$/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (selectedDate > currentDate) {
            setErrorMessage('Please enter a valid date of birth.');
            return
        }

        // Check if name is valid
        if (!name.match(nameRegex)) {
            setErrorMessage('Please enter a valid name with no special characters or numbers.');
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
            return
        }

        // Phone number validation regex for UK format
        const phoneRegex = /^(?:(?:\+|00)44|0)7(?:[45789]\d{2}|624)\d{6}$/;

        // Check if phone number is valid
        if (!phone.match(phoneRegex)) {
            setErrorMessage('Please enter a valid UK phone number.');
            return;
        }

        // Check if email is valid
        if (!email.match(emailRegex)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        if (name.trim() !== '' && dob.trim() !== '' && email.trim() !== '' && phone.trim() !== '' && password.trim() !== '' && evidence && ticket.trim() !== '') {
            const hashedPassword = bcrypt.hashSync(password, salt) // Hash the password

            let formData = new FormData()
            formData.append('name', name)
            formData.append('dob', dob)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('password', hashedPassword)


            // Append evidence files to formData
            for (let i = 0; i < evidence.length; i++) {
                formData.append('evidence', evidence[i]);
            }

            // Append ticket amount
            formData.append('ticket', ticket)

            // Send a POST request to register the user
            fetch('https://w20037161.nuwebspace.co.uk/assessment/api/register', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    // Successful registration
                    if (response.status === 200 || response.status === 204) {
                        window.alert('You have sucessfully created an account. Your evidence will be evaluated by the member of our staff. You can log in now.')
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
            <h2 className='text-xl mb-4 bg-gray-800 text-white py-2 rounded-t-md text-center font-semibold'>Sign Up</h2>
            {errorMessage && (
                <div className='bg-red-500 text-white p-2 mb-4 text-center'>
                    {errorMessage}
                </div>
            )}
            <div className='grid grid-cols-1 gap-4'>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor='name' className='block text-gray-700'>Full Name</label>
                        <input
                            id='name'
                            type='text'
                            placeholder='Please enter your full name...'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onKeyDown={e => {
                                const key = e.key;
                                // Allow letters (a-z, A-Z), backspace, and space
                                if (!/[a-zA-Z\s]/.test(key) && key !== 'Backspace') {
                                    e.preventDefault();
                                }
                            }}
                            className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-gray-700'>E-mail</label>
                        <input
                            id='email'
                            type='text'
                            placeholder='Please enter your e-mail...'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='phone' className='block text-gray-700'>Phone number</label>
                        <input
                            id='phone'
                            type='tel'
                            placeholder='Please enter your phone number...'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='dob' className='block text-gray-700'>Date of birth</label>
                        <input
                            id='dob'
                            type='date'
                            placeholder='Date of birth'
                            value={dob}
                            onChange={e => setDob(e.target.value)}
                            className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='password' className='block text-gray-700'>Password</label>
                    <input
                        id='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword' className='block text-gray-700'>Confirm Password</label>
                    <input
                        id='confirmPassword'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                    <div className='mt-1 text-sm text-gray-600'>Password strength <span className={getPasswordStrengthTextClass()}>{passwordStrength}</span></div>
                </div>
                <div>
                    <label htmlFor='evi dence' className='block text-gray-700'>Income evidence</label>
                    <input
                        id='evidence'
                        type="file"
                        name="evidence"
                        accept="image/png, image/jpeg, image/jpg, application/pdf,application/vnd.ms-excel"
                        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                        onChange={handleEvidenceChange}
                    />
                    <p className='text-sm text-gray-600 mt-1'>To successfully participate in the charity events you will need to attach a proof of your income which will be reviewed by the member of staff. For more information please head to our FAQ.</p>
                </div>
            </div>
            <div className='mt-4'>
                <button
                    onClick={handleRegistration}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full'
                >
                    Sign Up
                </button>
            </div>
        </div>
    )

}

export default RegistrationForm

