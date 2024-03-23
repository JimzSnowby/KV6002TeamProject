import React, { useState, useEffect } from 'react';

function EventVolunteer() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/volunteerevent')
            .then(response => response.json())
            .then(data => {
                // Group events by event_name
                const groupedEvents = data.reduce((groups, item) => {
                    const group = (groups[item.event_name] || []);
                    group.push(item);
                    groups[item.event_name] = group;
                    return groups;
                }, {});
                setEvents(groupedEvents);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Event Volunteers</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    Object.entries(events).map(([eventName, eventGroup], index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-bold mb-2">{eventName}</h2>
                            <p className="text-gray-700 mb-2">Date: {eventGroup[0].event_date}</p>
                            <p className="text-gray-700 mb-2">Time: {eventGroup[0].event_time}</p>
                            <p className="text-gray-700">Location: {eventGroup[0].event_location}</p>
                            {eventGroup.map((event, index) => (
                                <div key={index}>
                                    <p className="text-gray-700 mt-2">Volunteer: {event.volunteer_name}</p>
                                    <p className="text-gray-700">Volunteer Email: {event.volunteer_email}</p>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
    
}

export default EventVolunteer;