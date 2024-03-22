import React, { useState } from 'react'
//import toast, { Toaster } from 'react-hot-toast'


function NewEvent() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [space, setSpace] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const postEvent = () => {
        if (name && description && date && time && location && space) {
            let formData = new FormData();
            formData.append('name', name)
            formData.append('description', description)
            formData.append('date', date)
            formData.append('time', time)
            formData.append('location', location)
            formData.append('space', space)

            fetch('https://w20021570.nuwebspace.co.uk/assessment/api/event',
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

    const handleResponse = (response) => {
        if (response.status === 200 || response.status === 204) {
            setName('')
            setDescription('')
            setDate('')
            setTime('')
            setLocation('')
            setSpace('')
            return response.json()
        } else if (response.status === 409) {
            //toast.error('User already exists');
        } else {
            throw new Error("invalid response: " + response.status)
        }
    }

    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setIsLoading(false)
        } else {
            throw new Error("invalid JSON: " + json)
        }
    }
    return (
        <div className="flex flex-col p-5 text-black overflow-">
            <h2 className="text-2xl font-bold mb-8"> Post Event</h2>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Event name:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="name"
                    placeholder="Enter event name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="description"
                    placeholder="Enter event description"
                    maxLength="250"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                    Event date:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="date"
                    type='date'
                    placeholder="(DD/MM/YYYY)"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                    Event time:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                    name="time"
                    type='time'
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    Event location:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                    name="location"
                    placeholder="Enter event location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="space">
                    Available number of slot for the event:
                </label>
                <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="space"
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                />
            </div>
            <div >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={postEvent}
                >
                    Submit
                    </button>

            </div>

            </div>
            )
    
}


            export default NewEvent