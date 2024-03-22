
/**
 * ParticipantPage Component
 *
 * This component represents the page for managing participant profile.
 * 
 * @author Maja Bosy
 */
import React, { useState, useEffect } from 'react';
import { FiUser } from 'react-icons/fi'; // Importing user icon from react-icons

function ParticipantPage(props) {
    const [name, setName] = useState(props.name || '');
    const [phone, setPhone] = useState(props.phone || '');
    const [email, setEmail] = useState(props.email || '');
    const [evidence, setEvidence] = useState(props.evidence || '');

    useEffect(() => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/participant', {
            method: 'GET',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data && data.length > 0) {
                    setName(data[0].name)
                    setPhone(data[0].phone)
                    setEmail(data[0].email)
                    setEvidence(data[0].evidence || '');
                }
            })
            .catch(error => {
                console.error('Error fetching participant:', error)
            })
    }, [])

    const updateParticipant = (event) => {
        event.preventDefault();

        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('evidence', evidence);

        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/participant', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
            body: formData,
        })
            .then(response => {
                if (response.status === 204) {
                    // If response status is 204, consider it successful
                    window.alert('You have updated your profile successfully!');
                    return; // No need to parse empty response, return immediately
                } else if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to update the data. Server returned status: ' + response.status);
                }
            })
            .then(data => {
                // Process data if it exists (for successful responses with content)
                if (data) {
                    console.log('Updated participant data:', data);
                    setName(data.name);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setEvidence(data.evidence || '');
                }
            })
            .catch(error => {
                console.error('Error updating your profile:', error);
                window.alert(error.message);
            });
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-3xl mx-auto py-6">
                <div className="bg-white shadow-md rounded px-8 py-8">
                    <div className="flex justify-center mb-4">
                        <FiUser className="text-5xl text-gray-600" />
                    </div>
                    <h2 className="text-center text-2xl font-semibold mb-4">User Profile</h2>
                    <p className="text-center">Manage your account and edit your details here.</p>
                    <form onSubmit={updateParticipant}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone number</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number..."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="evidence" className="block text-gray-700 text-sm font-bold mb-2">Evidence</label>
                            {/*{evidence && (
                                <div className="mt-2 flex items-start">
                                    <p className="block text-gray-700 text-sm font-bold mb-2">Current Evidence:</p>
                                    <img src={`data:image/png;base64,${evidence}`} alt="Evidence" className="mx-auto w-1/2" />
                                </div>
                            )}*/}
                            <input
                                id="evidence"
                                type="file"
                                onChange={(e) => setEvidence(e.target.files[0])}
                                accept="image/png, image/jpeg, image/jpg, application/pdf,application/vnd.ms-excel"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <p className="text-xs text-gray-600 mt-1"></p>
                            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-1 rounded-md mt-2 mb-1">
                                <p className="text-sm">
                                    <span className="font-bold">Info:</span> Please attach a proof of your income which will be reviewed by the member of staff. This can be a pdf or png, jpg or jpeg file. For more information, please head to our ROSE chatbot.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded font-semibold focus:outline-none focus:shadow-outline"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ParticipantPage;
