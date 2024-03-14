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
            {/* Desktop Sign-in */}
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