import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function ParticipantEvent({ props }) {
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const eventUrl = `https://w20021570.nuwebspace.co.uk/assessment/api/eventList/}`;
        fetch(eventUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch event - ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setEventData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching event:', error);
                setLoading(false);
            });
    }, []);

    const calculatePercentage = (value, total) => (value / total) * 100;

    // Combine participants and volunteers data
    const totalParticipants = eventData.reduce((total, event) => total + event.numberOfPa, 0);
    const totalVolunteers = eventData.reduce((total, event) => total + event.numberOfVo, 0);

    const data = [
        {
            title: 'Participants',
            value: totalParticipants,
            color: 'rgba(255, 99, 132, 0.6)',
        },
        {
            title: 'Volunteers',
            value: totalVolunteers,
            color: 'rgba(54, 162, 235, 0.6)',
        },
    ];

    const dataWithPercentage = data.map(item => ({
        ...item,
        value: calculatePercentage(item.value, totalParticipants + totalVolunteers),
    }));

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Participant and Volunteer Numbers</h2>
                    <PieChart
                        data={dataWithPercentage}
                        lineWidth={40}
                        label={({ dataEntry }) => `${dataEntry.title}: ${Math.round(dataEntry.value)}%`}
                        labelStyle={{
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                        }}
                        width={300}
                        height={200}
                    />
                </div>
            )}
        </div>
    );
}

export default ParticipantEvent;
