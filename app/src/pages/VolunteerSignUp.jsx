import { useState } from 'react'
import bcryt from 'bcryptjs'
import { Navigate, useNavigate } from "react-router-dom";

/**
 * Registration page for volunteers.
 * 
 * @author James Sowerby w21023500
 */
function VolunteerSignUp() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const salt = bcryt.genSaltSync(10)

    const handleRegistration = () => {
        console.log('Name: ', name)
        console.log('Date of Birth: ', dob)
        console.log('Email: ', email)

        if (password !== confirmPassword){
            setError('Passwords do not match')
            return
        }

        if (name.trim() !== '' && email.trim() !== '' && dob.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '' && phone.trim() !== ''){
            const hashedPassword = bcryt.hashSync(password, salt)

            let formData = new FormData()
            formData.append('name', name)
            formData.append('dob', dob)
            formData.append('email', email)
            formData.append('password', hashedPassword)
            formData.append('phone', phone)

            fetch('https://w20021570.nuwebspace.co.uk/assessment/api/volunteer', 
            {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.status === 200 || response.status === 204){
                    console.log('Volunteer added')
                    window.alert('Registration successful! You can now sign in.')
                    navigate('/')
                }
            })
            .catch(error => {
                console.error('Error registering: ', error)
                setError('An error during registration occurred')
            })
        } else {
            setError('Please fill in all fields')
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 py-8'>
        <div className='bg-white rounded-lg shadow p-8 max-w-lg w-full'>
            <h2 className='text-center text-2xl font-semibold mb-4'>Volunteer Sign Up</h2>
            {error && (
                <div className='bg-red-500 text-white p-2 mb-4 text-center'>{error}</div>
            )}
            <div className='grid grid-cols-1 gap-4'>
                <div>
                    <label htmlFor='name' className='block font-semibold text-gray-700'>Name</label>
                    <input
                        id='name'
                        type='text'
                        placeholder='Please enter your name...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='dob' className='block font-semibold text-gray-700'>Date of Birth</label>
                    <input 
                        id='dob'
                        type='date'
                        placeholder='Date of Birth'
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='email' className='block font-semibold text-gray-700'>Email</label>
                    <input 
                        id='email'
                        type='email'
                        placeholder='Please enter your email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='password' className='block font-semibold text-gray-700'>Password</label>
                    <input 
                        id='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='confirmPassword' className='block font-semibold text-gray-700'>Confirm Password</label>
                    <input 
                        id='confirmPassword'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div>
                    <label htmlFor='phone' className='block font-semibold text-gray-700'>Phone</label>
                    <input 
                        id='phone'
                        type='tel'
                        placeholder='Please enter your phone number...'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
            </div>
            <div className='mt-4'>
                <button
                    onClick={handleRegistration}
                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full'
                >
                    Sign Up
                </button>
            </div>
        </div>
    </div>
);
}

export default VolunteerSignUp