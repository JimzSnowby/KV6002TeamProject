<<<<<<< Updated upstream
import { useState, useEffect } from 'react'
=======
import React, { useState, useEffect } from 'react';
>>>>>>> Stashed changes

/**
 * ParticipantPage Component
 *
 * This component represents the page for managing participant profile.
 * 
 * @author Maja Bosy
 */
function ParticipantPage(props) {
    const [name, setName] = useState(props.name || '') // Initialize with props.note or an empty string
    const [phone, setPhone] = useState(props.phone || '') // Initialize with props.note or an empty string
    const [email, setEmail] = useState(props.email || '') // Initialize with props.note or an empty string

    useEffect(() => {
        // Fetch the note associated with the content_id
        fetch('https://w20037161.nuwebspace.co.uk/assessment/api/participant', {
            method: 'GET',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        })
            .then(response => {
                if (response.status === 200) {
                    console.log(response)
                    return response.json()

                }
            })
            .then(data => {
                if (data && data.length > 0) {
                    setName(data[0].name)
                    setPhone(data[0].phone)
                    setEmail(data[0].email)

                    console.log(name)
                    console.log(phone)
                    console.log(email)
                }



            })
            .catch(error => {
                console.error('Error fetching participant:', error)
            })

    }, []) // Add props.content_id to the dependency array

    /* useEffect(() => {
         if (name !== null && name !== undefined) {
             setName(name)
         }
     }, [name])
 
     useEffect(() => {
         if (phone !== null && phone !== undefined) {
             setPhone(phone)
         }
     }, [phone])
 
     useEffect(() => {
         if (email !== null && email !== undefined) {
             setEmail(email)
         }
     }, [email]) */

    // Handle update participant 
    // Handle update participant 
    const updateParticipant = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);

        // Send a POST request to save the participant data
        fetch('https://w20037161.nuwebspace.co.uk/assessment/api/participant', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
            body: formData,
        })
            .then(response => {
                if (response.ok) { // Check if the response is successful
                    return response.json();
                } else {
                    throw new Error('Failed to update the data');
                }
            })
            .then(data => {
                // Update the participant data locally with the updated values
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                window.alert('You have updated your profile sucessfully!');
            })
            .catch(error => {
                console.error('Error updating the profile:', error);
                window.alert('Failed to update the profile. Please try again.');
            });
    }


    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg max-w-xl mx-auto mt-12'>
            <h2 className='text-xl mb-4 bg-gray-800 text-white py-2 rounded-t-md text-center font-semibold'>Participant Profile</h2>
            <form onSubmit={updateParticipant}>
                <div className='grid grid-cols-1 gap-4'>
                    <div>
                        <label htmlFor='name' className='block text-gray-700'>Name</label>
                        <input
                            id='name'
                            type='text'
                            placeholder='Enter your name...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='email' className='block text-gray-700'>Email</label>
                        <input
                            id='email'
                            type='email'
                            placeholder='Enter your email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='phone' className='block text-gray-700'>Phone number</label>
                        <input
                            id='phone'
                            type='tel'
                            placeholder='Enter your phone number...'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <button
                        onClick={updateParticipant}
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full'
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ParticipantPage;
