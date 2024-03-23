import React, { useState, useEffect } from 'react';

function EventVolunteer() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        fetch('https://w20012367.nuwebspace.co.uk/assessment/api/volunteerevent')
            .then(response => response.json())
            .then(data => {
                // Sort events by date
                const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setEvents(sortedEvents);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setLoading(false);
            });
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Event Volunteers</h1>
                <p className="text-lg text-center mb-8 text-gray-600">This page displays a list of events along with volunteers who signed up for those events.</p>
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div>
                        {events.map((event, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                                <h2 className="text-lg font-semibold mb-2">{event.name}</h2>
                                <p className="text-gray-600 mb-2">Date: {event.date}, Time: {event.time}, Location: {event.location}</p>
                                <p className="text-gray-700 mb-2">{event.description}</p>
                                <h3 className="text-md font-semibold mb-2">Volunteers:</h3>
                                <ul className="list-disc ml-6">
                                    {event.volunteers.map((volunteer, i) => (
                                        <li key={i} className="text-gray-600">{volunteer.name}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventVolunteer;
