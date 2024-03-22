import bcrypt from 'bcryptjs'
import React, { useState } from 'react'
//import toast, { Toaster } from 'react-hot-toast'


function AdminRegister() {
    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [position, setPosition] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const salt = bcrypt.genSaltSync(10)

    const saveAdmin = () => {
        if (name && email && password) {
            const hashPassword = bcrypt.hashSync(password, salt)
            let formData = new FormData();
            formData.append('name', name)
            formData.append('dob', dob)
            formData.append('email', email)
            formData.append('phone', phone)
            formData.append('password', hashPassword)
            formData.append('position', position)

            fetch('https://w20021570.nuwebspace.co.uk/assessment/api/adminregister',
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
            setDob('')
            setEmail('')
            setPhone('')
            setPassword('')
            setPosition('')
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
            <h2 className="text-2xl font-bold mb-8"> Add New Admin</h2>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    New Admin Name:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="name"
                    placeholder="Enter your name"
                    maxLength="250"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                    Date of Birth:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="dob"
                    type='date'
                    placeholder="(DD/MM/YYYY)"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />

            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="email"
                    placeholder="example@email.com"
                    maxLength="250"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Contact Number:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                    name="phone"
                    placeholder="016-xxx xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    New Admin Password:
                </label>
                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                    name="password"
                    placeholder="*******"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                    New Admin Position:
                </label>
                <select
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                >
                    <option value="">Select Admin Position:</option>
                    <option value="head">Head of Admin</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={saveAdmin}
                >
                    Submit
                    </button>

            </div>

            </div>
            )
    
}


            export default AdminRegister