import React, { useEffect, useState } from 'react'
import Newsletter from '../components/Newsletter'
import Sponsor from '../components/Sponsor'
import Search from '../components/Search'
import Event from '../components/Event'


/**
 * Home page for the application.
 * 
 * @author James Sowerby w21023500
 */

function HomePage(props) {
    const [event, setevent] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [extendEvent, setextendEvent] = useState(null)

    const itemsPerPage = 10
    const startOfPage = (page - 1) * itemsPerPage
    const endOfPage = startOfPage + itemsPerPage
    const firstPage = page <= 1

    const nextPage = () => {
        if (!lastPage) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    const previousPage = () => {
        if (!firstPage) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    useEffect(() => {
        setLoading(true)
        setPage(1)
        const eventUrl = 'https://w20021570.nuwebspace.co.uk/assessment/api/event'
        fetch(eventUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch event - ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setevent(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching event:', error)
            })
    }, [])

    const eventJSX = event
        .slice(startOfPage, endOfPage)
        .map((item) => (
            <div
                key={item.eventID}
                className={`p-4 m-2 rounded-lg border border-gray-300 ${extendEvent === item.eventID ? 'md:col-span-2' : 'col-span-1'
                    }`}>
                <Event
                    event={item}
                    signedIn={props.signedIn}
                    extendEvent={extendEvent}
                    setextendEvent={setextendEvent}
                />
            </div>
        ))

    const lastPage = eventJSX.length === 0
    const prevDisabled = firstPage ? 'disabled' : ''
    const nextDisabled = lastPage ? 'disabled' : ''


    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='col-span-1 md:col-span-2'>
                    <h1>Home Page</h1>
                    <p>Welcome to ROSE</p>
                    <h1 className='text-3xl font-bold mb-4 mt-4'>Events</h1>

                </div>
                {loading ? (
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <div className='loader'></div> </div>

                ) : (
                    <>
                        {eventJSX.length > 0 ? eventJSX : ''}

                        {/* Page buttons */}
                        {eventJSX.length > 0 && (
                            <div className='flex justify-center mb-4 col-span-full'>
                                <button
                                    onClick={previousPage}
                                    disabled={page <= 1}
                                    className={`py-2 px-4 mr-2 ${page <= 1 ? 'bg-gray-300 cursor-not-allowed' : 
                                    'bg-blue-500 hover:bg-blue-600 text-white'} rounded`}
                                > Previous
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={event.length === 0}
                                    className={`py-2 px-4 ${event.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 
                                    'bg-blue-500 hover:bg-blue-600 text-white'} rounded`}
                                > Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <Newsletter />
            <Sponsor />
        </>
    )
}

export default HomePage