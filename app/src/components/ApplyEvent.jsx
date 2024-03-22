/**
 * ApplyEvent Component
 *
 * This component allows the users to apply for events.
 * 
 * @author Maja Bosy
 */

import React from "react"
import { useState } from "react";

function ApplyEvent(props) {
    const [apply, setApply] = useState('');

    const applyToEvent = () => {
        let formData = new FormData();
        formData.append('eventid', props.eventID);
        formData.append('participantid', props.userID);

        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/attend', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
            body: formData,
        })
            .then(response => {
                console.log('Response:', response);
                console.log(props.eventID)
                if (response.status === 200 || response.status === 204) {
                    setApply(apply)
                    window.alert('You have booked the event successfully!')
                } else if (response.status === 467) {
                    window.alert('Sorry, this event has no spaces left.')
                } else if (response.status === 468) {
                    window.alert('Sorry, you are out of tickets. Please contact our customer service at support@rose.com for more details.')
                } else if (response.status === 469) {
                    window.alert('You have already booked this event.')
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error applying to event:', error);
            });
    }
    const cancelEventAttendance = () => {
        fetch(`https://w20021570.nuwebspace.co.uk/assessment/api/attend?participantid=${props.userID}&eventid=${props.eventID}`, {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    setApply('');
                    window.alert('You have successfully cancelled your attendance at the event.');
                } else if (response.status === 404) {
                    window.alert('Event not found. Please try again later.');
                } else {
                    window.alert('Failed to cancel attendance at the event. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error cancelling event attendance:', error);
                window.alert('An error occurred while cancelling your attendance at the event.');
            });
    }
    
    
    return (
        <div className="flex justify-center space-x-4 mb-4">
            <button
                name='apply'
                className='w-full my-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out'
                type='submit'
                value='Apply'
                onClick={applyToEvent}
            >
                Book Event
            </button>
            <button
                name='cancel'
                className='w-full my-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out'
                type='submit'
                value='Cancel'
                onClick={cancelEventAttendance}
            >
                Cancel Attendance
            </button>
        </div>
    );
}
export default ApplyEvent;


