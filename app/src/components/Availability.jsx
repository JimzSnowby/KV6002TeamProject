import React, {useState, useEffect} from "react";
import ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

/**
 * Component to manage volunteer availability
 * 
 * @author James Sowerby w21023500
 */
function Availability(props){
    const [availabilityDates, setAvailabilityDates] = useState([]);

    useEffect(() => {

        fetch('https://w21023500.nuwebspace.co.uk/assessment/api/volunteeravailability?volunteerid=' + props.id)
        .then(response => response.json())
        .then(data => {
            // Assuming the API returns an array of objects, each with a "date" field
            const formattedDates = data.map(item => item.date);
            props.setSelectedDates(formattedDates);
        })
        .catch(error => console.error('Error fetching availability data:', error));
    }, [props.id]);

    const saveAvailability = () => {
        let formData = new FormData();
        formData.append('volunteerid', props.id);
        formData.append('date', props.selectedDates);

        fetch('https://w21023500.nuwebspace.co.uk/assessment/api/volunteeravailability?volunteerid=' + props.id + '&date=' + props.selectedDates, 
        {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.status === 401){
                localStorage.removeItem("token")
                props.setSignedIn(false)
                return []
            }
            if (response.status === 200 || response.status === 204){
                console.log('date saved')
                window.alert('Date updated!')
            }
        })
        .catch(error => console.error('Error updating: ', error))
    }

    const getAvailability = () => {
        fetch('https://w21023500.nuwebspace.co.uk/assessment/api/volunteeravailability?volunteerid=' + props.id)
        .then(response => {
            if (response.status === 401){
                localStorage.removeItem("token")
                props.setSignedIn(false)
                return []
            }
            if (response.status === 200 || response.status === 204){
                return response.json()
            }
        })
        .then(data => {
            props.selectedDates(data)
        })
        .catch(error => console.error('Error fetching availability: ', error))
    }

    const tileClassName = ({ date, view }) => {
        // Ensure we're working with the date view
        if (view === 'month') {
            // Format the date to match the API format
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

            // Check if the formatted date string is in the availabilityDates array
            if (availabilityDates.includes(dateString)) {
                return 'availableDate'; // Return a class name to style this date
            }
        }
    };

    return(
        <>
            <div className='flex flex-col items-center p-5 bg-blue-200'>
                <p className='text-2xl text-center'>Availability</p>
                <ReactCalendar
                    onChange={value => {
                        const formattedDates = Array.isArray(value) ? value.map(date => date.toISOString().split('T')[0]) : [value.toISOString().split('T')[0]];
                        props.setSelectedDates(formattedDates);
                    }}
                    value={props.selectedDates.map(dateString => {
                        const parsedDate = new Date(dateString);
                        return isNaN(parsedDate) ? undefined : parsedDate; // Only return valid dates
                    }).filter(date => !!date)} // Filter out undefined values
                    selectRange={false}
                    multiple={true}
                    tileClassName={tileClassName}
                />
                <button onClick={saveAvailability} className="bg-gray-800 text-white px-4 py-2 rounded-b-md hover:bg-green-500">Save Availability</button>
            </div>
        </>
    )
}

export default Availability;