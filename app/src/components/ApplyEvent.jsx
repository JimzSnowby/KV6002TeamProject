/**
 * ApplyEvent Component
 *
 * This component allows the users to apply for events.
 * 
 * @author Maja Bosy
 */

import React from "react"
import { useState } from "react";
import { useEffect } from "react";

function ApplyEvent(props) {
    const [apply, setApply] = useState('');

    const applyToEvent = () => {
        let formData = new FormData();
        formData.append('eventid', props.selectEventID);
        formData.append('participantid', props.userID);

        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/attend', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
            body: formData,
        })
        .then(response => {
            console.log('Response:', response);
            if (response.status === 200 || response.status === 204) {
                setApply(apply)
                window.alert('Applied successfully!')
            } else if (response.status === 467){
                window.alert('No space!')
            } else if (response.status === 468){
                window.alert('No ticket!')
            } else if (response.status === 469){
                window.alert('Already attending!')
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error applying to event:', error);
            window.alert('An error occurred while applying to the event.');
        });
    }

    

    const cancelEventAttendance = () => {
        fetch(`https://w20021570.nuwebspace.co.uk/assessment/api/attend=${props.selectEventID}`, {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    setApply('')
                    window.alert('You have successfully cancelled your attendance at the event.');
                }
            })
    }

    return (
        <div className="flex justify-center mb-4">
            <button
                name='apply'
                className='w-full my-2 bg-slate-700 text-white rounded-md'
                type='submit'
                value='Apply'
                onClick={applyToEvent}
            >
                Click me
            </button>
        </div>
    );
}

export default ApplyEvent;
