import { useState, useEffect } from 'react'
import Event from '../components/Event'

/**
 * Page to manage Volunteers profile
 * 
 * @author James Sowerby w21023500
 */
function VolunteerPage(props) {
    const [details, setDetails] = useState([])
    const [event, setEvent] = useState([])
    const [page, setPage] = useState(1)
    const [extendEvent, setextendEvent] = useState(null)
    const [id, setID] = useState('')

    const itemsPerPage = 10
    const startOfPage = (page - 1) * itemsPerPage
    const endOfPage = startOfPage + itemsPerPage

    const [availability, setAvailability] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    })

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };


    useEffect(() => {
        // Effect to decode token and set ID
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = parseJwt(token);
            const tokenID = decodedToken.id; // Access the id
            setID(tokenID); // This will trigger the second useEffect when the id state updates
        }
    }, []);

    useEffect(() => {
        // Effect to fetch details and events when id changes
        if (id) {
            console.log("Volunteer ID: ", id);
            setEvent([]); 
            setDetails([]);
            fetchDetails();
            fetchEvents();
        }
    }, [id]);
    
    const fetchDetails = () => {
        fetch('https://w21023500.nuwebspace.co.uk/assessment/api/volunteer?volunteerID=' + id)
        .then(response => response.json())
        .then(data => setDetails(data))
        .catch(error => console.error("Error fetching details: ", error))
    }

    const fetchAvailability = () => {
        
    }

    const fetchEvents = () => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/event')
        .then(response => response.json())
        .then(data => setEvent(data))
        .catch(error => console.error("Error fetching events: ", error))
    }

    const detailsJSX = details.map((details, index) => 
        <section key = {index} className='flex-1 p-5 bg-blue-200'>
            <p className='text-2xl text-center'>{details.name}</p>
            <p className='text-center'>Volunteer ID: {details.volunteerID}</p>
            <p className='text-center'>Date of Birth: {details.dob}</p>
            <p className='text-center'>Email: {details.email}</p>
        </section>
    )

    const eventsJSX = event.slice(startOfPage, endOfPage).map((item) =>(
        <section 
            key = {item.eventID}
            className={`p-4 m-2 rounded-lg border border-gray-300 ${extendEvent === item.eventID ? 'md:col-span-2' : 'col-span-1'
                    }`}>
            <Event
                event={item}
                signedIn={props.signedIn}
                extendEvent={extendEvent}
                setextendEvent={setextendEvent}
            />
            <div className='flex justify-end'>
                <button className='text-right'>Volunteer</button>
            </div>
        </section>
    ))

    return (
        <>
            <h1 className='text-4xl text-center p-2'>Profile</h1>
            <div className='p-5 flex'>
                {detailsJSX}
                <div className='flex-1 p-5'>
                    <p className='text-2xl text-center'>Availability</p>
                </div>
            </div>
            <div className='justify-center p-5'>
                    <p className='text-2xl text-center'>Upcoming Events</p>
                    {eventsJSX}
            </div>
        </>
    )
}

export default VolunteerPage