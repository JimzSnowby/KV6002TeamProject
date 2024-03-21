import React, { useEffect, useState } from 'react'

/**
 * The SignIn component for the application.
 * 
 * @author ???
 */

function Search(props) {
    return (
        <div className='flex justify-center items-center h-16'>
            <div className='flex items-center border border-black rounded-lg'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5bg-gradient-to-r from-blue-500 to-teal-400  ml-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M21 21l-4-4m0 0l-4-4m4 4l-4-4M5 12a7 7 0 0114 0c0 3.866-3.134 7-7 7a7 7 0 01-7-7 7 7 0 017-7z'
                    />
                </svg>
                <input
                    type='text'
                    value={props.search}
                    onChange={props.handleSearch}
                    className='w-48 py-2 px-4 rounded-lg focus:outline-none'
                    placeholder='Search...'
                />
            </div>
        </div>
    )
}

export default Search 