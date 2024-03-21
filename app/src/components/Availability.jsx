import React from "react";
import ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

/**
 * Component to manage volunteer availability
 * 
 * @author James Sowerby w21023500
 */
function Availability(props){

    const handleSaveAvailability = () => {
        // Convert selectedDates to a suitable format (e.g., an array of date strings)
        const formattedDates = props.selectedDates.map(date => date.toISOString().split('T')[0]);
        // Now, you would send this to your back-end
        saveAvailabilityToBackend(formattedDates);
    };
    

    return(
        <>
            <div className='flex flex-col items-center p-5 bg-blue-200'>
                <ReactCalendar
                    onChange={props.setSelectedDates}
                    value={props.selectedDates}
                    selectRange={false} // Allows selection of a range of dates
                    multiple={true} // Allows multiple date selection
                />
                <button onClick={handleSaveAvailability} className="bg-gray-800 text-white px-4 py-2 rounded-b-md hover:bg-green-500">Save Availability</button>
            </div>
        </>
    )
}

export default Availability;