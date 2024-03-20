import React from "react"
import { useState } from "react";

function ApplyEvent({selectEventID}) {
    const [apply, setApply] = useState('');

    const applyToEvent = () => {
        let formData = new FormData();
        formData.append('eventid', eventID);
        formData.append('participantid', participantid);


        fetch('https://w20021570.nuwebspace.co.uk/assessment/attend', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
            body: formData,
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    setApply(apply)
                    window.alert('You have sucessfully registered for an event.')
                }
            })
    }



    const cancelEventAttendance = () => {
        fetch(`https://w20021570.nuwebspace.co.uk/assessment/attend=${selectEventID}`, {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    setApply('')
                    window.alert('You have sucessfully cancelled your attendenca at the event.')
                }
            })
    }

    return(

        < button
            name='apply'
            type='submit'
            value='Apply'
            className='w-full'
            onClick={applyToEvent}
        >
        </button >
    )
}

export default ApplyEvent