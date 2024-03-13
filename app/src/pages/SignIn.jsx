/**
 * SignIn Component
 *
 * This component handles user sign-in, and session management.
 * 
 * @author Maja Bosy
 */

import { useState, useEffect } from 'react'

function SignIn(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signInError, setSignInError] = useState(false)
    const [isRegistrationPage, setIsRegistrationPage] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Track mobile menu state


    useEffect(() => {
        // Check for a token in local storage when the component mounts
        const token = localStorage.getItem('token')
        if (token) {
            props.setSignedIn(true)
            getNote(token)
        }
    }, [])

    useEffect(() => {
        let validateToken

        if (props.signedIn) {
            //  If the user is signed in, periodically validate token
            validateToken = setInterval(() => {
                verifyToken()
            }, 30000)
        } return () => {
            if (validateToken) {
                clearInterval(validateToken)
            }
        }
    }, [props.signedIn])

    const verifyToken = () => {
        // Validate token on the server
        const token = localStorage.getItem('token')

        if (token) {
            getNote(token)
                .catch(error => {
                    if (error.message === '401') {
                        sessionExpired()
                    } else {
                        console.error('Error validating token', error)
                    }
                })
        }
    }

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    // Handle session expiration
    const sessionExpired = () => {
        localStorage.removeItem('token')
        window.alert('Sorry, it seems your session has expired. Please log in again!')
        window.location.href = '/project/app/home'
    }

    // Handle user sign-in
    const signIn = async () => {
        const encodedString = btoa(username + ':' + password)

        try {
            const response = await fetch('https://w20037161.nuwebspace.co.uk/project/api/token', {
                method: 'GET',
                headers: new Headers({ 'Authorization': 'Basic ' + encodedString })
            })

            if (response.status === 200) {
                // Successful sign-in logic
                props.setSignedIn(true)
                setSignInError(false)
                const data = await response.json()

                if (data.token) {
                    localStorage.setItem('token', data.token)
                }
                getNote(data.token)
            } else {
                // Handle other error cases (including rejection)
                props.setSignedIn(false)
                setSignInError(true)
                window.alert('Sorry, it seems your username or password is incorrect. Please try again!')
            }
        } catch (error) {
            console.error(error)
            props.setSignedIn(false)
        }
    }

    // Handle user sign-out
    const signOut = () => {
        // Sign out user and clear token
        props.setSignedIn(false)
        localStorage.removeItem('token')
        window.location.href = '/project/app/home'
    }

    const handleUsername = (event) => { setUsername(event.target.value) }   // Handle changes in the username input field
    const handlePassword = (event) => { setPassword(event.target.value) }   // Handle changes in the password input field
    
    const bColour = signInError ? 'bg-red-100' : 'bg-slate-100'

    return (
        <div className='bg-slate-700 p-2 text-md text-right'>
            {/* Hamburger menu icon */}
            {!props.signedIn && (
                <div className='md:hidden'>
                    <button
                        onClick={toggleMobileMenu}
                        className='text-white focus:outline-none'
                    >
                        <svg
                            className='w-12 h-12 text-purple-300'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='4'
                                d='M4 6h16M4 12h16M4 18h16'
                            ></path>
                        </svg>
                    </button>
                </div>
            )}
            {/* Mobile Sign-in/Register */}
            {isMobileMenuOpen && (
                <div className='md:hidden flex flex-col items-center w-full p-4 bg-gray-900 text-white'>
                    <div className={`p-2 mx-2 ${bColour} w-full mb-2`}>
                        <div className='flex justify-between items-center mb-1'>
                            <label htmlFor='email' className='text-black font-semibold'>Email:</label>
                        </div>
                        <input
                            id='email'
                            type='text'
                            value={username}
                            onChange={handleUsername}
                            className='w-full p-1 rounded-md bg-gray-300 text-black'
                        />
                    </div>
                    <div className={`p-2 mx-2 ${bColour} w-full mb-2`}>
                        <div className='flex justify-between items-center mb-1'>
                            <label htmlFor='password' className='text-black font-semibold'>Password:</label>
                        </div>
                        <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={handlePassword}
                            className='w-full p-1 rounded-md bg-gray-300 text-black'
                        />
                    </div>
                    <button
                        type='submit'
                        className='font-semibold w-full py-2 px-4 bg-green-400 hover:bg-green-500 rounded-md text-black border-2 border-green-500'
                        onClick={signIn}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => {
                            setIsRegistrationPage(true)
                            window.location.href = 'registration'
                        }}
                        className='font-semibold w-full mt-2 py-2 px-4 bg-orange-400 hover:bg-orange-500 rounded-md text-black border-2 border-orange-500'
                    >
                        Register
                    </button>
                </div>
            )}
            {/* Desktop Sign-in/Register */}
            {!props.signedIn && !isRegistrationPage && (
                <div className='hidden md:block'>
                    <input
                        type='text'
                        placeholder='username'
                        className={`p-1 mx-2 rounded-md ${bColour} `}
                        value={username}
                        onChange={handleUsername}
                    />
                    <input
                        type='password'
                        placeholder='password'
                        className={`p-1 mx-2 rounded-md ${bColour} `}
                        value={password}
                        onChange={handlePassword}
                    />
                    <input
                        type='submit'
                        value='Sign In'
                        className='font-semibold py-1 px-2 mx-2 bg-green-400 hover:bg-green-500 rounded-md cursor-pointer border-2 border-green-500'
                        onClick={signIn}
                    />
                    <button
                        onClick={() => {
                            setIsRegistrationPage(true)
                            window.location.href = 'registration'
                        }}
                        className='font-semibold py-1 px-2 mx-2 bg-orange-400 hover:bg-orange-500 rounded-md border-solid border-2 border-orange-500'
                    >
                        Register
                    </button>
                </div>
            )}

            {/* Sign-out button */}
            {props.signedIn && (
                <div className='md:hidden'>
                    <button
                        onClick={signOut}
                        className='font-semibold py-1 px-2 mx-2 bg-red-400 hover:bg-red-500 rounded-md border-2 border-red-500'
                    >
                        Sign Out
                    </button>
                </div>
            )}

            {/* Desktop Sign-out */}
            {props.signedIn && !isRegistrationPage && (
                <div className='hidden md:block'>
                    <button
                        onClick={signOut}
                        className='font-semibold py-1 px-2 mx-2 bg-red-400 hover:bg-red-500 rounded-md'
                    >
                        Sign Out
                    </button>
                </div>
            )}

            {/* Registration Form */}
            {!props.signedIn && isRegistrationPage && (
                <RegistrationForm onRegistration={handleRegistration} />
            )}
        </div>
    )
}

export default SignIn