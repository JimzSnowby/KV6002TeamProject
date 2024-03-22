import React, { useState, useEffect } from 'react';
/**
 * Event Participant page
 * 
 * This page is in charge of displaying a list of events and 
 * the attending participants with their contact numbers.
 * Only admin can access this page.
 *  
 * @author Pik Sum Siu 
 * Student ID: w20012367
 */

function EventParticipant() {
    const [expandedEvents, setExpandedEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://w20012367.nuwebspace.co.uk/assessment/api/eventlist')
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
                // Initialize expandedEvents array with false values for each event
                setExpandedEvents(Array(data.length).fill(false));
            })
            .catch(error => {
                console.error('Error fetching events:', error);
                setLoading(false);
            });
    }, []);

    const toggleExpand = (index) => {
        setExpandedEvents(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const renderParticipants = (participants) => {
        if (!participants || participants.length === 0) {
            return <p>No participants found.</p>;
        }

        return (
            <div className="grid grid-cols-1 gap-4">
                {participants.map((participant, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{participant.name}</h2>
                        <p>Contact Number: {participant.phone}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Event Participant</h1>
                {loading ? <p>Loading...</p> : (
                    events.map((event, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md cursor-pointer m-4">
                            <h1 className="text-xl font-semibold cursor-pointer" onClick={() => toggleExpand(index)}>{event.event_name}</h1>
                            {expandedEvents[index] && renderParticipants(parseParticipants(event))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// Function to parse participants data from the event object
const parseParticipants = (event) => {
    if (!event.participantsNames || !event.phone) {
        return [];
    }

    const names = event.participantsNames.split(',');
    const phones = event.phone.split(',');

    return names.map((name, index) => ({ name, phone: phones[index] }));
};

export default EventParticipant;
