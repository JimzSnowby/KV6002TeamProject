import React, { useEffect, useState } from 'react';

function CheckParticipant() {
    const [participants, setParticipants] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedParticipant, setExpandedParticipant] = useState(false);
    const [eligible, setEligible] = useState('')
    const [participantsID, setParticipantsID] = useState('')
    const [imageError, setImageError] = useState(false);

    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Invalid response: " + response.status);
        }
    };

    const handleJSON = (json) => {
        if (json.constructor === Array) {
            const updatedParticipants = json.map(p => ({
                ...p,
                evidence: p.evidence ? `data:image/png;base64,${p.evidence}` : null,
                eligible: p.eligible ? String(p.eligible) : p.eligible
            }));
            setParticipants(updatedParticipants);
            setIsLoading(false);
        } else {
            throw new Error("Invalid JSON: " + json);
        }
    };

    const showDetails = () => {
        setExpandedParticipant(prevVisible => !prevVisible);
    }
    const saveEligible = () => {
        console.log(eligible);

        if (eligible && participantsID) {
            let formData = new FormData();
            formData.append('participantid', participantsID)
            formData.append('eligible', eligible)
            

            fetch('https://w20021570.nuwebspace.co.uk/assessment/api/checkparticipant',
                {
                    method: 'POST',
                    body: formData
                }
            )
                .then(handleResponse)
                .then(handleJSON)
                .catch(error => console.error('Error:', error));
        } else {
            setErrorMessage('Please fill in all fields.')
        }
    }
    useEffect(() => {
        fetch('https://w20021570.nuwebspace.co.uk/assessment/api/checkparticipant')
            .then(response => handleResponse(response))
            .then(json => handleJSON(json))
            .catch(err => {
                console.log(err.message);
                setIsLoading(false);
                setIsError(true);
            });
    }, []);

    const keyMapping = {
        participantID: 'Participant ID: ',
        name: 'Name: ',
        dob: 'Date of Birth: ',
        email: 'Email Address: ',
        phone: 'Contact Number: ',
        eligible: 'Eligibility: ',
        evidence: 'Evidence: '
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Something went wrong</p>;
    }

    return (
        <>
            <h1 className='p-2 text-6xl'>Participant Application</h1>

            {participants.length === 0 && <p>No content found</p>}

            <div className="grid grid-cols-1">
                {participants.map((participant, index) => (
                    <div key={index} className="flex flex-col p-5 cursor-pointer h-30 overflow-auto m-4 p-2 rounded-md border-2 border-blue-200 text-black hover:bg-gray-300">
                        <h2 className='text-xl font-semibold cursor-pointer'
                            onClick={() => showDetails && setExpandedParticipant(expandedParticipant === index ? null : index)}>
                            {participant.name}
                        </h2>

                        {expandedParticipant === index && (
                            <div>
                                {Object.keys(participant).map((key) => {
                                    const displayName = keyMapping[key] || key;
                                    if (key === 'eligible') {
                                        return (
                                            <div key={key}>
                                                <div className='text-xl font-semibold cursor-pointer align-top'>{displayName}</div>
                                                <div>
                                                    <select
                                                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                        name="eligible"
                                                        value={eligible}
                                                        onChange={(e) => {
                                                            setEligible(e.target.value)
                                                                setParticipantsID(participant.participantID);}
                                                                }
                                                    >
                                                        <option value="NULL">Approve / Reject</option>
                                                        <option value="1">Approve</option>
                                                        <option value="0">Reject</option>
                                                    </select>
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (key === 'evidence') {
                                        // Display image directly from the data URI
                                        return (
                                            <div key={key}>
                                                <div className='text-xl font-semibold cursor-pointer align-top'>{displayName}</div>
                                                <div>
                                                    {participant[key] ? (
                                                        <img className="text-m text-red-500"
                                                            src={participant[key]}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "";
                                                                e.target.alt = "File not supported";
                                                            }}
                                                            alt="Evidence"
                                                            style={{ width: '50%', height: 'auto', objectFit: 'contain' }}
                                                        />
                                                    ) : (
                                                        <p className="text-m text-red-500">No file is inserted</p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={key}>
                                                <div className='text-xl font-semibold cursor-pointer'>{displayName}</div>
                                                <div className='mb-2'>{participant[key]}</div>
                                            </div>
                                        );
                                    }
                                })}
                                <div className="flex justify-center" >
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={saveEligible}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default CheckParticipant;
