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

            fetch('https://w21023500.nuwebspace.co.uk/assessment/api/volunteer', {
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
        <>
            <div className='bg-blue-200 p-6 rounded-lg max-w-xl mx-auto mt-10 mb-5'>
                <h2 className='p-6 text-center text-4xl'>Want to help out?</h2>
                <p className='text-center text-xl'>
                    We are always in need of more volunteers to help at events, sign up below to become a volunteer.
                </p>
                <table className='bg-blue-800 mx-auto w-full mt-5 rounded-md'>
                    <tbody>
                        <tr>
                            <td className='p-2 text-white'>
                                <label htmlFor='name'>Name:</label>
                            </td>
                            <td className='p-2'>
                                <input
                                    type='text'
                                    id='name'
                                    placeholder='Enter your name...'
                                    onChange={e => setName(e.target.value)}
                                    className='w-full p-1 rounded-md'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 text-white'>
                                <label htmlFor='dob'>Date of Birth:</label>
                            </td>
                            <td className='p-2'>
                                <input 
                                    type='date' 
                                    id='dob'
                                    onChange={e => setDob(e.target.value)}
                                    className='w-full p-1 rounded-md'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 text-white'>
                                <label htmlFor='email'>Email:</label>
                            </td>
                            <td className='p-2'>
                                <input 
                                    type='email' 
                                    id='email'
                                    placeholder='Enter your email...'
                                    onChange={e => setEmail(e.target.value)}
                                    className='w-full p-1 rounded-md' 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 text-white'>
                                <label htmlFor='password'>Password:</label>
                            </td>
                            <td className='p-2'>
                                <input 
                                    type='password' 
                                    id='password' 
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder='Enter your password...'
                                    className='w-full p-1 rounded-md'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 text-white'>
                                <label htmlFor='confirmPassword'>Confirm Password:</label>
                            </td>
                            <td className='p-2'>
                                <input 
                                    type='password' 
                                    id='confirmPassword' 
                                    placeholder='Re-enter your password...'
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className='w-full p-1 rounded-md'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 text-white'>
                                <label htmlFor='phone'>Phone:</label>
                            </td>
                            <td className='p-2'>
                                <input 
                                    type='tel' 
                                    id='phone'
                                    placeholder='Enter your phone number...'
                                    onChange={e => setPhone(e.target.value)}
                                    className='w-full p-1 rounded-md'
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {error && (
                    <div className='bg-red-500 text-white p-2 mt-3 text-center rounded-md'>
                        {error}
                    </div>
                )}
                <div className='flex flex-col items-center mt-5 font-semibold'>
                    <button 
                        onClick={handleRegistration}
                        className='bg-gray-800 w-1/2 text-center text-white px-4 py-2 rounded-md hover:bg-green-500'>
                            Sign Up
                    </button>
                </div>
            </div>
        </>
    )
}

export default VolunteerSignUp