import React, { useState } from 'react';
import ParticipantEvent from './ParticipantEvent';

function Event(props) {
    const [extendEvent, setExtendEvent] = useState(null);

    const toggleVisibility = (eventID) => {
        if (extendEvent === eventID) {
            setExtendEvent(null);
        } else {
            setExtendEvent(eventID);
        }
    };

    const expandedEventClass = "md:col-span-2";
    const isExpanded = props.event.eventID === extendEvent;

    const totalSpace = 20;
    const availableSpace = props.event.space;
    const spaceLeft = ((totalSpace - availableSpace) / totalSpace) * 100;

    return (
        <div className={`cursor-pointer ${isExpanded ? expandedEventClass : ""}`}>
            <h2
                className="text-xl font-semibold cursor-pointer"
                onClick={() => toggleVisibility(props.event.eventID)}
            >
                {props.event.name}
            </h2>

            {isExpanded && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Description:</h3>
                    <p className="mb-2">{props.event.description}</p>
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="mb-2">{props.event.location}</p>
                    <h4 className="text-lg font-semibold">Date</h4>
                    <p className="mb-2">{props.event.date}</p>
                    <h3 className="text-lg font-semibold">Time</h3>
                    <p className="mb-2">{props.event.time}</p>
                </div>
            )}

            <div className="mt-4 flex items-center">
                <div className="w-24 mr-2">Space:</div>
                <div className="flex items-center bg-gray-200 h-6 w-48">
                    <div className="bg-blue-500 h-full" style={{ width: `${spaceLeft}%` }}></div>
                </div>
                <div className="ml-2">{availableSpace} Spaces available</div>
                {isExpanded && <ParticipantEvent selectedEventID={props.event.eventID} />}
            </div>
        </div>
    );
}

export default Event;
