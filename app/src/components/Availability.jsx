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
            <div className='flex justify-cente'>
                <ReactCalendar
                    onChange={props.setSelectedDates}
                    value={props.selectedDates}
                    selectRange={false} // Allows selection of a range of dates
                    multiple={true} // Allows multiple date selection
                />
            </div>
            <button onClick={handleSaveAvailability}>Save Availability</button>
        </>
    )
}

export default Availability;